import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'


/** @type {import('vue-router').RouterOptions['routes']} */
 let routes = [
  { path: '/', 
    component: () => import('@/views/Home.vue'), 
    meta: { 
      title: 'Home',
      layout: 'LayoutClient'
    } 
  },
  { path: '/about', 
    component: () => import('@/views/About.vue'), 
    meta: { 
      title: 'About',
      layout: 'LayoutClient'
    } 
    },
  { 
    path: '/:path(.*)', 
    component: () => import('@/views/NotFound.vue') 
  },
]

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}