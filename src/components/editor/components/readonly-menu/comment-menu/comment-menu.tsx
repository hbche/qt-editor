import './comment-menu.scss';

import { Editor } from '@tiptap/react';
import { Button } from '../../../../tiptap-ui';
import { MenuSvg } from '../../../../../asset/icons/menu-svg';

const CommentMenu = ({ editor }: { editor: Editor }) => {
  const className = 'comment-menu';
  return (
    <div className={className}>
      <Button
        data-size='small'
        onClick={() => {
          if (editor.isActive('comment')) {
            editor.chain().removeActiveReference();
          } else {
            editor.chain().addActiveReference().run();
          }
        }}
        tooltip='添加评论'
      >
        {MenuSvg.comment}
      </Button>
    </div>
  );
};

export default CommentMenu;
