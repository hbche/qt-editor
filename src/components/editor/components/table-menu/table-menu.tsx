import './table-menu.scss';

import { Editor } from '@tiptap/react';
import { Button, Separator } from '../../../tiptap-ui';
import { MenuSvg } from '../../../../asset/icons/menu-svg';

interface TableMenuProps {
  editor: Editor;
}

/** 表格操作菜单 */
export default function TableMenu({ editor }: TableMenuProps) {
  if (!editor.isEditable) {
    return null;
  }

  const className = 'table-menu';

  return (
    <div className={className}>
      <ul>
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
            tooltip='向左侧添加列'
          >
            {MenuSvg.insertColumnBefore}
          </Button>
        </li>
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
            tooltip='向右侧添加列'
          >
            {MenuSvg.insertColumnAfter}
          </Button>
        </li>
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
            tooltip='删除当前列'
          >
            {MenuSvg.deleteColumn}
          </Button>
        </li>

        <Separator />

        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
            tooltip='在上方添加新行'
          >
            {MenuSvg.insertRowBefore}
          </Button>
        </li>
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
            tooltip='在下方添加新行'
          >
            {MenuSvg.insertRowAfter}
          </Button>
        </li>
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
            tooltip='删除当前行'
          >
            {MenuSvg.deleteRow}
          </Button>
        </li>
        <Separator />
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.can().mergeCells()}
            tooltip='合并选中的单元格'
          >
            {MenuSvg.mergeCells}
          </Button>
        </li>
        <li>
          <Button
            data-size='small'
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.can().splitCell()}
            tooltip='拆分当前单元格'
          >
            {MenuSvg.splitCell}
          </Button>
        </li>
      </ul>
    </div>
  );
}
