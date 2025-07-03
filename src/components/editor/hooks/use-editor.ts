import { useEditor as useTiptapEditor } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { createEditorExtensions } from '../config/editor-config';
import { useComment } from '../use-comment';

export const useEditor = (editable: boolean, initialContent: string) => {
  const [jsonContent, setJSONContent] = useState<unknown>({});
  const { setActiveId } = useComment();

  const editor = useTiptapEditor(
    {
      extensions: createEditorExtensions((commentId: string) => {
        setActiveId(commentId);
      }),
      content: initialContent,
      editable,
      // 仅在editable时启用交互功能
      enablePasteRules: editable,
      enableInputRules: editable
    },
    [initialContent]
  );

  useEffect(() => {
    if (!editor) return;

    // 初始化时设置一次初始 JSON 内容
    setJSONContent(editor.getJSON());

    // 监听编辑器内容更新事件
    const updateListener = editor.on('update', ({ editor: currentEditor }) => {
      setJSONContent(currentEditor.getJSON());
    });

    return () => {
      updateListener.destroy();
    };
  }, [editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        // 销毁前先解除DOM绑定
        editor.setEditable(false);
        editor.destroy();
      }
    };
  }, [editor]);

  return {
    editor,
    jsonContent
  };
};
