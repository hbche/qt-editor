import { EditorContent } from '@tiptap/react';
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import MenuBar from './components/menu-bar/menu-bar';
import { useEditor } from './hooks/use-editor';
import { EditorMenus } from './components/editor-menus';
import { exampleContent } from '../../example.mock';
import ReadOnlyMenu from './components/readonly-menu/readonly-menu';
import { CommentList } from './extensions/comments/comment-list/comment-list';
import { CommentLine } from './extensions/comments/comment-line/comment-line';
import { CommentWrapper } from './extensions/comments/comments-wrapper';
import uploadFile from './utils/upload-file';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  getLastSavedTime,
} from './utils/save-content';
import './index.scss';
import { CommentsContext } from './extensions/comments/comments-context';

export interface EditorProps {
  /**
   * 是否可编辑
   */
  editable: boolean;
}

// 编辑器实例暴露的方法接口
export interface EditorRef {
  /**
   * 导出为Markdown
   */
  exportToMarkdown: () => void;
  /**
   * 导入Markdown内容
   */
  importMarkdown?: (file: File) => void;
  /**
   * 获取编辑器实例
   */
  // getEditor: () => TiptapEditor | null;
  /**
   * 获取当前内容
   */
  getContent?: () => string;
  /**
   * 设置内容
   */
  setContent?: (content: string) => void;
  /**
   * 保存内容到本地存储
   * @param update 是否直接更新content, 如果为true, 则不触发onSave回调
   */
  saveContent?: (update: boolean) => boolean;
  /**
   * 获取最后保存时间
   */
  getLastSavedTime?: () => string | null;
}

// 可编辑编辑器组件
const EditableEditor = ({
  content,
  onSave,
  editorRef,
}: {
  content: string;
  onSave: (content: string, update: boolean) => void;
  editorRef: React.RefObject<EditorRef>;
}) => {
  const { editor } = useEditor(true, content);

  const handleSave = useCallback(
    (update: boolean) => {
      const content = editor?.getHTML() || '';
      const success = saveToLocalStorage(content);
      if (success) {
        onSave(content, update);
        console.log('内容已保存到本地存储');
      } else {
        console.error('保存失败');
      }
      return success;
    },
    [editor, onSave]
  );

  // 添加快捷键监听
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleSave(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, handleSave]);

  // 暴露编辑器方法给外部
  useImperativeHandle(
    editorRef,
    () => ({
      exportToMarkdown: () => {
        editor?.chain().focus().transformToMarkdown();
      },
      importMarkdown: (file: File) => {
        if (file) {
          uploadFile(file).then((markdown) => {
            editor?.chain().focus().transformToNode(markdown);
          });
        }
      },
      getContent: () => {
        return editor?.getHTML() || '';
      },
      setContent: (content: string) => {
        editor?.commands.setContent(content);
      },
      saveContent: (update: boolean) => {
        const success = handleSave(update);
        return success;
      },
      getLastSavedTime: () => {
        return getLastSavedTime();
      },
    }),
    [editor, handleSave]
  );

  if (!editor) return null;

  return (
    <div className='editor'>
      <div className='editor-container'>
        <div className='editor-content'>
          <MenuBar editor={editor} />
          <EditorMenus editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <CommentWrapper>
          <>
            <CommentList editor={editor} />
            <CommentLine editor={editor} />
          </>
        </CommentWrapper>
      </div>

      {/* <ContentView jsonContent={jsonContent} /> */}
    </div>
  );
};

// 只读编辑器组件
const ReadOnlyEditor = ({
  content,
  editorRef,
}: {
  content: string;
  editorRef: React.RefObject<EditorRef>;
}) => {
  const { editor } = useEditor(false, content);
  const { showLine } = useContext(CommentsContext)!;

  // 暴露编辑器方法给外部
  useImperativeHandle(
    editorRef,
    () => ({
      exportToMarkdown: () => {
        editor?.chain().focus().transformToMarkdown();
      },
      getContent: () => {
        return editor?.getHTML() || '';
      },
      getLastSavedTime: () => {
        return getLastSavedTime();
      },
    }),
    [editor]
  );

  if (!editor) return null;

  return (
    <div className='editor'>
      <div className='editor-container'>
        <div className='editor-content'>
          <ReadOnlyMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <>
          <CommentList editor={editor} />
          {showLine && <CommentLine editor={editor} />}
        </>
      </div>
    </div>
  );
};

const Editor = forwardRef<EditorRef, EditorProps>(({ editable }, ref) => {
  // 添加状态存储保存的内容
  const [savedContent, setSavedContent] = useState(() => {
    // 优先从本地存储加载内容，如果没有则使用默认内容
    const localContent = loadFromLocalStorage();
    return localContent || exampleContent;
  });

  if (!editable) {
    return (
      <CommentWrapper>
        <ReadOnlyEditor
          content={savedContent}
          editorRef={ref as React.RefObject<EditorRef>}
        />
      </CommentWrapper>
    );
  }

  // 编辑模式传入保存回调
  return (
    <EditableEditor
      content={savedContent}
      onSave={(content, update) => {
        if (update) {
          setSavedContent(content);
        }
      }}
      editorRef={ref as React.RefObject<EditorRef>}
    />
  );
});

Editor.displayName = 'Editor';

export default Editor;
