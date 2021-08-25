import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App); // 创建实例
import * as common from "@/utils/common.js";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

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

  next();
});

app.use(ElementPlus);
app.use(store).use(router).mount("#app");
