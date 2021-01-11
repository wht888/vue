import axios from 'axios';
import router from '../router';
import store from '../store';
import { Message } from 'element-ui';

const status = {
  TwoHundred: 200,
  FourHundredAndOne: 401,
  FourHundredAndFour: 404,
  FiveHundred: 500
};

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前给请求headers增加token
    if (!(config.headers.Interceptor === false)) {
      const { token } = store.getters;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.status === status.TwoHundred) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case status.FourHundredAndOne: {
          if (store.isRefreshExpires) {
            router.push('/login');
          } else {
            store.isRefreshExpires = true;
            store.dispatch('refreshToken');
          }
          break;
        }
        case status.FourHundredAndFour: {
          Message({ message: '网络请求不存在', type: 'error' });
          break;
        }
        case status.FiveHundred: {
          Message({ message: '服务器连接超时', type: 'error' });
          break;
        }
        default:
          Message({ message: error.response.data.msg, type: 'error' });
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

export default axios;
