import Paragraph from '@tiptap/extension-paragraph';

const CustomParagraph = Paragraph.extend({
  addNodeView: () => {
    return () => {
      const container = document.createElement('div');
      container.addEventListener('paste', (event) => {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          console.log(item);
          // 只处理 file 类型的数据
          if (item.kind === 'file') {
            const file = item.getAsFile();
            // 检查 MIME 类型是否为图片
            if (file && file.type.indexOf('image') !== -1) {
              console.log(file);
              // 创建一个图片 URL
              const imageURL = URL.createObjectURL(file);
              // 创建 img 元素，并设置 src 属性
              const img = document.createElement('img');
              console.log(imageURL);
              img.src = imageURL;
              // 可根据需要设置样式，比如宽高
              img.style.maxWidth = '100%';
              // 将 img 插入到页面中，例如添加到 body 中
              content.appendChild(img);
            }
          }
        }
      });
      const content = document.createElement('div');
      container.append(content);
      return {
        dom: container,
        contentDOM: content,
      };
    };
  },
});

export default CustomParagraph;
