import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extension: '.md',
      layout: false
    })
  ],
  kit: {
    adapter: adapter({
      fallback: '404.html'
    })
  }
};

export default config;
