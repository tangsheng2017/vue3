import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App); // 创建实例
import "vant/lib/index.css"; // 全局引入样式

app.use(store).use(router).mount("#app");
