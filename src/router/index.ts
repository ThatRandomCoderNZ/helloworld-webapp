import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LandingView from "@/views/LandingView.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LandingAlternativeView from "@/views/LandingAlternativeView.vue";
import DashboardAlternative from "@/views/DashboardAlternative.vue";
import AdminView from "@/views/AdminView.vue";
import ChatView from "@/views/ChatView.vue";
import AdminGrammarView from "@/views/AdminGrammarView.vue";
import GrammarMenuView from "@/views/GrammarMenuView.vue";
import GrammarToolView from "@/views/GrammarToolView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "home",
      component: DashboardAlternative,
    },
    {
      path: "/",
      name: "landing",
      component: LandingAlternativeView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
      props: true,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/admin/grammar",
      name: "admin-grammar",
      component: AdminGrammarView,
    },
    {
      path: "/grammar",
      name: "grammar",
      component: GrammarMenuView,
    },
    {
      path: "/grammar-tool",
      name: "grammar-tool",
      component: GrammarToolView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
  ],
});

export default router;
