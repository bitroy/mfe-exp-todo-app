# mfe-exp-todo-app (Todo App)

What this app is
- Small microfrontend exposing `./TodoList` via Module Federation.
- Entry: `src/index.js`
- Federation config: `webpack.common.js`

Run in development
1. cd mfe-exp-todo-app
2. npm install
3. npm run dev

- Dev server default port: 3002 (see `webpack.dev.js`).
- Remote entry (script) available at: http://localhost:3002/remoteEntry.js

Production via Docker Compose
1. cd mfe-exp-todo-app
2. npm ci && npm run build
3. docker-compose up --build

- docker-compose: `docker-compose.yml`
- Dockerfile: `Dockerfile`
- Nginx config: `default.conf`

Notes
- When consumed by other apps, ensure they point their REMOTE_TODO_APP_URL to the running remoteEntry (e.g. http://host:3002/remoteEntry.js).
