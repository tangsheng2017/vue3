import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/index",
    name: "index",
    meta: { title: "登录" },
    component: () => import("@/views/index"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/index" }, //重定向
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
