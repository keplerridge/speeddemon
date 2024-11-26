import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import SignUp from "../views/SignUp.vue";
import NewActivity from "../views/NewActivity.vue";
import TestForSending from "../views/TestForSending.vue";
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
      path: "/TestForSending",
      name: "TestForSending",
      component: TestForSending,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
      path: "/about",
      name: "about",
    },
    {
      path: "/timer",
      name: "timer",
      component: () => import("../components/Timer.vue"),
    },
  ],
});

export default router;
