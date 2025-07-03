import { Editor } from '@tiptap/core';
import { CommentInterface, ReferenceInterface } from '../types';
import { useEffect, useRef, useState } from 'react';
import './comment-input.scss';

export function CommentInput({ editor }: { editor: Editor }) {
  const className = 'editor-comment-input';
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const referenceList: ReferenceInterface[] =
    editor.storage.comment.referenceList || [];
  const activeReferenceId: string | null = editor.storage.comment.referenceId;
  const activeCommentId: string | null = editor.storage.comment.commentId;
  const activeReference: ReferenceInterface | null =
    referenceList.find(
      (comment) => comment.referenceId === activeReferenceId
    ) || null;
  const targetComment: CommentInterface | null =
    activeReference?.commentList?.find(
      (comment) => comment.comment_id === activeCommentId
    ) || null;
  const [comment, setComment] = useState<string>(targetComment?.comment || '');

  useEffect(() => {
    if (activeReference) {
      inputRef.current?.focus?.();
    }
  }, [activeReference]);

  const handleCancel = () => {
    editor.chain().removeActiveReference();
  };

  const handleSave = () => {
    editor.commands.saveReference(comment);
  };

  return (
    <div className={className}>
      {/* <div className={`${className}-header`}>
        <div className={`${className}-header-op`}>
          <div>↓</div>
          <div>↑</div>
        </div>
        <div className={`${className}-header-close`}>X</div>
      </div>
      <div className={`${className}-user`}>张三</div> */}
      <textarea
        className={`${className}-input`}
        rows={4}
        ref={inputRef}
        placeholder='请输入评论'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className={`${className}-footer`}>
        <button
          className='save-button'
          onClick={handleSave}
          disabled={!comment}
        >
          评论
        </button>
        <button className='button' onClick={handleCancel}>
          取消
        </button>
      </div>
    </div>
  );
}
