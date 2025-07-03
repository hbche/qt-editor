import { Editor as TiptapEditor } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react';
import EditorMenu from './editor-menu/editor-menu';
// import TableMenu from './table-menu/table-menu';
import { BlockMenu } from './block-menu/block-menu';

interface EditorMenusProps {
  editor: TiptapEditor | null;
}

export const EditorMenus = ({ editor }: EditorMenusProps) => {
  if (!editor) return null;

  return (
    <>
      {/* 表格单元格hover菜单 - 左侧显示 */}
      {/* <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: 'left',
          maxWidth: '100%',
          delay: [300, 0] // hover延迟显示
        }}
        shouldShow={({ view, from, to }) => {
          let hasTableCell = false;
          let hasText = false;

          // 检查选区内是否有表格单元格和文本节点
          editor.state.doc.nodesBetween(from, to, (node) => {
            if (node.type.name === 'tableCell') {
              hasTableCell = true;
            }
            if (node.isText && node.text && node.text.length > 0) {
              hasText = true;
            }
            return true;
          });

          const hasEditorFocus = view.hasFocus();
          const { selection } = editor.state;
          const { empty } = selection;

          // 只有hover在表格单元格且没有选中文本时才展示表格菜单
          if (!hasTableCell || hasText || !hasEditorFocus || !editor.isEditable || !empty) {
            return false;
          }

          return true;
        }}
      >
        <TableMenu editor={editor} />
      </BubbleMenu> */}

      {/* 表格内选中文本菜单 - 上方显示 */}
      {/* <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: 'top',
          maxWidth: '100%'
        }}
        shouldShow={({ view, state, from, to }) => {
          const { selection } = state;
          let hasTableCell = false;

          editor.state.doc.nodesBetween(from, to, (node) => {
            if (node.type.name === 'tableCell') {
              hasTableCell = true;
            }
          });

          const { empty } = selection;
          let isSelectedText = false;

          editor.state.doc.nodesBetween(from, to, (node) => {
            if (node.isText) {
              isSelectedText = true;
              return false;
            }
            return true;
          });

          const hasEditorFocus = view.hasFocus();

          // 在表格内选中文本时显示文本菜单
          if (!hasTableCell || !isSelectedText || !hasEditorFocus || empty || !editor.isEditable) {
            return false;
          }

          return true;
        }}
      >
        <EditorMenu editor={editor} />
      </BubbleMenu> */}

      {/* 普通文本选中菜单 - 上方显示 */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: 'top',
          maxWidth: '100%'
        }}
        shouldShow={({ view, state, from, to }) => {
          const { doc, selection } = state;
          const { empty } = selection;
          const hasEditorFocus = view.hasFocus();

          const hasTextContent = doc.textBetween(from, to).trim().length > 0;

          if (!hasTextContent || !hasEditorFocus || empty || !editor.isEditable) {
            return false;
          }

          return true;
        }}
      >
        <EditorMenu editor={editor} />
      </BubbleMenu>

      {/* 空白行+号按钮 - 左侧显示 */}
      <FloatingMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: 'left',
          maxWidth: '100%'
        }}
        shouldShow={({ state, view }) => {
          const { selection } = state;
          const { empty } = selection;

          // 检查是否在表格内
          let isInTable = false;
          const { from } = selection;

          editor.state.doc.nodesBetween(from, from, (node) => {
            if (node.type.name === 'table') {
              isInTable = true;
              return false;
            }
            return true;
          });

          // 只在非表格内的空白行显示
          if (isInTable || !empty || !view.hasFocus() || !editor.isEditable) {
            return false;
          }

          // 检查当前行是否为空
          const { $from } = selection;
          const isEmptyLine = $from.parent.content.size === 0;

          return isEmptyLine;
        }}
      >
        <BlockMenu editor={editor} />
      </FloatingMenu>
    </>
  );
};
