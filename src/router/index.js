import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import SignUp from "../views/SignUp.vue";
import NewActivity from "../views/NewActivity.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/new-activity",
      name: "new-activity",
      component: NewActivity,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import('../components/Timer.vue')
    }
  ]
});

export default router;
