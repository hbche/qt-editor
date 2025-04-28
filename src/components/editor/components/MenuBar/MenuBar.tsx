import { Editor } from '@tiptap/react';
import Divider from '../Divider/Divider';

import './MenuBar.scss';

interface MenuBarProps {
  editor: Editor | null;
  editable: boolean;
}

const MenuBar = ({ editor, editable }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const hasFormat =
    editor.getAttributes('heading')?.level ||
    editor.isActive('bold') ||
    editor.isActive('italic') ||
    editor.isActive('underline') ||
    editor.isActive('strike') ||
    editor.getAttributes('textStyle')?.fontFamily ||
    editor.isActive({ textAlign: 'center' }) ||
    editor.isActive({ textAlign: 'right' }) ||
    editor.getAttributes('textStyle')?.color ||
    editor.isActive('link');

  return (
    <div className={editable ? 'menuBar' : `menuBar disabled`}>
      <div className='button-group'>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
          }
        >
          H6
        </button>
        <Divider />
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          U
        </button>
        <Divider />
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
          className={
            editor.isActive('textStyle', { fontFamily: 'Inter' })
              ? 'is-active'
              : ''
          }
          data-test-id='inter'
        >
          Inter
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setFontFamily('"Comic Sans MS", "Comic Sans"')
              .run()
          }
          className={
            editor.isActive('textStyle', {
              fontFamily: '"Comic Sans MS", "Comic Sans"',
            })
              ? 'is-active'
              : ''
          }
          data-test-id='comic-sans'
        >
          Comic Sans
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('serif').run()}
          className={
            editor.isActive('textStyle', { fontFamily: 'serif' })
              ? 'is-active'
              : ''
          }
          data-test-id='serif'
        >
          Serif
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setFontFamily('monospace').run()
          }
          className={
            editor.isActive('textStyle', { fontFamily: 'monospace' })
              ? 'is-active'
              : ''
          }
          data-test-id='monospace'
        >
          Monospace
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
          className={
            editor.isActive('textStyle', { fontFamily: 'cursive' })
              ? 'is-active'
              : ''
          }
          data-test-id='cursive'
        >
          Cursive
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setFontFamily('var(--title-font-family)')
              .run()
          }
          className={
            editor.isActive('textStyle', {
              fontFamily: 'var(--title-font-family)',
            })
              ? 'is-active'
              : ''
          }
          data-test-id='css-variable'
        >
          CSS variable
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('"Exo 2"').run()}
          className={
            editor.isActive('textStyle', { fontFamily: '"Exo 2"' })
              ? 'is-active'
              : ''
          }
          data-test-id='exo2'
        >
          Exo 2
        </button>
        <button
          onClick={() => editor.chain().focus().unsetFontFamily().run()}
          data-test-id='unsetFontFamily'
        >
          Unset font family
        </button>
      </div>

      <div className='button-group'>
        <input
          type='color'
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as any).value)
              .run()
          }
          value={editor.getAttributes('textStyle').color}
          data-testid='setColor'
        />
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'is-active'
              : ''
          }
          data-testid='setPurple'
        >
          Purple
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#F98181').run()}
          className={
            editor.isActive('textStyle', { color: '#F98181' })
              ? 'is-active'
              : ''
          }
          data-testid='setRed'
        >
          Red
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
          className={
            editor.isActive('textStyle', { color: '#FBBC88' })
              ? 'is-active'
              : ''
          }
          data-testid='setOrange'
        >
          Orange
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#FAF594').run()}
          className={
            editor.isActive('textStyle', { color: '#FAF594' })
              ? 'is-active'
              : ''
          }
          data-testid='setYellow'
        >
          Yellow
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
          className={
            editor.isActive('textStyle', { color: '#70CFF8' })
              ? 'is-active'
              : ''
          }
          data-testid='setBlue'
        >
          Blue
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#94FADB').run()}
          className={
            editor.isActive('textStyle', { color: '#94FADB' })
              ? 'is-active'
              : ''
          }
          data-testid='setTeal'
        >
          Teal
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
          className={
            editor.isActive('textStyle', { color: '#B9F18D' })
              ? 'is-active'
              : ''
          }
          data-testid='setGreen'
        >
          Green
        </button>
        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          data-testid='unsetColor'
        >
          Unset color
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={
            editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
          }
        >
          Justify
        </button>
        <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>
          Unset text align
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            console.log(previousUrl);
            const url = window.prompt('URL', previousUrl);

            // cancelled
            if (url === null) {
              return;
            }

            // empty
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();

              return;
            }

            // update link
            try {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
            } catch (e: any) {
              alert(e.message);
            }
          }}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          Set link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          Unset link
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => {
            if (hasFormat) {
              editor.chain().focus().clearNodes().unsetAllMarks().run();
            }
          }}
          className={hasFormat ? 'is-active' : ''}
        >
          Reset Format
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => {
            editor.chain().focus().increaseFontSize().run();
          }}
          className={editor.isActive('fontSize') ? 'is-active' : ''}
        >
          Increase Font Size
        </button>
        <button
          onClick={() => {
            editor.chain().focus().decreaseFontSize().run();
          }}
          className={editor.isActive('fontSize') ? 'is-active' : ''}
        >
          Decrease Font Size
        </button>
        <button
          onClick={() => {
            editor.chain().focus().unsetFontSize().run();
          }}
          className={editor.isActive('fontSize') ? 'is-active' : ''}
        >
          Decrease Font Size
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => {
            // editor.chain().focus().toggleList('orderedList', 'listItem').run();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          toggle OrderedList
        </button>
        <button
          onClick={() => {
            // editor.chain().focus().toggleList('orderedList', 'listItem').run();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          toggle BulletList
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          toggle Blockquote
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setBlockquote().run();
          }}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          set Blockquote
        </button>
        <button
          onClick={() => {
            editor.chain().focus().unsetBlockquote().run();
          }}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          unset Blockquote
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          toggle CodeBlock
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setCodeBlock().run();
          }}
          disabled={editor.isActive('codeBlock', 'javascript')}
          className={!editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          set CodeBlock
        </button>
      </div>

      <div className='button-group'>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Set horizontal rule
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
