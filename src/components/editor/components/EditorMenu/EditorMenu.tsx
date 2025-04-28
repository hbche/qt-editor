import { Editor } from '@tiptap/react';
import classNames from 'classnames';
import './EditorMenu.scss';
import { FontSizeBar } from './FontSizeBar/FontSizeBar';

interface EditorMenuProps {
  editor: Editor;
}

export const EditorMenu = ({ editor }: EditorMenuProps) => {
  const className = 'editor-menu';

  return (
    <div className={className}>
      <ul>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('heading', { level: 1 }),
            })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='H1Outlined'
            >
              <path
                d='M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm15.604 9.91a.4.4 0 0 1-.585-.355c0-.533 0-.774.004-1.582a.4.4 0 0 1 .203-.347l2.769-1.568A.39.39 0 0 1 20.197 9h1.404c.234 0 .423.21.423.468V19.95c0 .593-.483 1.073-1.075 1.073a1.07 1.07 0 0 1-1.07-1.073v-8.228l-2.275 1.19Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('heading', { level: 2 }),
            })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='H2Outlined'
            >
              <path
                d='M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm20.993 16.872c0-.561-.455-1.015-1.017-1.015h-3.121l3.407-4.272a3.35 3.35 0 0 0 .731-2.126c-.01-.992-.347-1.816-1.005-2.464-.647-.651-1.492-.984-2.523-.995-.931.011-1.72.34-2.356.982-.37.386-.941 1.044-.941 1.602 0 .591.48 1.07 1.07 1.07.563 0 .769-.347.993-.726.06-.101.12-.204.19-.304a1.36 1.36 0 0 1 .186-.214c.262-.252.584-.376.982-.376.447.01.784.15 1.02.423.234.28.35.606.35.987 0 .146-.019.303-.057.471-.05.152-.156.341-.315.548l-4.402 5.506a.4.4 0 0 0-.087.25v1.022c0 .221.267.65.606.65h5.272c.562 0 1.017-.457 1.017-1.019Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('heading', { level: 3 }),
            })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='H3Outlined'
            >
              <path
                d='M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm21 14.296c0-.51-.108-.998-.324-1.461a2.923 2.923 0 0 0-.877-1.044c.377-.297.65-.63.816-1.001.17-.44.252-.886.252-1.348a3.48 3.48 0 0 0-.943-2.385C21.274 9.363 20.398 9.01 19.31 9a3.179 3.179 0 0 0-2.251.932c-.349.336-.848.879-.848 1.384a1 1 0 0 0 1 1c.482 0 .767-.352 1.043-.692l.09-.11c.057-.07.121-.132.192-.185.256-.2.53-.296.834-.296.431.01.779.144 1.049.405.267.267.406.61.415 1.04 0 .417-.133.75-.4 1.008-.335.335-.766.387-1.212.387a.958.958 0 1 0 0 1.917h.088c.452-.002.824-.003 1.205.353.29.277.442.674.452 1.201-.01.51-.16.894-.451 1.162-.296.296-.65.44-1.076.44-.4 0-.712-.107-.944-.316l-.008-.008a8.055 8.055 0 0 1-.213-.207c-.1-.099-.178-.207-.254-.31-.193-.264-.366-.5-.81-.5a1 1 0 0 0-1 1c0 .574.543 1.19.954 1.533.635.53 1.35.84 2.174.84 1.057-.01 1.93-.35 2.609-1.018.69-.651 1.04-1.545 1.052-2.664Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('heading', { level: 4 }),
            })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='H4Outlined'
            >
              <path
                d='M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm19.681 7.19c0-.658-.486-1.19-1.143-1.19-.402 0-.824.204-1.043.542l-4.428 6.821a.266.266 0 0 0-.043.145v1.62c0 .22.18.4.4.4h4.404v1.363c0 .512.43.927.941.927a.914.914 0 0 0 .912-.927v-1.363h.4a.954.954 0 0 0 .943-.956.934.934 0 0 0-.944-.932h-.399v-6.45Zm-4.53 6.45 2.677-4.177v4.177H17.15Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('heading', { level: 5 }),
            })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='H5Outlined'
            >
              <path
                d='M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm17.758 9.728a2.98 2.98 0 0 0-1.252.258c-.264.108-.509.26-.735.457l.21-2.395h3.422c.566 0 1.024-.475 1.024-1.04A1.01 1.01 0 0 0 21.403 9h-4.666a.4.4 0 0 0-.398.366l-.5 5.867a.4.4 0 0 0 .398.434l1.228.002c.116 0 .22-.069.278-.17.16-.275.36-.479.61-.622.258-.154.582-.23.975-.23.57 0 .986.19 1.262.574.301.403.46.973.46 1.69 0 .648-.18 1.163-.526 1.547a1.698 1.698 0 0 1-1.29.558c-.468 0-.841-.123-1.105-.351-.176-.154-.34-.508-.444-.858l-.004.001a.973.973 0 1 0-1.829.653c.218.65.557 1.251.992 1.64.657.595 1.458.899 2.377.899 1.004 0 1.874-.355 2.61-1.064.796-.795 1.19-1.807 1.19-3.04 0-1.266-.303-2.29-.903-3.037-.601-.75-1.397-1.131-2.36-1.131Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('heading', { level: 6 }),
            })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='H6Outlined'
            >
              <path
                d='M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm17.47 6.843c1.379 0 2.463.659 2.995 1.64l.001.003c.116.214.219.404.219.638 0 .506-.41.915-.915.915-.477 0-.69-.327-.909-.662a3.585 3.585 0 0 0-.212-.304c-.262-.33-.675-.527-1.18-.527-.586 0-1.055.348-1.402.977-.312.527-.483 1.181-.518 1.975.234-.28.509-.498.825-.657.39-.21.84-.309 1.364-.309.989 0 1.784.34 2.378 1.027.594.685.887 1.568.887 2.627 0 1.081-.344 1.986-1.027 2.691a3.391 3.391 0 0 1-2.52 1.064c-1.23 0-2.183-.487-2.834-1.448-.637-.925-.946-2.187-.946-3.812 0-1.732.332-3.125 1.008-4.195.675-1.09 1.612-1.643 2.785-1.643Zm-.068 5.426c-.55 0-.958.171-1.249.523-.298.335-.45.82-.45 1.452 0 .607.16 1.081.475 1.42.318.342.719.511 1.224.511.515 0 .915-.18 1.233-.55.32-.37.48-.847.48-1.44 0-.582-.155-1.048-.45-1.393-.315-.352-.727-.523-1.263-.523Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('paragraph'),
            })}
            onClick={() => editor.commands.setParagraph()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='ParagraphOutlined'
            >
              <text
                x='12'
                y='14'
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize='26'
                fontFamily='Arial, sans-serif'
                fill='currentColor'
              >
                P
              </text>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('bold'),
            })}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='BoldOutlined'
            >
              <path
                d='M5 2.709C5 2.317 5.317 2 5.709 2h6.734a5.317 5.317 0 0 1 3.686 9.148 5.671 5.671 0 0 1-2.623 10.7H5.71a.709.709 0 0 1-.71-.707V2.71Zm2 7.798h5.443a3.19 3.19 0 0 0 3.19-3.19c0-1.762-1.428-3.317-3.19-3.317H7v6.507Zm0 2.126v7.09h6.507a3.544 3.544 0 0 0 0-7.09H7Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('italic'),
            })}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='ItalicOutlined'
            >
              <path
                d='M14.825 5.077 11.19 18.923h4.052a1.038 1.038 0 1 1 0 2.077H4.954a1.038 1.038 0 1 1 0-2.077h4.053l3.636-13.846H8.591A1.038 1.038 0 1 1 8.59 3h10.287a1.038 1.038 0 0 1 0 2.077h-4.053Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('underline'),
            })}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='UnderlineOutlined'
            >
              <path
                d='M7.361 3.052a.99.99 0 0 0-.989-.994.998.998 0 0 0-.999.994v5.765c0 4.205 2.601 7.29 6.627 7.29s6.627-3.085 6.627-7.29V3.052a.996.996 0 0 0-.996-.994.992.992 0 0 0-.992.994v5.765c0 3.003-1.763 5.302-4.639 5.302-2.876 0-4.639-2.299-4.639-5.302V3.052ZM3.054 19.42a.988.988 0 0 0-.994.988 1 1 0 0 0 .994 1h17.892a1 1 0 0 0 .994-1.002.987.987 0 0 0-.994-.986H3.054Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('blockquote'),
            })}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='ReferenceOutlined'
            >
              <path
                d='M6.865 21C4.275 21 2 18.88 2 15.037c0-4.5 3.143-9.725 6.518-12.422a.888.888 0 0 1 1.203.107c.398.424.32 1.11-.112 1.5-2.412 2.17-5.32 6.855-5.153 9.055.215-.113 1.277-.516 2.801-.516 2.197 0 3.845 1.726 3.845 4.002A4.22 4.22 0 0 1 6.865 21Zm10.898 0c-2.59 0-4.865-2.119-4.865-5.963 0-4.5 3.143-9.725 6.518-12.422a.888.888 0 0 1 1.203.107c.398.424.32 1.11-.112 1.5-2.412 2.17-5.32 6.855-5.153 9.055.215-.113 1.277-.516 2.801-.516 2.197 0 3.845 1.726 3.845 4.002A4.22 4.22 0 0 1 17.763 21Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('strike'),
            })}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='HorizontalLineOutlined'
            >
              <path
                d='M5.49 7.226A5.107 5.107 0 0 1 6.9 3.831C8.017 2.636 9.718 2 11.819 2c2.142 0 3.779.57 4.867 1.689.4.392.869.958 1.26 1.595.443.723-.191 1.53-1.04 1.53-.606 0-1.039-.447-1.326-.981a2.864 2.864 0 0 0-.362-.517c-.735-.93-1.909-1.419-3.386-1.419-2.404 0-4.154 1.395-4.2 3.393-.02.846.337 1.58.995 2.043h-2.75c-.271-.621-.403-1.332-.385-2.107Zm8.906 6.024H4.038c-.518 0-.938-.38-.938-.897 0-.518.42-.978.938-.978h16.125c.518 0 .937.437.937.954 0 .518-.42.921-.937.921h-2.455c.542.806.96 1.954.934 3.055C18.563 19.82 15.87 22 11.572 22c-2.875 0-5.028-.964-6.13-2.745a6.884 6.884 0 0 1-.545-1.191c-.261-.72.318-1.432 1.084-1.432.574 0 1.034.416 1.24.952.17.445.4.794.733 1.142.805.858 2.104 1.305 3.766 1.305 2.845 0 4.696-1.39 4.747-3.61.024-1.072-.256-1.61-.897-2.42-.473-.598-1.174-.751-1.174-.751Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive({ textAlign: 'left' }),
            })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='LeftAlignmentOutlined'
            >
              <path
                d='M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 16a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm1-9a1 1 0 1 0 0 2h9a1 1 0 1 0 0-2H3Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive({ textAlign: 'center' }),
            })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='CenterAlignmentOutlined'
            >
              <path
                d='M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 16a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm6-9a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive({ textAlign: 'right' }),
            })}
            onClick={() => editor.commands.setTextAlign('right')}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='RightAlignmentOutlined'
            >
              <path
                d='M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 16a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm10-9a1 1 0 1 0 0 2h9a1 1 0 1 0 0-2h-9Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('orderedList'),
            })}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='OrderListOutlined'
            >
              <path
                d='M4.577 1.809a.543.543 0 0 0-.819-.469l-.502.296-.004.003-.309.187c-.342.207-.858.519-1.142.701a.573.573 0 0 0-.261.485c0 .482.544.774.948.522.227-.141.465-.287.642-.395v3.478a.723.723 0 1 0 1.447 0V1.81Zm-.899 7.128c-1.233 0-2.056.817-2.056 1.84a.25.25 0 0 0 .25.251h.891a.259.259 0 0 0 .26-.259c0-.32.227-.589.608-.589a.62.62 0 0 1 .428.15.52.52 0 0 1 .16.396c0 .315-.188.579-.538.949l-1.815 1.968a.672.672 0 0 0 .494 1.127h3.003a.63.63 0 0 0 0-1.26H3.744l.933-1.047c.61-.652.99-1.127.99-1.834a1.57 1.57 0 0 0-.563-1.226c-.356-.3-.852-.466-1.426-.466Zm.015 7.429c-1.006 0-1.692.478-1.946 1.178a.541.541 0 0 0 .107.553c.122.137.307.22.503.22a.773.773 0 0 0 .478-.18c.125-.098.23-.222.312-.33.096-.124.257-.224.511-.224.21 0 .37.063.472.152a.46.46 0 0 1 .16.359v.002a.503.503 0 0 1-.165.391.71.71 0 0 1-.483.16h-.14a.606.606 0 1 0 0 1.213h.168c.275 0 .468.074.59.178a.538.538 0 0 1 .186.42.554.554 0 0 1-.185.435c-.122.107-.314.184-.583.184-.32 0-.528-.114-.644-.264a1.776 1.776 0 0 0-.308-.323.766.766 0 0 0-.47-.174.678.678 0 0 0-.504.22.549.549 0 0 0-.114.55c.244.717.926 1.22 2.012 1.22.602 0 1.161-.168 1.575-.478.416-.311.683-.768.676-1.323-.01-.69-.376-1.122-.793-1.332.34-.231.63-.644.621-1.224-.019-.962-.92-1.583-2.036-1.583ZM8 4a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 8a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 8a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('bulletList'),
            })}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='DisorderListOutlined'
            >
              <path
                d='M3.5 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9 3a1 1 0 0 0 0 2h13a1 1 0 1 0 0-2H9Zm0 8a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H9Zm-1 9a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm-3-8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('taskList'),
            })}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='TodoOutlined'
            >
              <path
                d='M17.207 10.207a1 1 0 0 0-1.414-1.414L11 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l5.5-5.5Z'
                fill='currentColor'
              ></path>
              <path
                d='M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2 0v16h16V4H4Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('link'),
            })}
            onClick={() => {
              const isLink = editor.isActive('link');
              if (isLink) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .unsetLink()
                  .run();
              } else {
                const previousUrl = editor.getAttributes('link').href;
                const url = window.prompt('URL', previousUrl);
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: url || '' })
                  .run();
              }
            }}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='GlobalLinkOutlined'
            >
              <path
                d='M18.849 2.699a5.037 5.037 0 0 0-7.1.97L8.97 7.372a4.784 4.784 0 0 0 .957 6.699l.972.729a1 1 0 0 0 1.2-1.6l-.972-.73a2.784 2.784 0 0 1-.557-3.898l2.777-3.703a3.037 3.037 0 1 1 4.8 3.72l-1.429 1.786a1 1 0 1 0 1.562 1.25l1.43-1.788a5.037 5.037 0 0 0-.862-7.138Z'
                fill='currentColor'
              ></path>
              <path
                d='M5.152 21.301a5.037 5.037 0 0 0 7.1-.97l2.777-3.703a4.784 4.784 0 0 0-.957-6.699L13.1 9.2a1 1 0 0 0-1.2 1.6l.973.73a2.784 2.784 0 0 1 .556 3.898l-2.777 3.703a3.037 3.037 0 1 1-4.8-3.72l1.429-1.786a1 1 0 0 0-1.562-1.25l-1.43 1.787a5.037 5.037 0 0 0 .863 7.14Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('codeBlock'),
            })}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='CodeOutlined'
            >
              <path
                d='M13.31 1.082a1 1 0 0 0-1.115.87L9.758 21.805a1 1 0 0 0 1.985.243l2.437-19.85a1 1 0 0 0-.87-1.115ZM8.207 5.293a1 1 0 0 1 0 1.414L2.414 12.5l5.793 5.793a1 1 0 1 1-1.414 1.414l-6.5-6.5a1 1 0 0 1 0-1.414l6.5-6.5a1 1 0 0 1 1.414 0Zm7.586 0a1 1 0 0 0 0 1.414l5.793 5.793-5.793 5.793a1 1 0 0 0 1.414 1.414l6.5-6.5a1 1 0 0 0 0-1.414l-6.5-6.5a1 1 0 0 0-1.414 0Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <FontSizeBar editor={editor} />
        </li>
        <li>
          <button
            className={classNames(`${className}-btn`, {
              active: editor.isActive('table'),
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.65 3H4.35C3.60441 3 3 3.60441 3 4.35V19.65C3 20.3956 3.60441 21 4.35 21H19.65C20.3956 21 21 20.3956 21 19.65V4.35C21 3.60441 20.3956 3 19.65 3Z'
                stroke='#333'
                stroke-width='2'
              />
              <path
                d='M9 3V21'
                stroke='#333'
                stroke-width='2'
                stroke-linecap='round'
              />
              <path
                d='M15 3V21'
                stroke='#333'
                stroke-width='2'
                stroke-linecap='round'
              />
              <path
                d='M3 9H21'
                stroke='#333'
                stroke-width='2'
                stroke-linecap='round'
              />
              <path
                d='M3 15H21'
                stroke='#333'
                stroke-width='2'
                stroke-linecap='round'
              />
            </svg>
          </button>
        </li>
        <li className={`${className}-seperator`} />
        <li>
          <button className={`${className}-btn`}>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-icon='AddCommentOutlined'
            >
              <path
                d='M7 11a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z'
                fill='currentColor'
              ></path>
              <path
                d='M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2h-3.812a.5.5 0 0 0-.33.124l-2.541 2.224a2 2 0 0 1-2.634 0l-2.542-2.224a.5.5 0 0 0-.329-.124H4a2 2 0 0 1-2-2V5Zm2 0v11.5h3.812a2.5 2.5 0 0 1 1.646.619L12 19.343l2.542-2.224a2.5 2.5 0 0 1 1.646-.619H20V5H4Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default EditorMenu;
