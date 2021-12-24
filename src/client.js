import { createSSRApp } from 'vue'
import './assets/main.css'
import App from './Client.vue'
import { routes } from './routes.js'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'

let router = createRouter({
  // history: createWebHistory(),
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: import.meta.hot ? [] : routes,
})

if (import.meta.hot) {
  let removeRoutes = []

  for (let route of routes) {
    removeRoutes.push(router.addRoute(route))
  }

  import.meta.hot.accept('./routes.js', ({ routes }) => {
    for (let removeRoute of removeRoutes) removeRoute()
    removeRoutes = []
    for (let route of routes) {
      removeRoutes.push(router.addRoute(route))
    }
    router.replace('')
  })
}

export function createApp(ctx){
  const app = createSSRApp(App)
  const head = createHead()
  app.use(router)
  app.use(head)
  return { ctx, app, head, router }
}