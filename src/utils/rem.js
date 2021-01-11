import store from '@/store/index';

const setRem = () => {
  const htmlWidth =
      document.documentElement.clientWidth || document.body.clientWidth,
    htmlDoms = document.getElementsByTagName('html'),
    [htmlDom] = htmlDoms,
    ratio = 19.2;
  htmlDom.style.fontSize = `${htmlWidth / ratio}px`;
};

// 初始化
window.onload = () => {
  setRem();
};

// 改变窗口大小时重新设置 rem
window.onresize = () => {
  setRem();
  const windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;
  store.commit('setWindowHeight', windowHeight);
  store.commit('setWindowWidth', windowWidth);
};
