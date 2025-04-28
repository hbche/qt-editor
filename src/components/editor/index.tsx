import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import CodeBlock from '@tiptap/extension-code-block';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import FontFamily from '@tiptap/extension-font-family';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  isTextSelection,
  Editor as TiptapEditor,
  useEditor,
} from '@tiptap/react';
import { useEffect, useState } from 'react';
import ContentView from './components/ContentView/ContentView';
import EditorMenu from './components/EditorMenu/EditorMenu';
import FontSize from './extensions/FontSize/FontSize';
import './index.scss';
import BulletList from '@tiptap/extension-bullet-list';
import TableMenu from './components/TableMenu/TableMenu';

const exampleContent = `
    <h1>Tiptap Editor</h1>
    
<p>Here is an example:</p>
<table>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
        </tr>
        <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
        </tr>
</table>

    <hr /><p>The <b>Tiptap Editor</b> is a <i>headless</i>, <i>framework-agnostic</i> rich text editor <u>that's customizable</u> and extendable through extensions. Its headless nature means it comes without a set user interface, offering full design freedom (for a jumpstart, see linked <a href="https://github.com/ueberdosis/tiptap?tab=readme-ov-file#examples-codesandbox-and-ui-templates">UI templates</a> below). Tiptap is based on the highly reliable <a href="https://github.com/ProseMirror/prosemirror">ProseMirror</a> library.</p>

    <p>Tiptap Editor is complemented by the collaboration open-source backend <a href="https://github.com/ueberdosis/hocuspocus">Hocuspocus</a>. Both the Editor and Hocuspocus form the foundation of the <a href="https://tiptap.dev/">Tiptap Suite</a>.</p>

    <h3>How does the Tiptap Editor work?</h3>
    <ul>
      <li><b>Headless Framework:</b> Tiptap does not rely on a user interface. So there is no need for class overrides or code hacks. If you do need an example UI feel free to browse our UI templates linked below.</li>
      <li><b>Framework-agnostic:</b> The Tiptap Editor is designed to work across different frontend frameworks. This means whether you're using Vue, React, or plain JavaScript, Tiptap integrates without compatibility issues.</li>
      <li><b>Extension based:</b> Extensions in Tiptap allow for a tailored editing experience, from simple text styling to advanced features like drag-and-drop block editing. You have the option to choose from over 100 extensions available in the documentation and community to enhance your editor's functionality.</li>
      <li><b>Customize your UX:</b> The editor was built to give you control to define your own extensions and nodes.</li>
    </ul>
    <blockquote>Headless UI refers to a set of UI components that provide all the interactive behavior and accessibility features without imposing any pre-defined visual styles. In other words, these components are "headless" because they don't include any CSS or styling—they only supply the logic (like handling keyboard interactions, focus management, and state control). This allows developers to fully customize the look and feel of their UI while still benefiting from robust, accessible component behavior.</blockquote>
    <hr />

    <h2>Documentation</h2>

    <p>For more detailed information, make sure to check out our <a href="https://tiptap.dev/docs/editor/installation">documentation</a>. If you encounter any problems or have suggestions for our system, please open an issue.</p>

    <h3>Examples, CodeSandbox and UI Templates</h3>
    <p>Have a look at the <a href="https://tiptap.dev/docs/examples">examples to see Tiptap in action</a> or <b>review</b> and <b>fork</b> our codesandboxes.</p>

    <ol>
    <li>Basic example of the Tiptap editor.</li>
    <li>Collaboration ready Tiptap CodeSandbox</li>
    <li>React notion-like block editor template: Demo</li>
    </ol>

    <hr />

    <h2>Example</h2>
    <h3>React</h3>
    <p>This guide describes how to integrate Tiptap with your React project. We're using Vite, but the workflow should be similar with other setups.</p>
    <pre><code># create a project with npm
npm create vite@latest my-tiptap-project -- --template react-ts

# OR, create a project with pnpm
pnpm create vite@latest my-tiptap-project --template react-ts

# OR, create a project with yarn
yarn create vite my-tiptap-project --template react-ts

# change directory
cd my-tiptap-project</code></pre>

<h3>Have you seen our tables? They are amazing!</h3>

<ol>
    <li>Tables with rows, cells and headers (optional)</li>
    <li>Support for colgroup and rowspan</li>
    <li>And even resizable columns (optional)</li>
</ol>

<hr />
<p></p>

<img src="https://floating-ui.com/getting-started.png" alt="Tiptap Editor React" style={{ width: '100px', height: '100px' }} />
<p>This is Image Demo.</p>
<br />
<br />
<br />
    `;

export interface EditorProps {
  /**
   * 是否可编辑
   */
  editable: boolean;
}

