import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/users'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

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
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next({ name: userStore.currentUser && userStore.currentUser.role === 'admin' ? 'admin-dashboard' : 'home' })
  } else if (to.meta.requiresAdmin && (!userStore.isAuthenticated || userStore.currentUser.role !== 'admin')) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.isAuthenticated && userStore.currentUser.role === 'admin') {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
  
  // Scroll to top on route change
  window.scrollTo(0, 0)
})

export default router 