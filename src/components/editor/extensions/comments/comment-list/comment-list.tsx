import { Editor } from '@tiptap/core';
import './comment-list.scss';
import { formatCommentDate } from '../../../utils/format-comment-date';
import { ReferenceInterface } from '../types';
import classNames from 'classnames';
import { useEffect, useState, useRef, useCallback } from 'react';
import { CommentInput } from '../comment-input/comment-input';
import { calculateCommentPosition } from '../utils';

// 自定义 Hook：处理点击外部区域
function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  excludeSelectors: string[] = []
) {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // 检查是否点击在排除的元素上
        const target = event.target as HTMLElement;
        const isExcluded = excludeSelectors.some((selector) =>
          target.closest(selector)
        );

        if (!isExcluded) {
          callback();
        }
      }
    },
    [callback, excludeSelectors]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return ref;
}

export function CommentList({ editor }: { editor: Editor }) {
  const className = 'editor-comments';
  // 获取存储在 storage 中的评论消息
  const referenceList = editor.storage.comment.referenceList || [];
  console.log(referenceList);
  const activeReferenceId = editor.storage.comment.referenceId;
  const activeCommentId = editor.storage.comment.commentId;
  const focus = editor.storage.comment.focus;
  const [activeComment, setActiveComment] = useState<string | null>(
    activeReferenceId
  );

  useEffect(() => {
    if (activeReferenceId) {
      setActiveComment(activeReferenceId);
    }
  }, [activeReferenceId]);

  // 使用自定义 Hook 处理点击外部区域
  const containerRef = useClickOutside<HTMLDivElement>(
    () => {
      setActiveComment(null);
      editor.commands.setActiveReference(null);
    },
    // 排除已生成的备注引用
    ['.comment-extension']
  );

  // 处理列表项点击，防止事件冒泡
  const handleListItemClick = (
    commentId: string | null,
    referenceId: string | null,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    editor.commands.setActiveReference(referenceId);
    if (commentId) {
      setActiveComment(commentId);
    }
  };

  useEffect(() => {
    if (activeReferenceId) {
      const containerEl = document.querySelector<HTMLElement>('#root');
      const scrollTop = containerEl?.scrollTop || 0;
      const commentList = calculateCommentPosition(
        referenceList,
        activeReferenceId
      );
      if (!containerEl) return;
      containerEl.scrollTo({ top: scrollTop });

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY < 0 && containerEl.scrollTop <= 0) {
          // 向上滚动，且滚动条已经到顶部
          const minTop = Math.min(
            ...commentList.map((c) => c.anchorPosition.top)
          );
          if (minTop < 52) {
            const offset = Math.min(Math.abs(e.deltaY), 52);
            commentList.forEach((c) => {
              c.anchorPosition.top += offset;
              c.commentEl.style.top = `${c.anchorPosition.top}px`;
            });
            e.preventDefault(); // 阻止默认滚动行为
          }
        }
      };

      containerEl.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        containerEl.removeEventListener('wheel', handleWheel);
      };
    }
  }, [referenceList, activeReferenceId]);

  return (
    <div className={className}>
      <div className={`${className}-header`}>评论</div>
      <div className={`${className}-list`} ref={containerRef}>
        <div className={`${className}-list-item-container`}>
          {referenceList.map((referenceItem: ReferenceInterface) => {
            const isActive = referenceItem.referenceId === activeReferenceId;
            return (
              <div
                key={referenceItem.referenceId}
                data-for={referenceItem.referenceId}
                className={classNames(`${className}-list-item`, {
                  active: isActive,
                })}
              >
                {(referenceItem.commentList || []).map((comment) => {
                  if (comment.comment_id === activeCommentId && focus) {
                    return (
                      <CommentInput editor={editor} key={comment.comment_id} />
                    );
                  }
                  return (
                    <div
                      key={comment.comment_id}
                      onClick={(event) =>
                        handleListItemClick(
                          comment.comment_id,
                          referenceItem.referenceId,
                          event
                        )
                      }
                    >
                      {referenceItem.referenceText && (
                        <div className={`${className}-list-item-title`}>
                          {referenceItem.referenceText}
                        </div>
                      )}
                      <div className={`${className}-list-item-content`}>
                        <div
                          className={`${className}-list-item-content-header`}
                        >
                          <div>
                            {comment.user.firstName}{' '}
                            <span className={`${className}-date`}>
                              {comment.date
                                ? formatCommentDate(comment.date)
                                : ''}
                            </span>
                          </div>
                          <div className={`${className}-operation`}>
                            {activeComment === comment.comment_id && (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (
                                    referenceItem.referenceId &&
                                    comment.comment_id
                                  ) {
                                    editor
                                      .chain()
                                      .removeSpecificComment(
                                        referenceItem.referenceId || '',
                                        comment.comment_id || ''
                                      );
                                  }
                                }}
                              >
                                <svg
                                  width='1em'
                                  height='1em'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M10 2.95703H14V6.95703H21.5V10.957H2.5V6.95703H10V2.95703Z'
                                    stroke='#333'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                  <path
                                    d='M4 20H20V11H4V20Z'
                                    fill='none'
                                    stroke='#333'
                                    strokeWidth='2'
                                    strokeLinejoin='round'
                                  />
                                  <path
                                    d='M8 19.9488V16.957'
                                    stroke='#333'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                  <path
                                    d='M12 19.9488V16.9488'
                                    stroke='#333'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                  <path
                                    d='M16 19.9488V16.957'
                                    stroke='#333'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                  <path
                                    d='M6 20H18'
                                    stroke='#333'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        <div
                          className={`${className}-list-item-content-comment`}
                        >
                          {comment.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
