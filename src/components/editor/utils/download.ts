/**
 * markdown文件下载
 *
 * @param markdown
 * @param title
 */
function download(markdown: string, title: string) {
  const a = document.createElement('a');
  a.href = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(markdown);
  a.download = title;
  a.click();
}

export default download;
