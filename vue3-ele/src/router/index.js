import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
