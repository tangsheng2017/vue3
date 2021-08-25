import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App); // 创建实例
import { Toast, Dialog, Button } from "vant";
import * as common from "@/utils/common.js";

import "vant/lib/index.css"; // 全局引入样式

app.use(Toast).use(Button);
app.config.globalProperties.$common = common;
Toast.setDefaultOptions({ duration: 0 }); //设置全局默认Toast时长，展示时长(ms)，值为 0 时，toast 不会消失

app.config.globalProperties.$alertShow = (msg, fun, title) => {
  var tips = "";
  if (!title) {
    tips = "温馨提示";
  } else {
    tips = title;
  }
  Dialog.alert({
    title: tips,
    message: msg,
  }).then(() => {
    if (fun) {
      fun();
    }
  });
};

app.use(store).use(router).mount("#app");
