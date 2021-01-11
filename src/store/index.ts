import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 显示器屏幕高
    windowHeight: window.innerHeight,
    // 显示器屏幕宽
    windowWidth: window.innerWidth,
    // token
    token: window.localStorage.getItem('token'),
    // 菜单列表
    menuList: [],
    // 权限列表
    permissions: [],
    // 通用搜索
    searchParams: {},
    // 通用列表分页
    pagination: { pageIndex: 1, pageSize: 10 },
    // 列表选中的复选框
    tableSelectionIndex: []
  },
  mutations: {
    setToken(state, payload) {
      window.localStorage.setItem('token', payload);
      state.token = payload;
    },
    setMenuList(state, payload) {
      state.menuList = payload;
    },
    setSearchParams(state, payload) {
      state.searchParams = payload;
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
    setTableSelection(state, payload) {
      state.tableSelectionIndex = payload;
    },
    setWindowHeight(state, payload) {
      state.windowHeight = payload;
    },
    setWindowWidth(state, payload) {
      state.windowWidth = payload;
    }
  },
  actions: {},
  modules: {}
});
