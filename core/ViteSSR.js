import fs from 'fs'
import { readFile } from "fs/promises";
import path from 'path'
import { fileURLToPath } from 'url'
import {createServer } from 'vite'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function viteSSR( 
  fastify, 
  root  = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort) {

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p) => path.resolve(__dirname, p)

    const indexProdTemplate =   isProd
          ? fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8'): ''

    const manifest = isProd
          ? // @ts-ignore
            (await import('../dist/client/ssr-manifest.json', {assert: {type: "json"}})).default
          : {}

    let vite
    console.log('isProd', !isProd)
    console.log('node env', process.env.NODE_ENV === 'production')
    if (!isProd){
      console.log('not prod')
        // Create Vite server in middleware mode. This disables Vite's own HTML
        // serving logic and let the parent server take control.
        //
        // In middleware mode, if you want to use Vite's own HTML serving logic
        // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
        
        vite = await createServer({
            base: '/',
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
              middlewareMode: true,
              hmr: hmrPort
            },
            // appType: 'custom'
        })
        // use vite's connect instance as middleware
        fastify.use(vite.middlewares)
    }else {
      fastify.register(await import('@fastify/compress'),{ global: false })  
      fastify.use((await import('serve-static')).default(resolve('../dist/client'),{ index: false }))
    }


    fastify.get('*', async (req, res) =>{
      try {
          const url = req.url
          // console.log(req.url)
          // console.log(req.headers.host)
          // console.log(req.protocol )
          // const url = req.protocol + '://' + req.headers.host + req.url;
          // const url = req.protocol + '://' + req.headers.host + req.url;
          let template, render
          console.log('not prod test', process.env.NODE_ENV)
        if (!isProd){
          // serve index.html - we will tackle this next
          // 1. Read index.html
          // always read fresh template in dev
          console.log('devs')
          template = fs.readFileSync( resolve('../index.html'),'utf-8' )
          // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
          //    also applies HTML transforms from Vite plugins, e.g. global preambles
          //    from @vitejs/plugin-react
          template = await vite.transformIndexHtml(url, template)
          // 3. Load the server entry. vite.ssrLoadModule automatically transforms
          //    your ESM source code to be usable in Node.js! There is no bundling
          //    required, and provides efficient invalidation similar to HMR.
          render   = (await vite.ssrLoadModule('../src/entry/entry-server.js')).render
        } else {
          console.log('prod')
          template = indexProdTemplate
          render = (await import('../dist/server/entry-server.js')).render
        }
          // 4. render the app HTML. This assumes entry-server.js's exported `render`
          //    function calls appropriate framework SSR APIs,
          //    e.g. ReactDOMServer.renderToString()
          const [appHtml, preloadLinks] = await render(url, manifest)
  
          // 5. Inject the app-rendered HTML into the template.
          const html = template
                  .replace(`<!--preload-links-->`, preloadLinks)
                  .replace(`<!--app-html-->`, appHtml)
  
          // 6. Send the rendered HTML back.
          // res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
         res.type('text/html').send(html)
      } catch (e) {
            // If an error is caught, let Vite fix the stracktrace so it maps back to
          // your actual source code.
          vite && vite.ssrFixStacktrace(e)
          console.error(e)
          res.status(500).send(e.message)
      }  
  })
}

// const  viteSSR = async (app) => {

//     let root = process.cwd(),
//         isProd = process.env.NODE_ENV === 'production'
//         const resolve = (p) => path.resolve(__dirname, p)

//     // const __dirname = path.dirname(fileURLToPath(import.meta.url))
//     // const resolve = (p) => path.resolve(__dirname, p)

//     // const resolve   =   (p) => path.resolve(root, p)
//     const indexProdTemplate =   isProd
//           ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8'): ''

//     const manifest = isProd
//           ? // @ts-ignore
//           // JSON.parse(await readFile('./dist/client/ssr-manifest.json'))
//           (await import('../dist/client/ssr-manifest.json',{assert: {type: "json"}})).default
//             // ssr_manifest
//           : {}

//     let vite
//     if (!isProd){
//         // Create Vite server in middleware mode. This disables Vite's own HTML
//         // serving logic and let the parent server take control.
//         //
//         // In middleware mode, if you want to use Vite's own HTML serving logic
//         // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
        
//         vite = await createServer({
//             root,
//             logLevel: isTest ? 'error' : 'info',
//             server: {middlewareMode: true},
//             // appType: 'custom'
//         })
//         // use vite's connect instance as middleware
//         app.use(vite.middlewares)
//     }else {
//         app.register(await import('@fastify/compress'),{ global: false })  
//         app.use((await import('serve-static')).default(resolve('dist/client'),{ index: false }))
//       }

//     app.get('*', async (req, res) =>{
//         try {
//             // const url = req.url
//             const url = req.protocol + '://' + req.headers.host + req.url;
//             let template, render
//           if (!isProd){
//             // serve index.html - we will tackle this next
//             // 1. Read index.html
//             // always read fresh template in dev
//             template = fs.readFileSync( resolve('index.html'),'utf-8' )
//             // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
//             //    also applies HTML transforms from Vite plugins, e.g. global preambles
//             //    from @vitejs/plugin-react
//             template = await vite.transformIndexHtml(url, template)
//             // 3. Load the server entry. vite.ssrLoadModule automatically transforms
//             //    your ESM source code to be usable in Node.js! There is no bundling
//             //    required, and provides efficient invalidation similar to HMR.
//             render   = (await vite.ssrLoadModule('/src/entry/entry-server.js')).render
//           } else {
//             template = indexProdTemplate
//             render = (await import('../dist/server/entry-server.js')).render
//           }
//             // 4. render the app HTML. This assumes entry-server.js's exported `render`
//             //    function calls appropriate framework SSR APIs,
//             //    e.g. ReactDOMServer.renderToString()
//             const [appHtml, preloadLinks] = await render(url, manifest)
    
//             // 5. Inject the app-rendered HTML into the template.
//             const html = template
//                     .replace(`<!--preload-links-->`, preloadLinks)
//                     .replace(`<!--app-html-->`, appHtml)
    
//             // 6. Send the rendered HTML back.
//             // res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
//            res.type('text/html').send(html)
//         } catch (e) {
//               // If an error is caught, let Vite fix the stracktrace so it maps back to
//             // your actual source code.
//             vite && vite.ssrFixStacktrace(e)
//             console.error(e)
//             res.status(500).send(e.message)
//         }  
//     })
// }

export  { viteSSR } 