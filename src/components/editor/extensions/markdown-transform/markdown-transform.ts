import { CommandProps, Extension } from '@tiptap/core';
import {
  defaultMarkdownSerializer,
  MarkdownSerializer,
} from 'prosemirror-markdown';
import download from '../../utils/download';
import MarkdownIt from 'markdown-it';
import { getFirstLevel1HeadingText } from '../../utils/extract-headings';

/**
 * 将snake_case转换为 snake_case + camelCase
 *
 * @param source
 * @returns
 */
function transformSnakeCaseToAppendCamelCase<T>(
  source: Record<string, T>
): Record<string, T> {
  const result: Record<string, T> = { ...source };

  Object.keys(source).forEach((key: string) => {
    // 测试snake_case，将snake_case转换为camelCase
    if (/_[a-z]+/.test(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      result[camelCaseKey] = source[key];
    }
  });

  return result;
}

// 创建自定义的 markdown 序列化器，支持表格
const customMarkdownSerializer = new MarkdownSerializer(
  {
    // 继承默认的节点序列化规则
    ...transformSnakeCaseToAppendCamelCase(defaultMarkdownSerializer.nodes),
    // 添加表格相关的序列化规则
    table(state, node) {
      // 收集表格数据
      const rows: string[][] = [];
      let hasHeader = false;

      // 遍历行
      node.forEach((row, _offset, i) => {
        const cells: string[] = [];
        // 遍历单元格
        row.forEach((cell) => {
          // 获取单元格内容
          let content = '';
          // 遍历单元格内容
          cell.forEach((childNode) => {
            if (childNode.isText) {
              content += childNode.text;
            } else if (childNode.type.name === 'paragraph') {
              childNode.forEach((textNode) => {
                if (textNode.isText) {
                  content += textNode.text;
                }
              });
            }
          });
          // 清理内容，移除换行符和多余空格
          content = content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
          cells.push(content || ' ');
        });
        rows.push(cells);

        // 检查第一行是否为表头
        if (i === 0) {
          row.forEach((cell) => {
            if (cell.type.name === 'table_header') {
              hasHeader = true;
            }
          });
        }
      });

      if (rows.length === 0) return;

      // 计算每列的最大宽度
      const colWidths: number[] = [];
      rows.forEach((row) => {
        row.forEach((cell, colIndex) => {
          colWidths[colIndex] = Math.max(colWidths[colIndex] || 0, cell.length);
        });
      });

      // 生成 markdown 表格
      state.write('\n');

      // 写入表格行
      rows.forEach((row, rowIndex) => {
        state.write('|');
        row.forEach((cell, colIndex) => {
          const paddedCell = cell.padEnd(colWidths[colIndex]);
          state.write(` ${paddedCell} |`);
        });
        state.write('\n');

        // 如果有表头，在第一行后添加分隔符
        if ((hasHeader || rows.length > 0) && rowIndex === 0) {
          state.write('|');
          colWidths.forEach((width) => {
            state.write(` ${'-'.repeat(width)} |`);
          });
          state.write('\n');
        }
      });

      state.write('\n');
    },
  },
  {
    // 继承默认的标记序列化规则
    ...defaultMarkdownSerializer.marks,
    italic: {
      open: '*',
      close: '*',
      mixable: true,
      expelEnclosingWhitespace: true,
    },
    bold: {
      open: '**',
      close: '**',
      mixable: true,
      expelEnclosingWhitespace: true,
    },
    underline: {
      open: '<u>',
      close: '</u>',
      mixable: true,
      expelEnclosingWhitespace: true,
    },
  }
);

// interface MarkdownTransformOptions {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    markdownTransform: {
      /**
       * 将 doc 转换为 markdown 字符串并替换编辑器内容
       * @example editor.commands.transformToMarkdown()
       */
      transformToMarkdown: () => ReturnType;
      /**
       * 将 markdown 字符串转换为 doc 并替换编辑器内容，如果markdown没有提供，则将当前编辑器中的节点作为markdown转换
       * @example editor.commands.transformToNode(markdown)
       */
      transformToNode: (markdown: string) => ReturnType;
    };
  }
}

export const MarkdownTransform = Extension.create({
  name: 'markdownTransform',

  addOptions() {
    return { mode: 'node' };
  },

  addCommands() {
    return {
      // 将富文本节点转换成markdown语法
      transformToMarkdown:
        () =>
        ({ editor, state }) => {
          try {
            // 使用自定义序列化器将当前文档序列化为 markdown 字符串
            const markdown = customMarkdownSerializer.serialize(state.doc);

            if (markdown) {
              const title = getFirstLevel1HeadingText(editor);
              download(markdown, `${title || 'markdown'}.md`);
              // 更新当前模式
              this.options.mode = 'markdown';
              return true;
            }

            return true;
          } catch (error) {
            console.error('Error in transformToMarkdown:', error);
            return false;
          }
        },

      transformToNode:
        (markdown: string) =>
        ({ editor }: CommandProps) => {
          try {
            // 创建与修复后代码相同的 MarkdownIt 配置
            const markdownIt = MarkdownIt('default', { html: true });
            const parsedDoc = markdownIt.render(markdown);
            editor.commands.setContent(parsedDoc);

            return true;
          } catch (error) {
            console.error('Error in transformToMarkdown:', error);
            return false;
          }
        },
    };
  },
});
