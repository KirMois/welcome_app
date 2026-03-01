import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_LEAD_API_URL || 'http://localhost:5000';
  const backendOrigin = backendUrl.replace(/\/api\/.*/, '');

  return {
    plugins: [react()],
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    server: {
      port: 3000,
      host: true,
      allowedHosts: [
        'localhost',
        '.ngrok-free.app',
        '.ngrok.io',
        '.ngrok-free.dev',
        '.trycloudflare.com',
        '.serveo.net',
      ],
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
      },
      proxy: {
        '/api': {
          target: backendOrigin || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('error', (err) => { console.log('[proxy error]', err.message); });
          },
        },
      },
    },
    preview: {
      host: true,
      port: 4173,
      allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok-free.dev'],
    },
  };
});
