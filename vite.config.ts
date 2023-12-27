import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { readdirSync } from 'fs';

import react from '@vitejs/plugin-react-swc';

const absolutePathAliases: { [key: string]: string } = {};
const srcPath = path.resolve('./src/');
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, ''),
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

const env = loadEnv('all', process.cwd());

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      port: 3001,
    },
    proxy: {
      '/api': {
        target: env['VITE_API_URL'],
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (url) => url.replace('/api', ''),
      },
    },
  },
  build: {
    outDir: 'build',
  },
});
