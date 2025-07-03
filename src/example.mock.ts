export const exampleContent = `
    <h1>QT Editor</h1>
    
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
