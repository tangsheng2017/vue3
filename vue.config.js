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
        target: "https://dev.u-road.com/Urescue/project/public/index.php/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
