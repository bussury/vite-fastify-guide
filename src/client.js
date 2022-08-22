import { createSSRApp } from 'vue'
import './assets/main.css'
import App from './client.vue'
import { createRouter, createWebHistory, createMemoryHistory, } from 'vue-router'
import { routes } from './routes.js'
import { createHead } from '@vueuse/head'


// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export  function createApp(){
  const app = createSSRApp(App)
  const head = createHead()
  // const router =  createRouter()


  let router = createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: routes,
    // routes: import.meta.hot ? [] : routes,
  })
  // if (import.meta.hot) {
  //   let removeRoutes = []
  
  //   for (let route of routes) {
  //     removeRoutes.push(router.addRoute(route))
  //   }
  
  //   import.meta.hot.accept('./routes.js', ({ routes }) => {
  //     for (let removeRoute of removeRoutes) removeRoute()
  //     removeRoutes = []
  //     for (let route of routes) {
  //       removeRoutes.push(router.addRoute(route))
  //     }
  //     router.replace('')
  //   })
  // }


  app.use(router)
  app.use(head)

  // if (url) {
  //   router.push(url)
  //    router.isReady()
  // }
  return {app, head, router }
}