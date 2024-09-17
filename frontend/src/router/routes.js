
const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('pages/HomePage.vue')
      },
      {
        name: 'TravelBooksIndex',
        path: 'travel-books',
        component: () => import('pages/travel-books/Index.vue'),
      },
      {
        name: 'TravelBooksEdit',
        path: 'travel-books/:id/edit',
        component: () => import('pages/travel-books/EditIndex.vue'),
      },
      {
        name: 'CustomersIndex',
        path: 'customers',
        component: () => import('pages/customers/Index.vue'),
      },
      {
        name: 'DatabaseIndex',
        path: 'database',
        component: () => import('pages/database/Index.vue'),
      }
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
