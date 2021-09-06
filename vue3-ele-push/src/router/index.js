import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/views/login"),
  },
  //首页
  {
    path: "/index",
    component: () => import("@/views/index"),
    children: [
      {
        path: "home/index",
        component: () => import("@/views/home/index"),
        meta: { title: "优救援", des: "首页", funCode: "m1" },
      },
    ],
  },
  // 基础数据
  {
    path: "/index",
    component: () => import("../views/index"),
    children: [
      {
        path: "basicData/pointData",
        component: () => import("../views/basicData/pointData"),
        meta: { title: "优救援", des: "驻点管理", funCode: "m6-2" },
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/login" }, //重定向
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
