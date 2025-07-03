/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 评论功能扩展
 *
 * 基于 Tiptap Mark 机制实现的文档评论功能
 * 允许用户对文本进行标记并添加评论，支持评论线程和嵌套回复
 */

import { Editor, Mark, mergeAttributes } from '@tiptap/core';
import { v4 as uuidv4 } from 'uuid';
import { findIndex } from 'lodash';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import {
  CommentOptionsInterface,
  CommentsStorageInterface,
  ReferenceInterface,
  CommentUserInfo,
} from './types';

/**
 * 删除指定评论
 *
 * @param comments 所有评论线程
 * @param threadId 评论线程ID
 * @param commentId 评论ID
 * @returns 更新后的评论线程数组
 */
function removeComment(
  comments: ReferenceInterface[],
  threadId: string,
  commentId: string
): ReferenceInterface[] {
  // 查找目标评论线程
  const index = findIndex(comments, { referenceId: threadId });

  // 如果找不到对应线程，直接返回原数组
  if (index === -1 || !comments[index].commentList) {
    return comments;
  }

  // 查找目标评论
  const thread = comments[index];
  const commentIndex = findIndex(thread.commentList ?? [], {
    comment_id: commentId,
  });

  // 删除目标评论
  if (commentIndex !== -1) {
    thread.commentList?.splice(commentIndex, 1);
  }

  // 如果线程中没有评论了，则删除整个线程
  if (!thread.commentList?.length) {
    comments.splice(index, 1);
  }

  return comments;
}

/**
 * 创建高亮装饰
 *
 * @param state 编辑器状态
 * @param activeCommentId 当前活动的评论ID
 * @returns 装饰集合
 */
function createHighlightDecorations(
  state: any,
  activeCommentId: string | null
) {
  const decorations: Decoration[] = [];

  // 遍历文档查找评论标记
  state.doc.descendants((node: any, pos: any) => {
    node.marks.forEach((mark: any) => {
      if (mark.type.name === 'comment') {
        const referenceId = mark.attrs.referenceId;
        const isActive = activeCommentId && activeCommentId === referenceId;

        // 只高亮当前活动的评论
        if (isActive) {
          // 创建高亮装饰
          const decoration = Decoration.inline(pos, pos + node.nodeSize, {
            class: 'comment-highlight',
          });
          decorations.push(decoration);
        }
      }
    });
  });

  return DecorationSet.create(state.doc, decorations);
}

/**
 * 生成引用数据
 *
 * @param user 用户信息
 * @param referenceText 引用文本
 * @returns 引用数据
 */
function generateReferenceData(
  user: CommentUserInfo,
  referenceText: string
): ReferenceInterface {
  return {
    referenceId: uuidv4(),
    referenceText: referenceText,
    position: null,
    commentList: [
      {
        comment_id: uuidv4(),
        user: user,
        comment: '',
        date: Date.now(),
      },
    ],
  };
}

/**
 * 根据文档中的位置对引用列表进行排序
 *
 * @param editor 编辑器实例
 * @param referenceList 引用列表
 * @returns 排序后的引用列表
 */
function sortReferenceListByDocumentPosition(
  editor: Editor,
  referenceList: ReferenceInterface[]
): ReferenceInterface[] {
  // 如果引用列表为空，直接返回
  if (!referenceList || referenceList.length === 0) {
    return referenceList;
  }

  // 收集所有引用在文档中的位置信息
  const referencePositions: Array<{
    referenceId: string;
    position: number;
    reference: ReferenceInterface;
  }> = [];

  // 创建引用ID到引用对象的映射，提高查找效率
  const referenceMap = new Map<string, ReferenceInterface>();
  referenceList.forEach((reference) => {
    if (reference.referenceId) {
      referenceMap.set(reference.referenceId, reference);
    }
  });

  // 遍历文档查找所有引用标记的位置
  editor.state.doc.descendants((node: any, pos: any) => {
    const { marks } = node;

    marks.forEach((mark: any) => {
      if (mark.type.name === 'comment') {
        const referenceId = mark.attrs.referenceId;

        // 确保 referenceId 不为 null
        if (referenceId) {
          // 查找对应的引用数据
          const reference = referenceMap.get(referenceId);
          // 一个评论可能对应多段mark，此处只需要取第一处即可
          const hasPush = referencePositions.some(
            (item) => item.referenceId === referenceId
          );

          if (!hasPush && reference) {
            referencePositions.push({
              referenceId,
              position: pos,
              reference,
            });
          }
        }
      }
    });
  });

  // 根据位置排序
  referencePositions.sort((a, b) => a.position - b.position);

  // 返回排序后的引用列表
  const sortedReferences = referencePositions.map((item) => item.reference);

  // 如果排序后的列表长度与原始列表不同，说明有些引用在文档中找不到
  // 将找不到的引用添加到列表末尾
  if (sortedReferences.length < referenceList.length) {
    const foundReferenceIds = new Set(
      sortedReferences.map((ref) => ref.referenceId).filter(Boolean)
    );
    const missingReferences = referenceList.filter(
      (ref) => ref.referenceId && !foundReferenceIds.has(ref.referenceId)
    );
    sortedReferences.push(...missingReferences);
  }

  return sortedReferences;
}

