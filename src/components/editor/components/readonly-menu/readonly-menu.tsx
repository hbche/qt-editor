import { BubbleMenu, Editor } from '@tiptap/react';
import CommentMenu from './comment-menu/comment-menu';

const ReadOnlyMenu = ({ editor }: { editor: Editor }) => {
  const className = 'readonly-menu';
  return (
    <div className={className}>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: 'top',
          maxWidth: '100%',
          delay: [300, 0]
        }}
        shouldShow={({ state, from, to }) => {
          const { selection } = state;
          const { empty } = selection;

          if (empty) {
            return false;
          }

          const selectedText = state.doc.textBetween(from, to, ' ');
          if (!selectedText || selectedText.length < 1) {
            return false;
          }

          return true;
        }}
      >
        <CommentMenu editor={editor} />
      </BubbleMenu>
    </div>
  );
};

export default ReadOnlyMenu;
