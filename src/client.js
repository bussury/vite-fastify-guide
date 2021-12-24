import { createSSRApp } from 'vue'
import './assets/main.css'
import App from './Client.vue'
import { createRouter } from './routes.js'
import { createHead } from '@vueuse/head'


// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp(ctx){
  const app = createSSRApp(App)
  const head = createHead()
  const router =  createRouter()
  app.use(router)
  app.use(head)
  return { ctx, app, head, router }
}