const Editor = ({ editable }: EditorProps) => {
  const [jsonContent, setJSONContent] = useState<any>({});
  const extensions = [
    Document,
    Heading,
    Paragraph,
    // CustomParagraph,
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
      types: ['heading', 'paragraph', 'codeBlock'],
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(':')
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`);

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false;
          }

          // disallowed protocols
          const disallowedProtocols = ['ftp', 'file', 'mailto'];
          const protocol = parsedUrl.protocol.replace(':', '');

          if (disallowedProtocols.includes(protocol)) {
            return false;
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map((p) =>
            typeof p === 'string' ? p : p.scheme
          );

          if (!allowedProtocols.includes(protocol)) {
            return false;
          }

          // disallowed domains
          const disallowedDomains = [
            'example-phishing.com',
            'malicious-site.net',
          ];
          const domain = parsedUrl.hostname;

          if (disallowedDomains.includes(domain)) {
            return false;
          }

          // all checks have passed
          return true;
        } catch {
          return false;
        }
      },
      shouldAutoLink: (url) => {
        try {
          // construct URL
          const parsedUrl = url.includes(':')
            ? new URL(url)
            : new URL(`https://${url}`);

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = [
            'example-no-autolink.com',
            'another-no-autolink.com',
          ];
          const domain = parsedUrl.hostname;

          return !disallowedDomains.includes(domain);
        } catch {
          return false;
        }
      },
    }),
    ListItem,
    OrderedList,
    BulletList,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Blockquote,
    CodeBlock,
    HorizontalRule,
    Image,
    Table.configure({
      resizable: true,
    }),
    TableHeader,
    TableRow,
    TableCell,
    // 自定义组件
    FontSize.configure({
      types: ['heading', 'paragraph'],
      defaultSize: '16px',
      step: 2,
      minSize: 12,
      maxSize: 72,
    }),
  ];
  const editor: TiptapEditor | null = useEditor({
    extensions,
    content: exampleContent,
    editable,
  });

  useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor: currentEditor }) => {
        setJSONContent(currentEditor.getJSON());
      });
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  return (
    <div className='editor'>
      <div className='editor-content'>
        {editor && (
          // 表格操作菜单
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: 'top',
              maxWidth: '100%',
            }}
            shouldShow={({ view, state, from, to }) => {
              const { selection } = state;
              const { empty } = selection;
              // 检查选区是否在表格节点内
              let isTableSelected = false;

              editor.state.doc.nodesBetween(from, to, (node) => {
                if (node.type.name === 'table') {
                  isTableSelected = true;
                }
              });

              const hasEditorFocus = view.hasFocus();

              if (
                !isTableSelected ||
                !hasEditorFocus ||
                empty ||
                !editor.isEditable
              ) {
                return false;
              }

              return true;
            }}
          >
            <TableMenu editor={editor} />
          </BubbleMenu>
        )}
        {editor && (
          // 选中时的操作菜单
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: 'top',
              maxWidth: '100%',
            }}
            shouldShow={({ view, state, from, to }) => {
              const { doc, selection } = state;

              // 检查选区是否在表格节点内
              let isTableSelected = false;

              editor.state.doc.nodesBetween(from, to, (node) => {
                if (node.type.name === 'table') {
                  isTableSelected = true;
                }
              });

              const { empty } = selection;

              // 检查选区是否是文本节点，避免对非文本节点生效，例如图片，因为图标没有加粗、字号、字体等调整
              let isSelectedText = false;

              editor.state.doc.nodesBetween(from, to, (node) => {
                if (node.isText) {
                  isSelectedText = true;
                  return false;
                }
                return true;
              });

              // 有时仅检查 `empty` 是不够的。
              // 双击一个空段落会返回节点大小为 2。
              // 因此我们还需要检查文本大小是否为空。
              const isEmptyTextBlock =
                !doc.textBetween(from, to).length &&
                isTextSelection(state.selection);

              const hasEditorFocus = view.hasFocus();

              if (
                isTableSelected ||
                !isSelectedText ||
                !hasEditorFocus ||
                empty ||
                isEmptyTextBlock ||
                !editor.isEditable
              ) {
                return false;
              }

              return true;
            }}
          >
            <EditorMenu editor={editor} />
          </BubbleMenu>
        )}
        {editor && (
          // 空白行的操作菜单
          <FloatingMenu
            editor={editor}
            tippyOptions={{ duration: 100, placement: 'top', maxWidth: '100%' }}
          >
            <EditorMenu editor={editor} />
          </FloatingMenu>
        )}
        <EditorContent editor={editor} />
      </div>
      <ContentView jsonContent={jsonContent} />
    </div>
  );
};

export default Editor;
