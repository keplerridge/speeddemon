import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      // component: HomeView
    },
    {
      path: "/login",
      name: "login",
      // component: HomeView
    },
    {
      path: "/sign-up",
      name: "sign-up",
      // component: HomeView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/new-route",
      name: "new-route",
      // component: HomeView
    },
  ],
});

export default router;
