import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '../stores/store';
import Dashboard from "../views/Dashboard.vue";
import LoginView from "../views/LoginView.vue";
import Logout from "../views/Logout.vue";
import SignUp from "../views/SignUp.vue";
import NewActivity from "../views/NewActivity.vue";
import TestForSending from "../views/TestForSending.vue";
import NotFound from "../views/NotFound.vue";
import RegisterUser from "../components/RegisterUser.vue";
import Login from "../components/Login.vue";
import ActivityDetails from "../views/ActivityDetails.vue";

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
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true},
    },
    {
      path: "/new-activity",
      name: "new-activity",
      component: NewActivity,
      meta: { requiresAuth: true},
    },
    {
      path: "/activity-details/:id",
      name: "activity-details",
      component: ActivityDetails,
      props: true,
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
    },
    {
      path: "/timer",
      name: "timer",
      component: () => import('../components/Timer.vue'), // Dynamic import
      meta: { requiresAuth: true},
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUser,
    },
    {
      path: "/",
      name: "login",
      component: Login,
    },
  ],
});

// Add a global before guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  // If the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is logged in using the getter from the Pinia store
    if (!userStore.isUserLoggedIn) {
      // If not, redirect to the login page
      return next('/');
    }
  }

  // Proceed to the requested route if the check passes
  next();
});

export default router;
