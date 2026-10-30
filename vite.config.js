import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const page = (path) => fileURLToPath(new URL(path, import.meta.url))

// Static hosts redirect /experience to /experience/; do the same locally.
function addTrailingSlash(req, res, next) {
  if (req.url === '/experience' || req.url.startsWith('/experience?')) {
    res.statusCode = 301
    res.setHeader('Location', req.url.replace('/experience', '/experience/'))
    res.end()
    return
  }
  next()
}

const trailingSlash = {
  name: 'experience-trailing-slash',
  configureServer(server) {
    server.middlewares.use(addTrailingSlash)
  },
  configurePreviewServer(server) {
    server.middlewares.use(addTrailingSlash)
  },
}

// Two pages, each a real HTML file in the build, so both URLs work when opened
// directly or refreshed on any static host (no rewrite rules needed):
//   /             -> index.html             (presentation)
//   /experience/  -> experience/index.html  (audience experience)
//
// base: './' keeps asset paths relative, so the build works from a domain root
// or a sub-path (e.g. GitHub Pages) without changes.
export default defineConfig({
  base: './',
  plugins: [react(), trailingSlash],
  server: { port: 5174 },
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        experience: page('./experience/index.html'),
      },
    },
  },
})
