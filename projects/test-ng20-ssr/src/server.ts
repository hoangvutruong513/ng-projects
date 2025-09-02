import { join } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { RedisStore } from 'connect-redis';
import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';

declare module 'express-session' {
  interface SessionData {
    idToken: string;
    isAuthenticated: boolean;
  }
}

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const redisClient = createClient({
  url: 'redis://localhost:6379',
});
redisClient.connect().catch((err: unknown) => {
  console.error(err);
});
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
});

app.use(
  session({
    store: redisStore,
    secret: 'abcd-1234',
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
      sameSite: 'lax',
      secure: false,
      httpOnly: true,
    },
  }),
);
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
app.post('/api/login', express.json(), (req, res) => {
  const body = req.body as { username: string; password: string };
  const username = body.username;
  const password = body.password;
  if (username === 'test' && password === 'test') {
    req.session.idToken = 'hahaha';
    req.session.cookie.maxAge = 5 * 60 * 1000;
    res.cookie('idToken', 'hahaha', {
      sameSite: 'lax',
      secure: false,
      httpOnly: false,
      maxAge: 5 * 60 * 1000,
    });
    res.status(200).json({ message: 'Fucking authenticated' });
  } else {
    res.status(401).json({ message: 'Fucking not authenticated' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        void writeResponseToNodeResponse(response, res);
      } else {
        next();
      }
    })
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] ?? 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