/**
 * 清理无效评论标记 - 使用 Tiptap 命令链批量处理
 *
 * 备选方案：使用命令链批量移除所有不存在的引用标记
 * 更稳定，但性能稍差
 *
 * @param editor 编辑器实例
 */

function cleanupOrphaneMarks(editor: Editor) {
  const referenceList: ReferenceInterface[] =
    editor.storage.comment.referenceList;
  // 收集所有需要移除的标记位置
  const marksToRemove: Array<{ from: number; to: number }> = [];

  // 遍历文档查找需要清理的评论标记
  editor.state.doc.descendants((node: any, pos: any) => {
    const { marks } = node;

    marks.forEach((mark: any) => {
      if (mark.type.name === 'comment') {
        const referenceId = mark.attrs.referenceId;

        // 检查是否存在对应的评论线程
        const referenceExist = referenceList.some(
          (thread) => thread.referenceId === referenceId
        );

        // 如果没有对应评论，则收集需要移除的标记位置
        if (!referenceExist) {
          marksToRemove.push({
            from: pos,
            to: pos + (node.text?.length || 0),
          });
        }
      }
    });
  });

  // 使用单个命令链批量处理所有标记
  let chain = editor.chain();
  // 批量移除所有无效标记
  if (marksToRemove.length > 0) {
    marksToRemove.forEach(({ from, to }) => {
      chain = chain.setTextSelection({ from, to }).unsetMark('comment');
    });
  }
  // 取消选中
  chain.setTextSelection(editor.state.tr.selection.to);
  // 执行批量操作
  return chain.run();
}

/**
 * 扩展 Tiptap 命令集，添加评论相关命令
 */
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customExtension: {
      /**
       * 生成当前选中的引用
       * @returns
       */
      addActiveReference: () => ReturnType;

      /**
       * 移除当前选中的引用
       * @returns
       */
      removeActiveReference: () => ReturnType;

      /**
       * 设置当前活跃的 评论列表
       *
       * @param referenceId
       * @returns
       */
      setActiveReference: (referenceId: string | null) => ReturnType;

      /**
       * 保存当前选中的引用
       * @returns
       */
      saveReference: (comment: string) => ReturnType;

      /**
       * 保存指定引用的评论
       * @param referenceId 引用ID
       * @param comment 评论内容
       * @returns
       */
      saveReferenceById: (referenceId: string, comment: string) => ReturnType;

      /**
       * 获取当前活动引用的信息
       * @returns 引用信息对象或null
       */
      getActiveReference: () => ReturnType;

      /**
       * 删除特定评论命令
       * @param threadId - 评论线程ID
       * @param commentId - 评论ID
       */
      removeSpecificComment: (
        threadId: string,
        commentId: string
      ) => ReturnType;
    };
  }
}

/**
 * 评论功能扩展实现
 */
const CommentsExtension = Mark.create<
  CommentOptionsInterface,
  CommentsStorageInterface
