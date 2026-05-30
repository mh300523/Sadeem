import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/DashboardLayout.vue"),
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "idea/:id",
          name: "IdeaDetails",
          component: () => import("@/views/IdeaDetailView.vue"),
        },
      ],
    },
  ],
});

export default router;
