import './menu-bar.scss';

import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';
import { useEffect, useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Separator
} from '../../../tiptap-ui';
import { MenuSvg } from '../../../../asset/icons/menu-svg';
import { IconSvg } from '../../../../asset/icons/icon-svg';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const className = 'qt-editor-menuBar';
  // 使用状态存储文档是否包含表格
  const [documentHasTable, setDocumentHasTable] = useState(false);
  const headingList: { label: string; value: Level | 'paragraph'; shortcutKeys?: string }[] = [
    { label: '正文', value: 'paragraph', shortcutKeys: 'ctrl-alt-0' },
    { label: '标题1', value: 1, shortcutKeys: 'ctrl-alt-1' },
    { label: '标题2', value: 2, shortcutKeys: 'ctrl-alt-2' },
    { label: '标题3', value: 3, shortcutKeys: 'ctrl-alt-3' },
    { label: '标题4', value: 4, shortcutKeys: 'ctrl-alt-4' },
    { label: '标题5', value: 5, shortcutKeys: 'ctrl-alt-5' },
    { label: '标题6', value: 6, shortcutKeys: 'ctrl-alt-6' }
  ];

  // 检查文档中是否包含表格的函数
  const checkTableExistence = () => {
    if (!editor || !editor.state) return false;

    let hasTable = false;
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'table') {
        hasTable = true;
        return false; // 停止遍历
      }
      return true; // 继续遍历
    });

    return hasTable;
  };

  // 当编辑器内容变化时检查表格存在性
  useEffect(() => {
    if (!editor) return;

    // 初始检查
    setDocumentHasTable(checkTableExistence());

    // 监听文档变化
    const updateListener = () => {
      setDocumentHasTable(checkTableExistence());
    };

    editor.on('update', updateListener);

    return () => {
      editor.off('update', updateListener);
    };
  }, [editor]);

  if (!editor) return null;

  const setLink = () => {
    const isLink = editor.isActive('link');

    // 如果当前已经是链接，则取消链接
    if (isLink) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // 检查是否有选中文本
    if (editor.view.state.selection.empty) {
      window.alert('请先选择要添加链接的文本');
      return;
    }

    // 获取当前链接地址（如果有）
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('请输入链接URL:', previousUrl || '');

    // 如果点击取消，则不做任何操作
    if (url === null) {
      return;
    }

    // 输入URL或清空都将执行相应操作
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url || '' })
      .run();
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        {/* 撤销/重做 */}
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltip='撤销'
          shortcutKeys='ctrl-z'
        >
          {MenuSvg.undo}
        </Button>
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltip='重做'
          shortcutKeys='ctrl-y'
        >
          {MenuSvg.redo}
        </Button>

        <Separator />

        {/* 段落/标题 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={`${className}-heading`} data-size='small' tooltip='段落/标题'>
              {editor.isActive('heading')
                ? headingList.find((item) => item.value === editor.getAttributes('heading').level)?.label
                : '正文'}
              {IconSvg.arrowDown}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {headingList.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => {
                  if (item.value === 'paragraph') {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .setHeading({ level: item.value as Level })
                      .run();
                  }
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 列表 */}
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          tooltip='有序列表'
          data-active={editor.isActive('orderedList')}
          shortcutKeys='ctrl-alt-7'
        >
          {MenuSvg.orderedList}
        </Button>
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          tooltip='无序列表'
          data-active={editor.isActive('bulletList')}
          shortcutKeys='ctrl-alt-8'
        >
          {MenuSvg.bulletList}
        </Button>
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          tooltip='任务列表'
          data-active={editor.isActive('taskList')}
          shortcutKeys='ctrl-alt-9'
        >
          {MenuSvg.taskList}
        </Button>

        {/* 引用和代码块 */}
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          tooltip='引用'
          data-active={editor.isActive('blockquote')}
          shortcutKeys='ctrl-shift-b'
        >
          {MenuSvg.blockquote}
        </Button>
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          tooltip='代码块'
          data-active={editor.isActive('codeBlock')}
          shortcutKeys='ctrl-shift-c'
        >
          {MenuSvg.codeBlock}
        </Button>

        <Separator />

        {/* 加粗、斜体、下划线 */}
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

        {/* 对齐方式 */}
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          data-active={editor.isActive({ textAlign: 'left' })}
          tooltip='左对齐'
          shortcutKeys='ctrl-shift-l'
        >
          {MenuSvg.alignLeft}
        </Button>
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          data-active={editor.isActive({ textAlign: 'center' })}
          tooltip='居中'
          shortcutKeys='ctrl-shift-c'
        >
          {MenuSvg.alignCenter}
        </Button>
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          data-active={editor.isActive({ textAlign: 'right' })}
          tooltip='右对齐'
          shortcutKeys='ctrl-shift-r'
        >
          {MenuSvg.alignRight}
        </Button>

        <Separator />

        {/* 链接 */}
        <Button
          data-size='small'
          onClick={setLink}
          tooltip='添加链接'
          data-active={editor.isActive('link')}
          shortcutKeys='ctrl-k'
        >
          {MenuSvg.link}
        </Button>

        {/* 表格 */}
        <Button
          data-size='small'
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          data-active={editor.isActive('table')}
          tooltip='插入表格'
        >
          {MenuSvg.table}
        </Button>

        {documentHasTable && (
          <div className='tableOperations'>
            <Button
              data-size='small'
              onClick={() => editor.chain().focus().mergeCells().run()}
              disabled={!editor.can().mergeCells()}
              tooltip='合并单元格'
            >
              {MenuSvg.mergeCells}
            </Button>
            <Button
              data-size='small'
              onClick={() => editor.chain().focus().splitCell().run()}
              disabled={!editor.can().splitCell()}
              tooltip='拆分单元格'
            >
              {MenuSvg.splitCell}
            </Button>

            <Separator />

            <Button
              data-size='small'
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              disabled={!editor.can().addColumnBefore()}
              tooltip='在左侧添加列'
            >
              {MenuSvg.insertColumnBefore}
            </Button>
            <Button
              data-size='small'
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              disabled={!editor.can().addColumnAfter()}
              tooltip='在右侧添加列'
            >
              {MenuSvg.insertColumnAfter}
            </Button>
            <Button
              data-size='small'
              onClick={() => editor.chain().focus().deleteColumn().run()}
              disabled={!editor.can().deleteColumn()}
              tooltip='删除列'
            >
              {MenuSvg.deleteColumn}
            </Button>

            <Separator />

            <Button
              data-size='small'
              onClick={() => editor.chain().focus().addRowBefore().run()}
              disabled={!editor.can().addRowBefore()}
              title='在上方添加行'
            >
              {MenuSvg.insertRowBefore}
            </Button>
            <Button
              data-size='small'
              onClick={() => editor.chain().focus().addRowAfter().run()}
              disabled={!editor.can().addRowAfter()}
              title='在下方添加行'
            >
              {MenuSvg.insertRowAfter}
            </Button>
            <Button
              data-size='small'
              onClick={() => editor.chain().focus().deleteRow().run()}
              disabled={!editor.can().deleteRow()}
              tooltip='删除行'
            >
              {MenuSvg.deleteRow}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
