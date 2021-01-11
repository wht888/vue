import axios from '../utils/baseAxios';

let baseUrl = '';
const { VUE_APP_API } = process.env;
baseUrl = VUE_APP_API;
// 获取菜单
// eslint-disable-next-line one-var
export const getMenuList = params => {
    return axios.get(`${baseUrl}/menu/get`, params);
  },
  // 获取列表
  getList = params => {
    return axios.get(`${baseUrl}/demo/get`, params);
  };
