import React, { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  extractHeadingsFromEditor,
  generateTableOfContents,
  HeadingInfo,
  TocItem,
} from '../../utils/extract-headings';
import './table-of-contents.scss';

interface TableOfContentsProps {
  editor: Editor | null;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  editor,
  className = '',
}) => {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!editor) return;

    // 初始提取标题
    const extractHeadings = () => {
      const extractedHeadings = extractHeadingsFromEditor(editor);
      setHeadings(extractedHeadings);
      setToc(generateTableOfContents(extractedHeadings));
    };

    // 初始化时提取一次
    extractHeadings();

    // 监听编辑器内容变化
    const updateListener = editor.on('update', extractHeadings);

    return () => {
      updateListener.destroy();
    };
  }, [editor]);

  const handleHeadingClick = (heading: HeadingInfo) => {
    if (!editor) return;

    // 跳转到标题位置
    editor.commands.focus();
    editor.commands.setTextSelection(heading.pos);

    // // 滚动到视图中
    // const element = editor.view.dom.querySelector(
    //   `[data-heading-id="${heading.id}"]`
    // );
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
  };

  const renderTocItem = (item: TocItem, index: number) => (
    <li key={`${item.heading.level}-${index}`} className='toc-item'>
      <button
        className={`toc-link toc-level-${item.heading.level}`}
        onClick={() => handleHeadingClick(item.heading)}
        title={item.heading.text}
      >
        {item.heading.text}
      </button>
      {item.children.length > 0 && (
        <ul className='toc-children'>
          {item.children.map((child, childIndex) =>
            renderTocItem(child, childIndex)
          )}
        </ul>
      )}
    </li>
  );

  if (headings.length === 0) {
    return (
      <div className={`table-of-contents empty ${className}`}>
        <h3>目录</h3>
        <p className='empty-message'>暂无标题</p>
      </div>
    );
  }

  return (
    <div className={`table-of-contents ${className}`}>
      <h3>目录</h3>
      <nav className='toc-nav'>
        <ul className='toc-list'>
          {toc.map((item, index) => renderTocItem(item, index))}
        </ul>
      </nav>

      {/* 显示标题统计信息 */}
      <div className='toc-stats'>
        <small>
          共 {headings.length} 个标题
          {headings.some((h) => h.level === 1) &&
            ` • 主标题: ${headings.find((h) => h.level === 1)?.text}`}
        </small>
      </div>
    </div>
  );
};

export default TableOfContents;
