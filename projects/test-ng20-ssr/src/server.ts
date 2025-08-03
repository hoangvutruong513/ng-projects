import { join } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

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
app.get('/api/hello/:pokemonId', async (req, res) => {
  const parsedPokemonId = parseInt(req.params.pokemonId);
  const normalizedPokemonId = isNaN(parsedPokemonId) ? 1 : parsedPokemonId;
  const fetchPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${normalizedPokemonId}`,
  );
  const pokemon = (await fetchPokemon.json()) as { name: string };
  setTimeout(() => res.status(200).json(pokemon), 2000);
});

app.post('/api/login', express.json(), (req, res) => {
  const body = req.body as { username: string; password: string };
  const username = body.username;
  const password = body.password;
  if (username === 'test' && password === 'test') {
    res.cookie('sexId', 'fuckyou2', {
      sameSite: 'lax',
      httpOnly: true,
    });
    res.cookie('maxAge', 'fuckme2', {
      sameSite: 'lax',
      httpOnly: true,
    });
    res.status(200).json({ message: 'Fucking cookie set' });
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
