import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App); // 创建实例
import * as common from "@/utils/common.js";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { getAuth } from "@/api/login.js";

app.config.globalProperties.$common = common;

app.config.globalProperties.$alertShow = function (msg, title, fun) {
  if (!msg) {
    alert("缺少参数msg");
    return;
  }
  this.$alert(msg, title || "温馨提示", {
    confirmButtonText: "确定",
    dangerouslyUseHTMLString: true,
    callback: (action) => {
      if (fun) {
        fun();
      }
    },
  });
};

app.config.globalProperties.$notifyMsg = function (title, msg, type) {
  this.$notify({
    title: title,
    message: msg,
    type: type || "success",
  });
};

router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  let userdata = common.checklocalStorage("userdata");
  // 是否404
  if (to.path.indexOf("noFout") > -1) {
    next();
  } else if (
    to.path.indexOf("login") == -1 &&
    to.path.indexOf("/homeMenu") == -1 &&
    to.path.indexOf("/knowPopup") == -1
  ) {
    //是否不是登陆页面
    if (userdata) {
      to.params.userdata = userdata;
      //判断是否有菜单数据
      if (!!store.state.routerData && to.path != "/autoToRouterFirstPage") {
        next();
      } else {
        getMenuData(userdata, to, from, next);
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }

  // next();
});

//获取菜单
async function getMenuData(userData, to, from, next) {
  let postObj = { userid: userData.userid, uuid: userData.uuid };
  const vdata = await getAuth(postObj);
  try {
    let currActPath = to.path;
    let funCode = to.meta.funCode;

    let defulUrl = ""; //默认路由（数组第一个）
    let defulTop = ""; //默认上标（数组第一个）
    let defulLeft = ""; //默认左标（数组第一个）

    //获取历史路由下标
    let topNavIndex = "",
      leftNavIndex = "";
    if (!!vdata && vdata.length > 0) {
      vdata.forEach((item, index) => {
        if (index == 0) {
          defulUrl = item.URI;
          defulTop = item.ID;
        }
        if (funCode == item.FuncCode) {
          topNavIndex = item.ID;
        }
        item.path = item.URI;
        item.name = item.FuncName;
        item.index = item.ID;
        item.child = item.items;
        delete item.URI;
        delete item.FuncName;
        delete item.items;
        if (!!item.child && item.child.length > 0) {
          item.child.forEach((child, childindex) => {
            if (index == 0 && childindex == 0) {
              defulUrl = child.URI;
              defulTop = child.PID;
              defulLeft = child.ID;
            }
            if (funCode == child.FuncCode) {
              topNavIndex = item.ID;
              leftNavIndex = child.ID;
            }
            child.path = child.URI;
            child.name = child.FuncName;
            child.index = child.ID;
            child.child = child.items;
            delete child.URI;
            delete child.FuncName;
            delete child.items;

            if (!!child.child && child.child.length > 0) {
              child.child.forEach((childTwo, childTwoIndex) => {
                if (index == 0 && childindex == 0 && childTwoIndex == 0) {
                  defulUrl = childTwo.URI;
                  defulTop = childTwo.PID;
                  defulLeft = childTwo.ID;
                }
                if (funCode == childTwo.FuncCode) {
                  topNavIndex = item.ID;
                  leftNavIndex = childTwo.ID;
                }
                childTwo.path = childTwo.URI;
                childTwo.name = childTwo.FuncName;
                childTwo.index = childTwo.ID;
                childTwo.child = childTwo.items;
                delete childTwo.URI;
                delete childTwo.FuncName;
                delete childTwo.items;
              });
            }
          });
        }
      });
      //登陆成功默认进入路由第一个页面
      if (currActPath == "/autoToRouterFirstPage") {
        currActPath = defulUrl;
        topNavIndex = defulTop;
        leftNavIndex = defulLeft;
      }

      store.commit("setDataByName", { key: "topNavIndex", val: topNavIndex });
      store.commit("setDataByName", { key: "leftNavIndex", val: leftNavIndex });
      //缓存路由数据

      store.commit("setDataByName", { key: "routerData", val: vdata });
      next(currActPath);
    } else {
      this.$alertShow("您暂无任何功能权限，请联系管理员", "温馨提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          next("/login");
        },
      });
    }
  } catch (error) {
    common.removelocalStorage("userdata");
  }
}

app.use(ElementPlus);
app.use(store).use(router).mount("#app");
