import fs from 'fs'
import { readFile } from "fs/promises";
import path from 'path'
import {createServer } from 'vite'
import serveStatic from 'serve-static';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

const  viteSSR = async (app) => {

    let root = process.cwd(),
        isProd = process.env.NODE_ENV === 'production'

    const resolve   =   (p) => path.resolve(root, p)
    const indexProdTemplate =   isProd
          ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8'): ''

    const manifest = isProd
          ? // @ts-ignore
          JSON.parse(await readFile('./dist/client/ssr-manifest.json'))
            // ssr_manifest
          : {}

    let vite
    if (!isProd){
        // Create Vite server in middleware mode. This disables Vite's own HTML
        // serving logic and let the parent server take control.
        //
        // In middleware mode, if you want to use Vite's own HTML serving logic
        // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
        
        vite = await createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {middlewareMode: 'ssr'}
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    }else {
        app.register(import('@fastify/compress'),{ global: false }) 
        app.use(serveStatic(resolve('dist/client'),{ index: false }))
      }

    app.get('*', async (req, res) =>{
        try {
            // const url = req.originalUrl
            // const url = req.originalUrl
            const url = req.protocol + '://' + req.headers.host + req.url;
            let template, render
          if (!isProd){
            // serve index.html - we will tackle this next
            // 1. Read index.html
            // always read fresh template in dev
            template = fs.readFileSync( resolve('index.html'),'utf-8' )
            // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react
            template = await vite.transformIndexHtml(url, template)
            // 3. Load the server entry. vite.ssrLoadModule automatically transforms
            //    your ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            render   = (await vite.ssrLoadModule('./entry/entry-server.js')).render
          } else {
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

export default viteSSR