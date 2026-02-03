import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/Upload.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/upload-success',
    name: 'UploadSuccess',
    component: () => import('../views/UploadSuccess.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/uploading',
    name: 'Uploading',
    component: () => import('../views/Uploading.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/processing',
    name: 'Processing',
    component: () => import('../views/Processing.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import('../views/Complete.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/destroying',
    name: 'Destroying',
    component: () => import('../views/Destroying.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/final',
    name: 'Final',
    component: () => import('../views/Final.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/quote',
    name: 'Quote',
    component: () => import('../views/Quote.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chart1',
    name: 'Chart1',
    component: () => import('../views/Chart1.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chart2',
    name: 'Chart2',
    component: () => import('../views/Chart2.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/index')
  } else {
    next()
  }
})

export default router
