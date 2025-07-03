/**
 * 模拟文件上传
 *
 * @param file
 */
function uploadFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      // 返回 base64 字符串（含 data:image/... 前缀）
      resolve(e.target?.result as string);
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsText(file, 'utf-8');
  });
}

export default uploadFile;
