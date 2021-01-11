import { Message } from 'element-ui';
import * as _ from 'lodash';

const throttleTime = 1000;
// 处理接口调用成功
// eslint-disable-next-line one-var
export const resMessage = _.throttle(
  (res, msg) => {
    if (res.data.success) {
      Message({
        message: msg,
        type: 'success'
      });
    } else {
      Message({
        message: res.data.msg,
        type: 'error'
      });
    }
    return res.data.success;
  },
  throttleTime,
  { leading: true, trailing: false }
),
downBlob = (data, fileName) => {
  const blob = new Blob([data]),
    // 获取heads中的filename文件名
    downloadElement = document.createElement('a'),
    // 创建下载的链接
    href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  // 下载后文件名
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  // 点击下载
  downloadElement.click();
  // 下载完成移除元素
  document.body.removeChild(downloadElement);
  // 释放掉blob对象
  window.URL.revokeObjectURL(href);
};
