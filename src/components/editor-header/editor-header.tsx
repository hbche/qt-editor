import { useState } from 'react';
import './editor-header.scss';
import { Button } from '../tiptap-ui';

export interface EditorHeaderProps {
  onEditableChange: (editable: boolean) => void;
  onImportMarkdown: (file: File) => void;
  onExportMarkdown: () => void;
  onSave: () => void;
  lastSavedTime?: string | null;
}

// 编辑器头部
const EditorHeader = ({
  onEditableChange,
  onImportMarkdown,
  onExportMarkdown,
  onSave,
  lastSavedTime
}: EditorHeaderProps) => {
  const className = 'qt-editor-header';
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState('未命名文档');

  return (
    <div className={className}>
      <div className={`${className}-left`}>
        <div className={`${className}-left-title`}>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
          {lastSavedTime && (
            <span className={`${className}-saved-time`}>上次保存: {new Date(lastSavedTime).toLocaleString()}</span>
          )}
        </div>
      </div>
      <div className={`${className}-right`}>
        <div className={`${className}-right-menu`}>
          {!editable && (
            <Button
              className={`${className}-button`}
              data-size='medium'
              onClick={() => {
                setEditable(true);
                onEditableChange(true);
              }}
            >
              编辑
            </Button>
          )}
          {editable && (
            <Button
              className={`${className}-button`}
              data-size='medium'
              onClick={() => {
                onSave();
                setEditable(false);
                onEditableChange(false);
              }}
            >
              保存
            </Button>
          )}
          {editable && (
            <Button
              className={`${className}-button`}
              data-size='medium'
              onClick={() => {
                document.getElementById('file-input')?.click();
              }}
            >
              导入Markdown
              <input
                type='file'
                id='file-input'
                style={{ display: 'none' }}
                accept='.md,.markdown'
                onChange={(e) => {
                  if (e.target.files?.length) {
                    onImportMarkdown(e.target.files[0]);
                  }
                }}
              />
            </Button>
          )}
          <Button
            className={`${className}-button`}
            data-size='medium'
            onClick={() => {
              onExportMarkdown();
            }}
          >
            导出为Markdown
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
