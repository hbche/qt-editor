import './editor-menu.scss';

import { Editor } from '@tiptap/react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator
} from '../../../tiptap-ui';
import { IconSvg } from '../../../../asset/icons/icon-svg';
import { Level } from '@tiptap/extension-heading';
import { MenuSvg } from '../../../../asset/icons/menu-svg';

interface EditorMenuProps {
  editor: Editor;
}

export const EditorMenu = ({ editor }: EditorMenuProps) => {
  const className = 'editor-menu';
  const headingList = [
    { label: '正文', value: 'paragraph' },
    { label: '标题1', value: 1 },
    { label: '标题2', value: 2 },
    { label: '标题3', value: 3 },
    { label: '标题4', value: 4 },
    { label: '标题5', value: 5 },
    { label: '标题6', value: 6 }
  ];

  const handleHeading = (item: { label: string; value: string | number }) => {
    if (item.value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .setHeading({ level: item.value as Level })
        .run();
    }
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-size='small'>
            {editor.isActive('heading')
              ? headingList.find((item) => item.value === editor.getAttributes('heading').level)?.label
              : '正文'}
            {IconSvg.arrowDown}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={`${className}-headingMenu`}>
          {headingList.map((item) => (
            <DropdownMenuItem key={item.value} onClick={() => handleHeading(item)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        data-size='small'
        data-active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        tooltip='有序列表'
        shortcutKeys='ctrl-alt-7'
      >
        {MenuSvg.orderedList}
      </Button>
      <Button
        data-size='small'
        data-active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        tooltip='无序列表'
        shortcutKeys='ctrl-alt-8'
      >
        {MenuSvg.bulletList}
      </Button>
      <Button
        data-size='small'
        data-active={editor.isActive('taskList')}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        tooltip='任务列表'
        shortcutKeys='ctrl-alt-9'
      >
        {MenuSvg.taskList}
      </Button>
      <Separator />

      <Button
        data-size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
        tooltip='加粗'
        data-active={editor.isActive('bold')}
        shortcutKeys='ctrl-b'
      >
        {MenuSvg.bold}
      </Button>
      <Button
        data-size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        tooltip='斜体'
        data-active={editor.isActive('italic')}
        shortcutKeys='ctrl-i'
      >
        {MenuSvg.italic}
      </Button>
      <Button
        data-size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        tooltip='下划线'
        data-active={editor.isActive('underline')}
        shortcutKeys='ctrl-u'
      >
        {MenuSvg.underline}
      </Button>
      <Button
        data-size='small'
        onClick={() => editor.chain().focus().toggleCode().run()}
        tooltip='代码'
        data-active={editor.isActive('code')}
        shortcutKeys='ctrl-e'
      >
        {MenuSvg.code}
      </Button>

      <Separator />

      {/* 评论 */}
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

export default EditorMenu;
