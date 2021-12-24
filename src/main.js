import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'

let app = createApp(App)
let router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
})
const head = createHead()

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

app.use(router)
app.use(head)
app.mount('#app')
