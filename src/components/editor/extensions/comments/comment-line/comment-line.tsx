import { Editor } from '@tiptap/core';
import './comment-line.scss';
import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';

export function CommentLine({ editor }: { editor: Editor }) {
  const className = 'editor-comment-line';
  const activeReferenceId: string = editor.storage.comment.referenceId;
  const containerRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const drawPath = useCallback(() => {
    if (!activeReferenceId) return;
    const container = containerRef.current;
    const anchorEl = document.querySelector(
      `[referenceid="${activeReferenceId}"]`
    ) as HTMLElement | null;
    const commentEl = document.querySelector(
      `[data-for="${activeReferenceId}"]`
    ) as HTMLElement | null;

    if (!container || !activeReferenceId || !anchorEl || !commentEl) return;

    const containerRect = container.getBoundingClientRect();
    const anchorRect = anchorEl.getBoundingClientRect();
    const commentRect = commentEl.getBoundingClientRect();
    // 左侧评论与右侧编辑器之间的间隙为52px，贝塞尔曲线需要在这个区间绘制
    const gap = 52;
    const topGap = 4;
    const r = 12;

    // 1. 绘制直线部分
    const start1X = anchorRect.right - containerRect.left;
    const start1Y = anchorRect.top + anchorRect.height - containerRect.top;
    const linePoints = [
      [
        anchorRect.right - containerRect.left,
        anchorRect.top - topGap - containerRect.top,
      ],
      [
        commentRect.left - containerRect.left - gap,
        anchorRect.top - topGap - containerRect.top,
      ],
    ];

    // 1. 计算起点 (从 anchor 中间右侧)
    const startX = commentRect.left - containerRect.left - gap;
    const startY = anchorRect.top - topGap - containerRect.top;

    // 2. 计算终点 (comment 左边中间)
    const endX = commentRect.left - containerRect.left;
    const endY = commentRect.top + commentRect.height / 2 - containerRect.top;
    console.log(startX, startY, endX, endY);

    // 3. 创建 path 路径：可调整弯曲程度
    const path = `
        M ${start1X} ${start1Y}
        ${linePoints.map(
          ([pointX, pointY]) => `L ${pointX} ${pointY}
            `
        )}
        L ${startX + gap / 2 - r} ${startY}
        Q ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${startY + r}
        L ${(startX + endX) / 2} ${endY - r}
        Q ${(startX + endX) / 2} ${endY}, ${(startX + endX) / 2 + r} ${endY}
        L ${endX} ${endY}
    `;

    if (pathRef.current) {
      // 4. 更新内容
      pathRef.current.setAttribute('d', path);
    }
  }, [activeReferenceId]);

  useEffect(() => {
    drawPath();
  }, [drawPath, activeReferenceId]);

  return (
    <svg
      className={classNames(`${className}`, { hidden: !activeReferenceId })}
      ref={containerRef}
    >
      <path ref={pathRef} className='comment-line-path' />
    </svg>
  );
}
