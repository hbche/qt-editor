/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from '@tiptap/react';
import './comments-view.scss';
import { CustomCommentInterface } from '../types';
import { formatDistanceToNow, format, FormatDistanceToken } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// 自定义中文语言包
const customZhCN = {
  ...zhCN,
  formatDistance: (token: string, count: number, options: any) => {
    console.log(token, count, options);
    if (token === 'lessThanXMinutes' && count === 1) {
      return '刚刚';
    }
    return zhCN.formatDistance(token as FormatDistanceToken, count, options);
  },
};

// 时间转换
const formatCommentDate = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;

  // 如果时间差小于24小时，显示相对时间
  if (diff < 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(timestamp, {
      addSuffix: true,
      locale: zhCN,
    });
  }

  // 如果时间差大于24小时，显示具体日期和时间
  return format(timestamp, 'yyyy年MM月dd日 HH:mm', { locale: customZhCN });
};

interface EditorCommentsProps {
  editor: Editor;
  ref: HTMLDivElement;
}

/**
 * 批注组件
 * @returns
 */
const CommentsView = forwardRef(
  ({ editor }: EditorCommentsProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [activeComment, setActiveComment] = useState<string | null>();
    const wrapperRef = useRef<HTMLDivElement>(null); // 添加 ref

    // 添加点击外部区域的处理
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setActiveComment(null);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const className = 'editor-comments-view';
    const comments = editor.storage.comment.comments || [];

    return (
      <div className={className} ref={wrapperRef}>
        <div className={`${className}-header`}>评论</div>
        <div className={`${className}-list`} ref={ref}>
          {comments.map((customComment: CustomCommentInterface) => (
            <div
              key={customComment.threadId}
              className={`${className}-list-item`}
            >
              {(customComment.comments || []).map((comment) => {
                return (
                  <div
                    key={comment.uuid}
                    className={classNames(`${className}-list-item-wrapper`, {
                      active: activeComment === comment.uuid,
                    })}
                    onClick={() => setActiveComment(comment.uuid)}
                  >
                    <div className={`${className}-list-item-title`}>
                      {comment.original_text}
                    </div>
                    <div className={`${className}-list-item-content`}>
                      <div className={`${className}-list-item-content-header`}>
                        <div>
                          {comment.user.firstName}{' '}
                          <span className={`${className}-date`}>
                            {comment.date
                              ? formatCommentDate(comment.date)
                              : ''}
                          </span>
                        </div>
                        <div className={`${className}-operation`}>
                          {activeComment === comment.uuid && (
                            <button
                              onClick={() => {
                                if (customComment.threadId && comment.uuid) {
                                  editor
                                    .chain()
                                    .removeSpecificComment(
                                      customComment.threadId || '',
                                      comment.uuid || ''
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
                      <div className={`${className}-list-item-content-comment`}>
                        {comment.comment}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default CommentsView;
