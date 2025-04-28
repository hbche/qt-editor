import { Editor } from '@tiptap/react';

import './FontSizeBar.scss';
import { extractFontSizeValue } from '../../../extensions/FontSize/FontSize';
import classNames from 'classnames';

interface FontSizeBarProps {
  editor: Editor;
}

export const FontSizeBar = ({ editor }: FontSizeBarProps) => {
  const className = 'fontSizeBar';

  // 获取FontSize扩展的默认字体大小
  const getDefaultFontSize = (): string => {
    const fontSizeExtension = editor.extensionManager.extensions.find(
      (extension) => extension.name === 'fontSize'
    );
    return fontSizeExtension?.options.defaultSize || '16px';
  };

  // 获取当前字体大小，如果没有则使用默认值
  const currentSize =
    editor.getAttributes('fontSize').size || getDefaultFontSize();

  // 提取当前字体大小的数值
  const sizeValue = extractFontSizeValue(currentSize);

  return (
    <div className={className}>
      <div className={`${className}-trigger`}>
        <button
          className={classNames(`${className}-btn`, {
            active: editor.isActive('fontSize'),
          })}
        >
          <svg
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 5.4667V3H20V5.4667'
              stroke='#333'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 3V21'
              stroke='#333'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8 21H16'
              stroke='#333'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <div className={`${className}-tooltip`}>
          <ul className={`${className}-tooltip-list`}>
            <li
              className={`${className}-tooltip-list-item ${className}-tooltip-btn`}
              onClick={() => editor.chain().focus().decreaseFontSize().run()}
            >
              -
            </li>
            <li className={`${className}-tooltip-list-item`}>
              <input
                type='number'
                step={2}
                value={sizeValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue) {
                    editor.chain().focus().setFontSize(`${newValue}px`).run();
                  }
                }}
              />
            </li>
            <li
              className={`${className}-tooltip-list-item ${className}-tooltip-btn`}
              onClick={() => editor.chain().focus().increaseFontSize().run()}
            >
              +
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
