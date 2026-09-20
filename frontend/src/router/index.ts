import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/properties',
      name: 'properties',
      component: () => import('@/views/PropertiesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/property/:id',
      name: 'property-detail',
      component: () => import('@/views/PropertyDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/devices',
      name: 'devices',
      component: () => import('@/views/DevicesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/scenes',
      name: 'scenes',
      component: () => import('@/views/ScenesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/automations',
      name: 'automations',
      component: () => import('@/views/AutomationsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/security',
      name: 'security',
      component: () => import('@/views/SecurityView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/emergency',
      name: 'emergency',
      component: () => import('@/views/EmergencyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/energy',
      name: 'energy',
      component: () => import('@/views/EnergyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/views/NotificationsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
