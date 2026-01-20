import { defineConfig } from 'vite';
import { resolve } from 'path';
import nunjucks from 'nunjucks';

// Custom Nunjucks plugin for Vite
function nunjucksPlugin() {
  const env = nunjucks.configure('src/templates', {
    autoescape: true,
    noCache: true
  });

  return {
    name: 'vite-plugin-nunjucks',
    transformIndexHtml: {
      order: 'pre' as const,
      handler(html: string) {
        return nunjucks.renderString(html, {});
      }
    }
  };
}

export default defineConfig({
  plugins: [nunjucksPlugin()],
  base: './',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
