import React from 'react';

interface CommentsContextInterface {
  /** 当前选中的批注的id */
  activeId: string | null;
  /** 当前选中的批注 */
  activeComment: string;
  onUpdateActiveId: (id: string) => void;
  onUpdateActiveComment: (comment: string) => void;
}

export const CommentsContext =
  React.createContext<CommentsContextInterface | null>(null);
