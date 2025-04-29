import { useState } from 'react';
import { CommentsContext } from './comments-context';

const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeComment, setActiveComment] = useState<string>('');

  return (
    <CommentsContext.Provider
      value={{
        activeId,
        activeComment,
        onUpdateActiveId: setActiveId,
        onUpdateActiveComment: setActiveComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
