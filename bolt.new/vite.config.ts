import { defineConfig, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    nodePolyfills({
      include: ['path', 'buffer'],
    }),
    {
      name: 'dev-api-middleware',
      configureServer(server: ViteDevServer) {
        server.middlewares.use('/api/chat', async (req, res) => {
          try {
            const { default: handler } = await import('./src/api/chat');

            // Collect request body
            const chunks: Buffer[] = [];
            req.on('data', (c) => chunks.push(c));
            await new Promise((resolve) => req.on('end', resolve));
            const body = Buffer.concat(chunks);

            const url = new URL(req.url || '/api/chat', 'http://localhost');
            const request = new Request(url.toString(), {
              method: req.method,
              headers: new Headers(Object.entries(req.headers) as [string, string][]),
              body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
            });

            const response: Response = await handler(request);

            res.statusCode = response.status;
            response.headers.forEach((value, key) => res.setHeader(key, value));

            if (response.body) {
              const reader = (response.body as ReadableStream).getReader();
              const pump = async () => {
                const { value, done } = await reader.read();
                if (done) {
                  res.end();
                  return;
                }
                res.write(Buffer.from(value));
                pump();
              };
              pump();
            } else {
              const text = await response.text();
              res.end(text);
            }
          } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        });
      },
    },
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
});