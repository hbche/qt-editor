/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, Mark, mergeAttributes } from '@tiptap/core';
import { v4 as uuidv4 } from 'uuid';
import { findIndex } from 'lodash';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import {
  CommentOptionsInterface,
  CommentsStorageInterface,
  CustomCommentInterface,
  CommentInterface,
  AddCommentInterface,
} from './types';
import classNames from 'classnames';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customExtension: {
      addComments: (comment: AddCommentInterface) => ReturnType;
      removeSpecificComment: (
        threadId: string,
        commentId: string
      ) => ReturnType;
    };
  }
}

const CommentsExtsnsion = Mark.create<
  CommentOptionsInterface,
  CommentsStorageInterface
>({
  name: 'comment',
  //   addOptions() {
  //     return {
  //       user: {},
  //     };
  //   },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
  parseHTML() {
    return [
      {
        tag: 'span[comment_id]',
        getAttrs: (el) =>
          !!(el as HTMLSpanElement).getAttribute('comment_id')?.trim() && null,
      },
    ];
  },
  addStorage() {
    return {
      comments: [],
      comment_id: null,
      hovered_comment_id: null,
    };
  },
  addAttributes() {
    return {
      comment_id: {
        parseHTML: (element: any) => element.getAttribute('comment_id'),
        renderHTML: (attrs) => ({ comment_id: attrs.comment_id }),
      },
    };
  },
  // @ts-ignore
  addCommands() {
    return {
      addComments:
        (comment: AddCommentInterface) =>
        ({ chain }) => {
          let commentsList: CustomCommentInterface;
          // 获取当前选中的文本
          const currentSelection = this.editor.state.selection;
          const selectedText = this.editor.state.doc.textBetween(
            currentSelection.from,
            currentSelection.to,
            '\n'
          );
          const finalComment: CommentInterface = {
            uuid: uuidv4(),
            user: this.options.user,
            comment: comment.comment,
            date: Date.now(),
            parent_title: null,
            parent_id: null,
            original_text: selectedText,
          };
          if (comment.parent_id) {
            const index = findIndex(this.storage.comments, {
              threadId: this.storage.comment_id,
            });
            const commentIndex = findIndex(
              this.storage.comments[index].comments ?? [],
              { uuid: comment.parent_id }
            );
            const parent = this.storage.comments[index];
            if (parent && parent.comments) {
              finalComment.parent_id = parent.comments[commentIndex].uuid;
              finalComment.parent_title = parent.comments[
                commentIndex
              ].comment.substring(0, 50);
            }
            this.storage.comments[index].comments?.push(finalComment);
          } else {
            commentsList = {
              threadId: uuidv4(),
              comments: [],
            };
            commentsList.comments?.push(finalComment);
            this.storage.comments.push(commentsList);
            chain()
              .setMark('comment', {
                comment_id: commentsList.threadId,
              })
              .run();
          }
          return true;
        },
      removeSpecificComment: (threadId: string, commentId: string) => () => {
        const comments = this.storage?.comments;
        const index = findIndex(comments, { threadId: threadId });
        if (comments[index].comments) {
          const commentIndex = findIndex(comments[index].comments ?? [], {
            uuid: commentId,
          });
          comments[index].comments?.splice(commentIndex, 1);

          if (!comments[index].comments?.length) {
            comments.splice(index, 1);
          }

          this.storage.comments = comments;
          this.editor.state.doc.descendants((node: any, pos: any) => {
            const { marks } = node;
            marks.forEach((mark: any) => {
              if (mark.type.name === 'comment') {
                const comment_id = mark.attrs.comment_id;
                if (
                  !this.storage.comments.filter(
                    (obj) => obj.threadId === comment_id
                  ).length
                ) {
                  this.editor.commands.setTextSelection({
                    from: pos,
                    to: pos + (node.text?.length || 0),
                  });
                  this.editor.commands.unsetMark('comment');
                }
              }
            });
          });
        }
        return true;
      },
    };
  },
  // @ts-ignore
  onSelectionUpdate({ editor }: { editor: Editor }) {
    if (!editor.isActive('comment')) {
      this.storage.comment_id = null;
    } else {
      this.storage.comment_id = editor.getAttributes('comment').comment_id;
    }
  },
  onUpdate() {},
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('comment-highlight'),
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];

            // 遍历文档查找评论标记
            state.doc.descendants((node, pos) => {
              node.marks.forEach((mark) => {
                if (mark.type.name === 'comment') {
                  const commentId = mark.attrs.comment_id;
                  const { comment_id, hovered_comment_id } = this.storage;
                  const isActive = comment_id && comment_id === commentId;
                  const isHover =
                    hovered_comment_id && hovered_comment_id === commentId;

                  if (isActive || isHover) {
                    // 创建高亮装饰
                    const decoration = Decoration.inline(
                      pos,
                      pos + node.nodeSize,
                      {
                        class: classNames({
                          'comment-highlight': isActive,
                          'comment-hover': isHover,
                        }),
                      }
                    );
                    decorations.push(decoration);
                  }
                }
              });
            });

            return DecorationSet.create(state.doc, decorations);
          },
          //   handleDOMEvents: {
          //     mouseover: (view, event) => {
          //       const target = event.target as HTMLElement;
          //       // Element.closest() 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
          //       const commentElement = target.closest('[comment_id]');

          //       if (commentElement) {
          //         const isActive =
          //           commentElement?.getAttribute('comment_id') ===
          //           this.storage.comment_id;
          //         if (isActive) return;
          //         const commentId = commentElement.getAttribute('comment_id');
          //         if (commentId) {
          //           this.storage.hovered_comment_id = commentId;
          //           view.dispatch(
          //             view.state.tr.setMeta('commentHover', commentId)
          //           );
          //         }
          //       }
          //     },
          //     mouseout: (view, event) => {
          //       const target = event.target as HTMLElement;
          //       const commentElement = target.closest('[comment_id]');

          //       if (commentElement) {
          //         const isActive =
          //           commentElement?.getAttribute('comment_id') ===
          //           this.storage.comment_id;
          //         if (isActive) return;
          //         this.storage.hovered_comment_id = null;
          //         view.dispatch(view.state.tr.setMeta('commentHover', null));
          //       }
          //     },
          //   },
        },
      }),
    ];
  },
});

export default CommentsExtsnsion;
