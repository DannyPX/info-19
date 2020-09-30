import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue")
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("../views/Map.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
