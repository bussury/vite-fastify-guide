import { createSSRApp } from 'vue'
import './assets/main.css'
import App from './client.vue'
import { createRouter } from './routes.js'
import { createHead } from '@vueuse/head'


// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export async function createApp(ctx, url){
  const app = createSSRApp(App)
  const head = createHead()
  const router =  createRouter()
  app.use(router)
  app.use(head)

  if (url) {
    router.push(url)
     router.isReady()
  }
  return { ctx, app, head, router }
}