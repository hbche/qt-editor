import BulletList from '@tiptap/extension-bullet-list';

const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-q': () => this.editor.commands.toggleBulletList(),
    };
  },
});

export default CustomBulletList;
