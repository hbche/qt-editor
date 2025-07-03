import './block-menu.scss';

import { Editor } from '@tiptap/react';
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from '../../../tiptap-ui';
import { IconSvg } from '../../../../asset/icons/icon-svg';
import { MenuSvg } from '../../../../asset/icons/menu-svg';

interface BlockMenuProps {
  editor: Editor;
}

export const BlockMenu = ({ editor }: BlockMenuProps) => {
  const className = 'block-menu';

  const insertHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const insertList = (type: 'bullet' | 'ordered') => {
    if (type === 'bullet') {
      editor.chain().focus().toggleBulletList().run();
    } else {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const insertBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-size='small' className={`${className}-trigger`}>
            {IconSvg.plus}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='left' align='center'>
          <DropdownMenuItem onClick={() => insertHeading(1)}>
            {MenuSvg.h1}
            标题 1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => insertHeading(2)}>
            {MenuSvg.h2}
            标题 2
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => insertHeading(3)}>
            {MenuSvg.h3}
            标题 3
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => insertList('bullet')}>
            {MenuSvg.bulletList}
            无序列表
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => insertList('ordered')}>
            {MenuSvg.orderedList}
            有序列表
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={insertCodeBlock}>
            {MenuSvg.codeBlock}
            代码块
          </DropdownMenuItem>
          <DropdownMenuItem onClick={insertBlockquote}>
            {MenuSvg.blockquote}
            引用
          </DropdownMenuItem>
          <DropdownMenuItem onClick={insertTable}>
            {MenuSvg.table}
            表格
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
