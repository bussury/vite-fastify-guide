import fastify from 'fastify'
import middie from 'middie';

import viteSSR from './core/ViteSSR.js';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function main() {
  const app = fastify({
    logger: false
  })
  await app.register(middie);
  await app.register(viteSSR)
 /**
   * Load all api routes
   */
  app.get('/api/users', async (req, res) =>{
    return res.send([
      {"name":"John", "age":30, "car":'morano'},
      {"name":"Bussury", "age":33, "car":null},
    ])
  })
  app.get('/api/persons', async (req, res ) => {
    return res.send(
      [
        {'name':'Ally', 'username':'all'},
        {'name':'Kesi', 'username':'kesi'},
        {'name':'James', 'username':'james'},
      ]
    )
  })
  return app
}
if (!process.argv.includes('test')) {
  const app = await main()
  const address = await app.listen(3010)
  console.log(`Listening at ${address}.`)
}

export default main
