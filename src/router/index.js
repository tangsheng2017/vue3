import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/views/demo"),
  },
  {
    path: "/advisoryList",
    name: "advisoryList",
    component: () => import("@/views/advisory/advisoryList"),
  },
  {
    path: "/advisoryDetails",
    name: "advisoryDetails",
    component: () => import("@/views/advisory/advisoryDetails"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
