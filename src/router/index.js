import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import("@/layouts/DashboardLayout.vue"),
      children:[
        {
          path: '',
          name:'Dashboard',
          component: () => import("@/views/HomeView.vue")
        },
        {
          path: 'about',
          name:'About',
          component: () => import("@/views/AboutView.vue")
        }
      ]
    }
   

  ],
})

export default router
