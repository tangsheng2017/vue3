import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse_menu: false, //导航栏是否折叠
    configInfo: {
      ptmccolor: "#0D0D0D",
      pagefontcolor: "#FFFFFF",
      titlebgcolor: "#011A17",
      titlefontcolor: "#FFFFFF",
      menubgcolor: "#011a17",
      menufontcolor: "#FFFFFF",
      menuselectbgcolor: "#169a76",
      menuselectfontcolor: "#FFFFFF",
      glcolor: "#169a76",
      buttonfontcolor: "#FFFFFF",
    }, //页面配置
    routerData: null,
    topNavIndex: null,
    leftNavIndex: null,
  },
  mutations: {
    setDataByName(state, payload) {
      if (payload.index) {
        state[payload.key][payload.index] = payload.val;
      } else {
        state[payload.key] = payload.val;
      }
    },
  },
  actions: {},
  modules: {},
});
