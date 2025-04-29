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

/**
 * CommentsExtension 的存储结构
 */
export interface CommentsStorageInterface {
  /** 批注的列表 */
  comments: CustomCommentInterface[];
  /** 当前选中的批注的id */
  comment_id: string | null;
}

export interface CommentUserInfo {
  firstName: string;
  lastName: string;
  id: string;
}

/**
 * CommentExtension扩展的默认参数
 */
export interface CommentOptionsInterface {
  /** 当前批注的用户信息 */
  user: CommentUserInfo;
  /** 批注部分的HTML属性 */
  HTMLAttributes: Record<string, any>;
  /** 当前处于激活状态的 批注 */
  onCommentActivated: (commentId: string) => void;
}
