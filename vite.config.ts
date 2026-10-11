import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const targetWebhookUrl =
    process.env.VITE_N8N_CORPORATE_WEBHOOK_URL && !process.env.VITE_N8N_CORPORATE_WEBHOOK_URL.includes('localhost')
      ? process.env.VITE_N8N_CORPORATE_WEBHOOK_URL
      : 'https://essentially-wants-fewer-diego.trycloudflare.com/webhook/yuan-bento-corporate';

  return {
    base: process.env.GITHUB_PAGES === 'true' ? '/yuan-bento-restaurant/' : '/',
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_N8N_CORPORATE_WEBHOOK_URL': JSON.stringify(targetWebhookUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
