import { Extension, Node, Mark } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Strike from '@tiptap/extension-strike';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Code from '@tiptap/extension-code';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import FontSize from '../extensions/font-size/font-size';
import CommentsExtension from '../extensions/comments';
import { MarkdownTransform } from '../extensions/markdown-transform/markdown-transform';

// 创建联合类型处理所有可能的扩展类型
type AnyExtension = Extension | Node | Mark;

export const createEditorExtensions = (onCommentActivated: (commentId: string) => void): AnyExtension[] => {
  return [
    Document,
    Heading,
    Paragraph,
    Text,
    Underline,
    TextStyle,
    FontFamily,
    Strike,
    History,
    Italic,
    Bold,
    Color,
    TextAlign.configure({
      types: ['heading', 'paragraph', 'codeBlock']
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
      isAllowedUri: (url, ctx) => {
        try {
          const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
          if (!ctx.defaultValidate(parsedUrl.href)) return false;

          const disallowedProtocols = ['ftp', 'file', 'mailto'];
          const protocol = parsedUrl.protocol.replace(':', '');
          if (disallowedProtocols.includes(protocol)) return false;

          const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));
          if (!allowedProtocols.includes(protocol)) return false;

          const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
          const domain = parsedUrl.hostname;
          if (disallowedDomains.includes(domain)) return false;

          return true;
        } catch {
          return false;
        }
      },
      shouldAutoLink: (url) => {
        try {
          const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);
          const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
          const domain = parsedUrl.hostname;
          return !disallowedDomains.includes(domain);
        } catch {
          return false;
        }
      }
    }),
    ListItem,
    OrderedList,
    BulletList,
    TaskList,
    TaskItem.configure({
      nested: true
    }),
    Blockquote,
    CodeBlock,
    Code,
    HorizontalRule,
    Image,
    Table.configure({
      resizable: true
    }),
    TableHeader,
    TableRow,
    TableCell,
    FontSize.configure({
      types: ['heading', 'paragraph'],
      defaultSize: '16px',
      step: 2,
      minSize: 12,
      maxSize: 72
    }),
    CommentsExtension.configure({
      user: {
        firstName: 'Hanbin',
        lastName: 'Che',
        id: '1'
      },
      HTMLAttributes: {
        // 修改此处的class时需要对应修改index.scss中对应样式的class选择器
        class: 'comment-extension'
      },
      onCommentActivated
    }),
    MarkdownTransform
  ];
};
