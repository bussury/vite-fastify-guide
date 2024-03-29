import { defineConfig } from 'vite';
// import postcss from './postcss.config.js';
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuePlugin from '@vitejs/plugin-vue'
import {resolve} from 'path';

const srcPath = resolve(process.cwd(), 'src');
const dev = process.env.NODE_ENV !== 'production'
export default defineConfig({
    plugins:[
        vuePlugin(),
        vueJsx(),
    ],
    build:{
        assetsDir: 'assets',
        outDir: 'dist',
        minify: !dev,
    },
    resolve: {
        alias: {
          '@': srcPath,
        },
   },
  //  css:{
  //   postcss
  // }
})