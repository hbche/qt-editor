import { useState } from 'react';

const useComment = () => {
  /** 当前聚焦的批注ID */
  const [activeId, setActiveId] = useState<string | null>(null);
  /** 当前的批注内容 */
  const [comment, setComment] = useState<string>('');

  return {
    activeId,
    setActiveId,
    comment,
    setComment,
  };
};

export { useComment };
