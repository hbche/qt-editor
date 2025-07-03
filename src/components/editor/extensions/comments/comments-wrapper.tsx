import { useState } from 'react';
import { CommentsContext } from './comments-context';
import { CommentInterface, ReferenceInterface } from './types';

export function CommentWrapper({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<ReferenceInterface[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  // 记录新增、回复时的评论
  const [comment, setComment] = useState<string>('');
  // 绘制连线，需要在完成布局计算之后进行连线绘制，当没有聚焦的评论时，不会绘制连线
  const [showLine, setShowLine] = useState<boolean>(false);

  const addComment = (comment: ReferenceInterface) => {
    setActiveCommentId(comment.commentList[0].comment_id);
    setComments([...comments, comment]);
  };

  const updateComment = (id: string, newComment: CommentInterface) => {
    setComments(
      comments.map((comment) =>
        comment.referenceId === id
          ? {
              ...comment,
              commentList: comment.commentList?.map((commentItem) =>
                commentItem.comment_id === newComment.comment_id
                  ? newComment
                  : commentItem
              ),
            }
          : comment
      )
    );
  };

  const deleteComment = (id: string, commentId: string) => {
    const newComments = comments
      .map((comment) =>
        comment.referenceId === id
          ? {
              ...comment,
              commentList: comment.commentList?.filter(
                (commentItem) => commentItem.comment_id !== commentId
              ),
            }
          : comment
      )
      // 过滤掉没有评论的引用
      .filter((item) => Array(item.commentList) && item.commentList.length > 0);
    setComments(newComments);
  };

  const replayTo = (groupId: string, newComment: CommentInterface) => {
    setComments(
      comments.map((comment) =>
        comment.referenceId === groupId
          ? { ...comment, commentList: [...comment.commentList, newComment] }
          : comment
      )
    );
  };

  return (
    <CommentsContext
      value={{
        comments,
        activeCommentId,
        comment,
        addComment,
        updateComment,
        deleteComment,
        replayTo,
        onChangeComment: setComment,
        showLine,
        updateShowLine: setShowLine,
      }}
    >
      {children}
    </CommentsContext>
  );
}
