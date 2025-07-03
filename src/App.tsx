import './App.css';

import { useRef, useState, useEffect } from 'react';
import Editor, { EditorRef } from './components/editor';
import EditorHeader from './components/editor-header/editor-header';

function App() {
  const editorRef = useRef<EditorRef>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // 处理保存
  const handleSave = (update: boolean) => {
    const success = editorRef.current?.saveContent?.(update);
    if (success) {
      const newSavedTime = editorRef.current?.getLastSavedTime?.();
      setLastSavedTime(newSavedTime || null);
    } else {
      console.error('保存失败');
    }
  };

  // 获取最后保存时间
  useEffect(() => {
    const savedTime = editorRef.current?.getLastSavedTime?.();
    setLastSavedTime(savedTime || null);
  }, []);

  useEffect(() => {
    if (editable) {
      const interval = setInterval(() => {
        handleSave(false);
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [editable]);

  return (
    <div className='main'>
      <EditorHeader
        onEditableChange={setEditable}
        onImportMarkdown={(file) => {
          editorRef.current?.importMarkdown?.(file);
        }}
        onExportMarkdown={() => {
          editorRef.current?.exportToMarkdown();
        }}
        onSave={() => handleSave(true)}
        lastSavedTime={lastSavedTime}
      />
      <Editor editable={editable} ref={editorRef} />
    </div>
  );
}

export default App;
