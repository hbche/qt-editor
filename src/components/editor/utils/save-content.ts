/**
 * 保存编辑器内容到本地存储
 * @param content HTML内容
 */
export function saveToLocalStorage(content: string) {
  try {
    localStorage.setItem('qt-editor-content', content);
    localStorage.setItem('qt-editor-saved-time', new Date().toISOString());
    return true;
  } catch (error) {
    console.error('保存到本地存储失败:', error);
    return false;
  }
}

/**
 * 从本地存储获取保存的内容
 * @returns 保存的内容
 */
export function loadFromLocalStorage(): string | null {
  try {
    return localStorage.getItem('qt-editor-content');
  } catch (error) {
    console.error('从本地存储读取失败:', error);
    return null;
  }
}

/**
 * 获取最后保存时间
 * @returns 最后保存时间
 */
export function getLastSavedTime(): string | null {
  try {
    return localStorage.getItem('qt-editor-saved-time');
  } catch (error) {
    console.error('获取保存时间失败:', error);
    return null;
  }
}

/**
 * 清除本地存储的内容
 */
export function clearLocalStorage() {
  try {
    localStorage.removeItem('qt-editor-content');
    localStorage.removeItem('qt-editor-saved-time');
    return true;
  } catch (error) {
    console.error('清除本地存储失败:', error);
    return false;
  }
}
