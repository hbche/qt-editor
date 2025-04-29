export interface CommentInterface {
  user: CommentUserInfo;
  uuid: string | null;
  comment: string;
  /** 生成批注的时间戳 */
  date: number | null;
  /** 父级批注的id */
  parent_id: string | null;
  /** 父级批注的标题 */
  parent_title: string | null;
  /** 关联的原文 */
  original_text: string | null;
}

/**
 * 添加批注的参数
 */
export interface AddCommentInterface {
  comment: string;
  parent_id: string | null;
}

export interface CustomCommentInterface {
  /** 批注的id */
  threadId: string | null;
  /** 批注的列表 */
  comments: CommentInterface[] | null;
}

export interface CommentsStorageInterface {
  /** 批注的列表 */
  comments: CustomCommentInterface[];
  /** 当前选中的批注的id */
  comment_id: string | null;
  /** 当前hover中的批注的id */
  hovered_comment_id: string | null;
}

export interface CommentUserInfo {
  firstName: string;
  lastName: string;
  id: string;
}

export interface CommentOptionsInterface {
  user: CommentUserInfo;
}
