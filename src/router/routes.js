import { useAuthStore } from 'stores/auth-store';

const isAuthenticated = () => {
  const authStore = useAuthStore()
  return authStore.isLoggedIn
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        }
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next('/');
          } else {
            next();
          }
        },
      },
      {
        path: '/profile',
        component: () => import('pages/ProfilePage.vue'),
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        }
      },
      {
        path: '/chat',
        component: () => import('pages/ChatPage.vue'),
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        }
      },
      {
        path: '/users',
        component: () => import('pages/UserPage.vue'),
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next();
          } else {
            next('/login');
          }
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
