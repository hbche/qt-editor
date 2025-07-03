import { CommentPositionVO, ReferenceInterface } from '../types';

export function calculateCommentPosition(
  referenceList: ReferenceInterface[],
  activeReferenceId: string
) {
  const container = document.querySelector('.editor-container');
  const editorContainerRect = container?.getBoundingClientRect();
  const anchors = referenceList
    .map((referenceItem) =>
      document.querySelector(
        `.comment-extension[referenceid="${referenceItem.referenceId}"]`
      )
    )
    .filter(Boolean) as HTMLElement[];

  // 1. 根据 anchor 锚点计算所有评论的初始位置信息
  const commentPositionList: CommentPositionVO[] = [];
  let targetIndex = 0;
  anchors.forEach((anchor, index) => {
    const anchorRect = anchor.getBoundingClientRect();
    // 获取锚点距离编辑器顶部的距离
    const anchorTop = anchorRect.top - editorContainerRect!.top;
    const anchorLeft = anchorRect.left - editorContainerRect!.left;
    // 获取id
    const referenceId = anchor.getAttribute('referenceId') as string;
    // 获取评论元素
    const commentEl = document.querySelector(
      `[data-for="${referenceId}"]`
    ) as HTMLElement;
    const commentRect = commentEl.getBoundingClientRect();
    // 获取锚点距离编辑器顶部的距离
    const commentTop = commentRect.top - editorContainerRect!.top;
    const commentLeft = commentRect.left - editorContainerRect!.left;
    if (referenceId === activeReferenceId) {
      targetIndex = index;
    }

    commentPositionList.push({
      anchorPosition: {
        top: anchorTop,
        left: anchorLeft,
      },
      commentPosition: {
        top: commentTop,
        left: commentLeft,
      },
      referenceId,
      height: commentEl.offsetHeight,
      commentEl: commentEl,
    });
  });

  // 2. 以 id 为 activeReferenceId 的评论为中心点，将 commentPositionList 分成前后两个列表，分别对前后两个列表中的评论进行碰撞检测，规避后的top作为最终元素的top
  const gap = 12;

  // 3. 中间节点前面的节点进行碰撞检测
  const previousCommentList = commentPositionList.slice(0, targetIndex + 1);
  for (let i = previousCommentList.length - 1; i > 0; i--) {
    const current = previousCommentList[i];
    const previous = previousCommentList[i - 1];
    if (
      previous.anchorPosition.top + previous.height + gap >
      current.anchorPosition.top
    ) {
      previous.anchorPosition.top =
        current.anchorPosition.top - gap - previous.height;
    }
  }

  // 4. 中间节点后面的节点进行碰撞检测
  const nextCommentList = commentPositionList.slice(targetIndex);
  for (let i = 0; i < nextCommentList.length - 1; i++) {
    const current = nextCommentList[i];
    const next = nextCommentList[i + 1];
    if (
      next.anchorPosition.top <
      current.anchorPosition.top + current.height + gap
    ) {
      next.anchorPosition.top =
        current.anchorPosition.top + current.height + gap;
    }
  }

  commentPositionList.forEach(({ commentEl, anchorPosition: { top } }) => {
    commentEl.style.top = `${top}px`;
  });

  return commentPositionList;
}
