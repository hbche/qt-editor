import React from 'react';
import { CommentInterface, ReferenceInterface } from './types';

interface CommentsContextValue {
  /** 评论数据 */
  comments: ReferenceInterface[];
  /** 当前聚焦的评论 */
  activeCommentId: string | null;
  /** 当前评论的内容，新增/编辑/回复 */
  comment: string;
  /** 更新评论 */
  onChangeComment: (comment: string) => void;
  /** 新增评论 */
  addComment: (comment: ReferenceInterface) => void;
  /** 更新评论 */
  updateComment: (groupId: string, comment: CommentInterface) => void;
  /** 删除评论 */
  deleteComment: (groupId: string, id: string) => void;
  /** 回复评论 */
  replayTo: (groupId: string, comment: CommentInterface) => void;

  /** 是否展示连线 */
  showLine: boolean;
  /** 更新连线展示状态 */
  updateShowLine: (showLine: boolean) => void;
}

export const CommentsContext = React.createContext<CommentsContextValue | null>(
  null
);