>({
  // 扩展名称，用于标识该扩展
  name: 'comment',

  /**
   * HTML渲染方法，定义评论在文档中的表示方式
   */
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  /**
   * HTML解析方法，从文档中解析评论标记
   */
  parseHTML() {
    return [
      {
        tag: 'span[referenceId]',
        getAttrs: (el) =>
          !!(el as HTMLSpanElement).getAttribute('referenceId')?.trim() && null,
      },
    ];
  },

  /**
   * 初始化存储结构
   * @returns 初始化的存储对象
   */
  addStorage() {
    return {
      referenceList: [], // 所有评论线程
      referenceId: null, // 当前活动的评论ID
      commentId: null, // 当前活跃的评论ID
      focus: false, // 是否聚焦
      needsSorting: false, // 是否需要重新排序
    };
  },

  /**
   * 定义评论标记的属性
   * @returns 属性配置对象
   */
  addAttributes() {
    return {
      referenceId: {
        parseHTML: (element: any) => element.getAttribute('referenceId'),
        renderHTML: (attrs) => ({ referenceId: attrs.referenceId }),
      },
    };
  },

  /**
   * 添加评论相关命令
   * @returns 命令配置对象
   */
  // @ts-ignore
  addCommands() {
    return {
      /**
       * 添加激活的评论命令
       * @returns
       */
      addActiveReference:
        () =>
        ({ editor, chain }) => {
          const state = editor.state;
          // 创建新的评论线程
          // 获取当前选中的文本
          const currentSelection = state.selection;
          const selectedText = state.doc.textBetween(
            currentSelection.from,
            currentSelection.to,
            '\n'
          );

          // 创建新的引用
          const referenceData = generateReferenceData(
            this.options.user,
            selectedText
          );
          const referenceList = this.storage.referenceList;
          // const referenceId = this.storage.referenceId;

          // if (referenceId) {
          //   editor.commands.removeActiveReference();
          // }

          // 先添加新引用到列表（不排序）
          const updatedReferenceList = referenceList.concat(referenceData);
          this.storage.referenceList = updatedReferenceList;
          this.storage.referenceId = referenceData.referenceId;
          this.storage.commentId =
            referenceData.commentList![
              referenceData.commentList!.length - 1
            ]?.comment_id;
          this.storage.focus = true;

          // 先应用 mark 到文档
          const result = chain()
            .setMark('comment', {
              referenceId: referenceData.referenceId,
            })
            .setTextSelection(state.selection.to) // 清除选中状态
            .run();

          // 标记需要重新排序，让 onUpdate 处理
          editor.storage.comment.needsSorting = true;

          return result;
        },

      /**
       * 移除激活的评论命令
       * @returns
       */
      removeActiveReference:
        () =>
        ({ editor }) => {
          const activeReferenceId = editor.storage.comment.referenceId;

          // 如果没有活动的引用，直接返回
          if (!activeReferenceId) {
            return true;
          }
          // 更新存储数据
          editor.storage.comment.referenceList =
            editor.storage.comment.referenceList.filter(
              (referenceItem: ReferenceInterface) =>
                referenceItem.referenceId !== activeReferenceId
            );
          editor.storage.comment.referenceId = null;
          editor.storage.comment.focus = false;
          // 使用更稳定的命令链方法，避免 ProseMirror 事务错误
          return cleanupOrphaneMarks(editor);
        },

      setActiveReference:
        (referenceId: string | null) =>
        ({ editor }) => {
          editor.storage.comment.referenceId = referenceId;
          editor.storage.comment.focus = !!referenceId;
        },

      /**
       * 保存当前选中的引用
       * @param comment 评论内容
       * @returns
       */
      saveReference:
        (comment: string) =>
        ({ editor }) => {
          // 参数验证
          if (!comment || typeof comment !== 'string') {
            console.warn('saveReference: 评论内容不能为空');
            return false;
          }

          const referenceList = this.storage.referenceList;
          const referenceId = this.storage.referenceId;

          // 检查是否有活动的引用
          if (!referenceId) {
            console.warn('saveReference: 没有活动的引用');
            return false;
          }

          // 查找当前活动的引用
          const currentReference: ReferenceInterface | undefined =
            referenceList.find(
              (item: ReferenceInterface) => item.referenceId === referenceId
            );

          if (!currentReference) {
            console.warn('saveReference: 找不到对应的引用数据');
            return false;
          }

          // 检查引用列表是否存在且有内容
          if (
            !currentReference.commentList ||
            currentReference.commentList.length === 0
          ) {
            console.warn('saveReference: 引用列表为空');
            return false;
          }

          // 更新第一个评论的内容
          const firstComment = currentReference.commentList[0];
          if (firstComment) {
            firstComment.comment = comment.trim();
            firstComment.date = Date.now(); // 更新修改时间

            // 更新存储
            editor.storage.comment.referenceList = [...referenceList];
            // editor.storage.comment.referenceId = null;
            editor.storage.comment.commentId = null;
            editor.storage.comment.focus = false;

            console.log('saveReference: 评论保存成功', {
              referenceId,
              comment: firstComment.comment,
              date: firstComment.date,
            });

            return true;
          }

          console.warn('saveReference: 无法更新评论内容');
          return false;
        },

      /**
       * 保存指定引用的评论
       * @param referenceId 引用ID
       * @param comment 评论内容
       * @returns
       */
      saveReferenceById:
        (referenceId: string, comment: string) =>
        ({ editor }) => {
          // 参数验证
          if (!comment || typeof comment !== 'string') {
            console.warn('saveReferenceById: 评论内容不能为空');
            return false;
          }

          const referenceList = editor.storage.comment.referenceList;
          const referenceExist = referenceList.some(
            (item: ReferenceInterface) => item.referenceId === referenceId
          );

          if (!referenceExist) {
            console.warn('saveReferenceById: 找不到对应的引用数据');
            return false;
          }

          // 查找当前活动的引用
          const currentReference = referenceList.find(
            (item: ReferenceInterface) => item.referenceId === referenceId
          );

          if (!currentReference) {
            console.warn('saveReferenceById: 找不到对应的引用数据');
            return false;
          }

          // 检查引用列表是否存在且有内容
          if (
            !currentReference.referenceList ||
            currentReference.referenceList.length === 0
          ) {
            console.warn('saveReferenceById: 引用列表为空');
            return false;
          }

          // 更新第一个评论的内容
          const firstComment = currentReference.referenceList[0];
          if (firstComment) {
            firstComment.comment = comment.trim();
            firstComment.date = Date.now(); // 更新修改时间

            // 更新存储
            editor.storage.comment.referenceList = [...referenceList];

            console.log('saveReferenceById: 评论保存成功', {
              referenceId,
              comment: firstComment.comment,
              date: firstComment.date,
            });

            return true;
          }

          console.warn('saveReferenceById: 无法更新评论内容');
          return false;
        },

      /**
       * 获取当前活动引用的信息
       * @returns 引用信息对象或null
       */
      getActiveReference:
        () =>
        ({ editor }) => {
          const activeReferenceId = editor.storage.comment.referenceId;
          if (activeReferenceId) {
            const referenceList = editor.storage.comment.referenceList;
            const reference = referenceList.find(
              (item: ReferenceInterface) =>
                item.referenceId === activeReferenceId
            );
            if (reference) {
              return {
                referenceId: reference.referenceId,
                referenceList: reference.referenceList,
              };
            }
          }
          return null;
        },

      /**
       * 删除特定评论命令实现
       * @param threadId 评论线程ID
       * @param commentId 评论ID
       */
      removeSpecificComment:
        (threadId: string, commentId: string) =>
        ({ editor }) => {
          // 删除指定评论并更新存储
          this.storage.referenceList = removeComment(
            this.storage.referenceList,
            threadId,
            commentId
          );

          // 使用更稳定的命令链方法，避免 ProseMirror 事务错误
          return cleanupOrphaneMarks(editor);
        },
    };
  },

  /**
   * 文档更新事件处理
   * 处理引用列表的排序和位置更新
   */
  onUpdate() {
    // 检查是否需要重新排序
    if (this.storage.needsSorting) {
      const sortedReferenceList = sortReferenceListByDocumentPosition(
        this.editor,
        this.storage.referenceList
      );
      this.storage.referenceList = sortedReferenceList;
      this.storage.needsSorting = false;
    }
  },

  /**
   * 添加 ProseMirror 插件，用于高亮显示评论和处理点击事件
   * @returns 插件数组
   */
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('comment-highlight'),
        props: {
          /**
           * 创建高亮装饰
           * @param state 编辑器状态
           * @returns 装饰集合
           */
          decorations: (state) => {
            return createHighlightDecorations(state, this.storage.referenceId);
          },
          /**
           * 处理点击事件
           * @param view 编辑器视图
           * @param pos 点击位置
           * @returns 是否处理了点击事件
           */
          handleClick: (view, pos) => {
            const state = view.state;

            // 获取点击位置的 marks
            const marks = state.doc.resolve(pos).marks();

            // 查找 comment mark
            const commentMark = marks.find(
              (mark) => mark.type.name === 'comment'
            );

            if (commentMark) {
              const referenceId = commentMark.attrs.referenceId;

              if (referenceId) {
                // 设置活动引用
                this.editor.commands.setActiveReference(referenceId);

                // 触发评论激活回调
                this.options.onCommentActivated?.(referenceId);

                // 获取并打印评论内容
                const referenceList = this.editor.storage.comment.referenceList;
                const targetReference = referenceList.find(
                  (ref: ReferenceInterface) => ref.referenceId === referenceId
                );

                if (targetReference && targetReference.commentList) {
                  return true; // 表示已处理点击事件
                }
              }
            }

            return false; // 未处理点击事件
          },
        },
      }),
    ];
  },
});

export default CommentsExtension;
