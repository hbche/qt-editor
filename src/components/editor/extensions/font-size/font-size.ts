import { Mark } from '@tiptap/core';

/**
 * 从字体大小字符串中提取数值
 * @param size 字体大小字符串，如 "12px", "1.5em", "2rem" 等
 * @returns 提取的数值，如果无法提取则返回默认值
 */
export const extractFontSizeValue = (
  size: string,
  defaultValue: number = 16
): number => {
  // 使用正则表达式匹配数字部分
  const match = size.match(/^(\d+(?:\.\d+)?)/);
  if (match) {
    const value = parseFloat(match[1]);
    return isNaN(value) ? defaultValue : value;
  }
  return defaultValue;
};

export interface FontSizeOptions {
  /**
   * 哪些类型可以使用
   * @default []
   * @example ['heading', 'paragraph']
   */
  types: string[];

  /**
   * 默认字体大小
   */
  defaultSize: string;

  /**
   * 设置字体大小的步长
   */
  step: number;

  /**
   * 最小字体限制
   */
  minSize?: number;

  /**
   * 最大字体限制
   */
  maxSize?: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * 设置字体大小属性
       * @param fontSize 字体大小
       * @example editor.commands.setFontSize('13px')
       */
      setFontSize: (fontSize: string) => ReturnType;

      /**
       * 增大字体大小
       * @example editor.commands.increaseFontSize()
       */
      increaseFontSize: () => ReturnType;

      /**
       * 减小字体大小
       * @example editor.commands.decreaseFontSize()
       */
      decreaseFontSize: () => ReturnType;

      /**
       * 移除字体大小属性设置
       * @example editor.commands.unsetFontSize()
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Mark.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: [],
      defaultSize: '16px',
      step: 1,
      minSize: 12,
      maxSize: 72,
    };
  },

  addAttributes() {
    return {
      size: {
        default: this.options.defaultSize,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes?.size) {
            return {};
          }
          return { style: `font-size: ${attributes.size}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*=font-size]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ commands }) => {
          try {
            const value = parseFloat(size);
            if (isNaN(value)) return false;

            // 检查大小限制
            if (this.options.minSize && value < this.options.minSize)
              return false;
            if (this.options.maxSize && value > this.options.maxSize)
              return false;

            return commands.setMark(this.name, { size });
          } catch (error) {
            console.warn('Failed to set font size:', error);
            return false;
          }
        },
      increaseFontSize:
        () =>
        ({ state, commands }) => {
          const { from, to } = state.selection;
          let currentFontSize = this.options.defaultSize;

          // 遍历逻辑
          const marks = state.doc.rangeHasMark(from, to, this.type);
          if (marks) {
            const firstNode = state.doc.nodeAt(from);
            if (firstNode) {
              const mark = firstNode.marks.find(
                (m) => m.type.name === this.name
              );
              if (mark?.attrs.size) {
                currentFontSize = mark.attrs.size;
              }
            }
          }

          const currentValue = extractFontSizeValue(currentFontSize);
          if (isNaN(currentValue)) return false;

          const newValue = Math.min(
            this.options.maxSize || Infinity,
            currentValue + this.options.step
          );

          return commands.setMark(this.name, { size: `${newValue}px` });
        },

      decreaseFontSize:
        () =>
        ({ state, commands }) => {
          const { from, to } = state.selection;
          let currentFontSize = this.options.defaultSize;

          // 遍历逻辑
          const marks = state.doc.rangeHasMark(from, to, this.type);
          if (marks) {
            const firstNode = state.doc.nodeAt(from);
            if (firstNode) {
              const mark = firstNode.marks.find(
                (m) => m.type.name === this.name
              );
              if (mark?.attrs.size) {
                currentFontSize = mark.attrs.size;
              }
            }
          }

          const currentValue = extractFontSizeValue(currentFontSize);
          if (isNaN(currentValue)) return false;

          const newValue = Math.max(
            this.options.minSize || 1,
            currentValue - this.options.step
          );

          return commands.setMark(this.name, { size: `${newValue}px` });
        },

      unsetFontSize:
        () =>
        ({ commands }) => {
          return this.options.types
            .map(() => commands.unsetMark(this.name))
            .every((response) => response);
        },
    };
  },
});

export default FontSize;
