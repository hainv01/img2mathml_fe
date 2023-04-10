import { createRouter, createWebHistory } from "vue-router";
import Convert from "@/components/Convert.vue";
import Snip from "@/components/Snip.vue";
import Register from "@/components/Register.vue";
import Main from '@/layouts/Nav.vue'
import Login from "@/components/Login.vue";
import Detail from "@/components/Detail.vue";

const routes = [
  {
    name: "",
    path: "/",
    component: Convert,
  },
  {
    name: "snip",
    path: "/snip",
    component: Snip,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "detail",
    path: "/detail",
    component: Detail,
  },
  // {
  //   name: "profile",
  //   path: "/profile",
  //   component: ProfileViewVue,
  // },
  // {
  //   name: "main",
  //   path: "/main",
  //   component: Main,
  // },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
