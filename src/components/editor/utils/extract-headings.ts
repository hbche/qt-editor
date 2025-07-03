import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Editor } from '@tiptap/react';

/**
 * 标题信息接口
 */
export interface HeadingInfo {
  /** 标题级别 (1-6) */
  level: number;
  /** 标题文本内容 */
  text: string;
  /** 标题在文档中的位置 */
  pos: number;
  /** 标题的唯一ID（可用于锚点） */
  id: string;
}

/**
 * 从 ProseMirror 节点中提取文本内容
 */
function extractTextFromNode(node: ProseMirrorNode): string {
  let text = '';

  node.descendants((child) => {
    if (child.isText) {
      text += child.text;
    }
    return true;
  });

  return text.trim();
}

/**
 * 生成标题的唯一ID（用于锚点链接）
 */
function generateHeadingId(text: string, index: number): string {
  // 移除特殊字符，转换为小写，用连字符替换空格
  const cleanText = text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff]/g, '') // 保留中文字符
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符

  return cleanText || `heading-${index}`;
}

/**
 * 从编辑器中提取所有标题
 * @param editor Tiptap 编辑器实例
 * @returns 标题信息数组
 */
export function extractHeadingsFromEditor(editor: Editor): HeadingInfo[] {
  if (!editor) return [];

  const headings: HeadingInfo[] = [];
  const doc = editor.state.doc;

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level;
      const text = extractTextFromNode(node);
      const id = generateHeadingId(text, headings.length);

      headings.push({
        level,
        text,
        pos,
        id,
      });
    }
    return true;
  });

  return headings;
}

/**
 * 从 ProseMirror 文档节点中提取所有标题
 * @param doc ProseMirror 文档节点
 * @returns 标题信息数组
 */
export function extractHeadingsFromDoc(doc: ProseMirrorNode): HeadingInfo[] {
  const headings: HeadingInfo[] = [];

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level;
      const text = extractTextFromNode(node);
      const id = generateHeadingId(text, headings.length);

      headings.push({
        level,
        text,
        pos,
        id,
      });
    }
    return true;
  });

  return headings;
}

/**
 * 根据级别过滤标题
 * @param headings 标题数组
 * @param levels 要包含的级别数组
 * @returns 过滤后的标题数组
 */
export function filterHeadingsByLevel(
  headings: HeadingInfo[],
  levels: number[]
): HeadingInfo[] {
  return headings.filter((heading) => levels.includes(heading.level));
}

/**
 * 生成标题的目录结构
 * @param headings 标题数组
 * @returns 嵌套的目录结构
 */
export interface TocItem {
  heading: HeadingInfo;
  children: TocItem[];
}

export function generateTableOfContents(headings: HeadingInfo[]): TocItem[] {
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];

  headings.forEach((heading) => {
    const item: TocItem = {
      heading,
      children: [],
    };

    // 找到合适的父级
    while (
      stack.length > 0 &&
      stack[stack.length - 1].heading.level >= heading.level
    ) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }

    stack.push(item);
  });

  return toc;
}

/**
 * 查找特定级别的第一个标题
 * @param headings 标题数组
 * @param level 标题级别
 * @returns 找到的标题信息，如果没有找到则返回 undefined
 */
export function findFirstHeadingByLevel(
  headings: HeadingInfo[],
  level: number
): HeadingInfo | undefined {
  return headings.find((heading) => heading.level === level);
}

/**
 * 获取文档的主标题（第一个 h1 标题）
 * @param headings 标题数组
 * @returns 主标题文本，如果没有找到则返回空字符串
 */
export function getDocumentTitle(headings: HeadingInfo[]): string {
  const mainHeading = findFirstHeadingByLevel(headings, 1);
  return mainHeading?.text || '';
}

/**
 * 从编辑器中提取所有一级标题
 * @param editor Tiptap 编辑器实例
 * @returns 一级标题信息数组
 */
export function extractLevel1Headings(editor: Editor): HeadingInfo[] {
  if (!editor) return [];

  const level1Headings: HeadingInfo[] = [];
  const doc = editor.state.doc;
  let index = 0;

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading' && node.attrs.level === 1) {
      const text = extractTextFromNode(node);
      const id = generateHeadingId(text, index);

      level1Headings.push({
        level: 1,
        text,
        pos,
        id,
      });
      index++;
    }
    return true;
  });

  return level1Headings;
}

/**
 * 从 ProseMirror 文档节点中提取所有一级标题
 * @param doc ProseMirror 文档节点
 * @returns 一级标题信息数组
 */
export function extractLevel1HeadingsFromDoc(
  doc: ProseMirrorNode
): HeadingInfo[] {
  const level1Headings: HeadingInfo[] = [];
  let index = 0;

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading' && node.attrs.level === 1) {
      const text = extractTextFromNode(node);
      const id = generateHeadingId(text, index);

      level1Headings.push({
        level: 1,
        text,
        pos,
        id,
      });
      index++;
    }
    return true;
  });

  return level1Headings;
}

/**
 * 获取第一个一级标题的文本内容
 * @param editor Tiptap 编辑器实例
 * @returns 第一个一级标题的文本，如果没有找到则返回空字符串
 */
export function getFirstLevel1HeadingText(editor: Editor): string {
  const level1Headings = extractLevel1Headings(editor);
  return level1Headings.length > 0 ? level1Headings[0].text : '';
}

/**
 * 检查文档是否包含一级标题
 * @param editor Tiptap 编辑器实例
 * @returns 是否包含一级标题
 */
export function hasLevel1Heading(editor: Editor): boolean {
  if (!editor) return false;

  let hasH1 = false;
  const doc = editor.state.doc;

  doc.descendants((node) => {
    if (node.type.name === 'heading' && node.attrs.level === 1) {
      hasH1 = true;
      return false; // 找到后停止遍历
    }
    return true;
  });

  return hasH1;
}
