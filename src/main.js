import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App); // 创建实例
import { Toast } from "vant";
import { common } from "@/utils/common.js";

import "vant/lib/index.css"; // 全局引入样式

app.use(Toast);
app.config.globalProperties.$common = common;
Toast.setDefaultOptions({ duration: 0 }); //设置全局默认Toast时长，展示时长(ms)，值为 0 时，toast 不会消失

app.use(store).use(router).mount("#app");
