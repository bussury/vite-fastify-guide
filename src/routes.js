
/** @type {import('vue-router').RouterOptions['routes']} */
 export let routes = [
  { path: '/', 
    component: () => import('@/views/Home.vue'), 
    meta: { 
      title: 'Home',
      layout: 'Client'
    } 
  },
  { path: '/about', 
    component: () => import('@/views/About.vue'), 
    meta: { 
      title: 'About',
      layout: 'Client'
    } 
    },
  { 
    path: '/:path(.*)', 
    component: () => import('@/views/NotFound.vue'),
     meta: { 
      title: 'not found',
    } 
  },
]

// export function createRouter() {
//   return _createRouter({
//     // use appropriate history implementation for server/client
//     // import.meta.env.SSR is injected by Vite.
//     history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
//     routes
//   })
// }