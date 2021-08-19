const pageConfig = require("./src/utils/config");
const target = pageConfig.isTest
  ? pageConfig.proxyTargetTest
  : pageConfig.proxyTarget;
module.exports = {
  configureWebpack: {
    externals: {
      AMap: "AMap", //高德地图配置
    },
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      "/api": {
        target: target,
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
