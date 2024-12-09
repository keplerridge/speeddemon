import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import LoginView from "../views/LoginView.vue";
import Logout from "../views/Logout.vue";
import SignUp from "../views/SignUp.vue";
import NewActivity from "../views/NewActivity.vue";
import TestForSending from "../views/TestForSending.vue";
import NotFound from "../views/NotFound.vue";
import RegisterUser from "../components/RegisterUser.vue";
import Login from '../components/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/loginview",
      name: "login",
      component: LoginView,
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
    {
      path: "/register",
      name: "register",
      component: RegisterUser
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ],
});

export default router;
