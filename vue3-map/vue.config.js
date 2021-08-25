const pageConfig = require("./src/utils/config");
const target = pageConfig.isTest
  ? pageConfig.proxyTargetTest
  : pageConfig.proxyTarget;
module.exports = {
  // 基本路径   整个文件夹在哪
  publicPath: "./",
  // 输出文件目录   文件夹名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
  assetsDir: "./static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径    index的路径和名字
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
