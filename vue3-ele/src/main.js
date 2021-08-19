import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App); // 创建实例
import * as common from "@/utils/common.js";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

app.config.globalProperties.$common = common;

app.use(ElementPlus);
app.use(store).use(router).mount("#app");
