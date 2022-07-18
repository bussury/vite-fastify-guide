import { createApp } from '@/client.js'

const { app, router } = await createApp(window.hydration)

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})