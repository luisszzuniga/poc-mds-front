import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/users'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/activity/:id',
      name: 'activity-detail',
      component: () => import('../views/ActivityDetailView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
  
  // Scroll to top on route change
  window.scrollTo(0, 0)
})

export default router 