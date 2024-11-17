import { createRouter, createWebHistory } from "vue-router";

import MainContent from "../../pages/MainContent.vue";
import AdminLogin from "../../pages/AdminLogin.vue";
// import Login from "../../pages/Login.vue";
import AdminDashboard from "../../pages/AdminDashboard.vue";
const routes = [
  {
    path: "",
    name: "MainContent",
    component: MainContent,
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuthenticated) {
        next(); // User is authenticated, proceed to the route
      } else {
        alert('You are not authorized to access this area.');
        next('/admin'); // Redirect to login if not authenticated
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//scroll to top after every route change
// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0);
//   next();
// });


export default router;
