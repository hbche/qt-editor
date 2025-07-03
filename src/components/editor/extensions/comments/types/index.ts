/** 坐标信息 */
export interface PositionInfo {
  left: number;
  top: number;
}

/**
 * 评论位置信息
 */
export interface CommentPositionVO {
  referenceId: string;
  /** 锚点坐标信息 */
  anchorPosition: PositionInfo;
  /** 评论坐标信息 */
  commentPosition: PositionInfo;
  // 评论节点的高度
  height: number;
  // 评论节点
  commentEl: HTMLElement;
}

export interface CommentInterface {
  /** 用户信息 */
  user: CommentUserInfo;
  /** 批注的id */
  comment_id: string | null;
  /** 批注的内容 */
  comment: string;
  /** 生成批注的时间戳 */
  date: number | null;
}

export interface ReferenceInterface {
  /** 评论引用ID */
  referenceId: string | null;
  /** 引用文本 */
  referenceText: string | null;
  /** 批注的列表 */
  commentList: CommentInterface[];
  /** 评论的位置信息 */
  position: CommentPositionVO | null;
}

/**
 * CommentsExtension 的存储结构
 */
export interface CommentsStorageInterface {
  /** 当前选中的引用id */
  referenceId: string | null;
  /** 当前活跃的评论 */
  commentId: string | null;
  /** 引用列表 */
  referenceList: ReferenceInterface[];
  /** 是否聚焦 */
  focus: boolean;
  /** 是否需要重新排序 */
  needsSorting: boolean;
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
  HTMLAttributes: Record<string, string | number | boolean>;
  /** 当前处于激活状态的 批注 */
  onCommentActivated: (commentId: string) => void;
}
