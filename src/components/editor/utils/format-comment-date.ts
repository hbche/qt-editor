import {
  formatDistanceToNow,
  format,
  FormatDistanceToken,
  FormatDistanceFnOptions,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 自定义中文语言包
const customZhCN = {
  ...zhCN,
  formatDistance: (
    token: string,
    count: number,
    options: FormatDistanceFnOptions
  ) => {
    if (token === 'lessThanXMinutes' && count === 1) {
      return '刚刚';
    }
    return zhCN.formatDistance(token as FormatDistanceToken, count, options);
  },
};

/**根据时间戳计算评论时间 */
export function formatCommentDate(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp;

  // 如果时间差小于24小时，显示相对时间
  if (diff < 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(timestamp, {
      addSuffix: true,
      locale: zhCN,
    });
  }

  // 如果时间差大于24小时，显示具体日期和时间
  return format(timestamp, 'yyyy年MM月dd日 HH:mm', { locale: customZhCN });
}
