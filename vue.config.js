// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
  },
  isDev = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // 发布时关闭警告
    performance: {
      hints: false
    }
  },
  // webpack配置 see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack(config) {
    config.plugins.delete('prefetch').delete('preload');

    // https://webpack.js.org/configuration/devtool/#development
    config.when(isDev, configTwo => configTwo.devtool('cheap-source-map'));

    config.when(!isDev, configTwo => {
      configTwo.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/u,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/u
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    });
  }
};
