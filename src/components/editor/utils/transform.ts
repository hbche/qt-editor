import { EditorView } from '@tiptap/pm/view';

function transformNodeToMarkdown(view: EditorView) {
  console.log(view);
  return 'transformNodeToMarkdowncontent';
}

function transformMarkdownToNode(content: string) {
  return content;
}

export { transformNodeToMarkdown, transformMarkdownToNode };
