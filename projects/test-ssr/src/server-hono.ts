import { join } from 'node:path';

import { AngularAppEngine } from '@angular/ssr';
import {
  createNodeRequestHandler,
  createWebRequestFromNodeRequest,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = new Hono();
const angularAppEngine = new AngularAppEngine();

app.get('/api/', (c) => {
  return c.text('Hello from Hono!');
});

app.use('*', serveStatic({ root: browserDistFolder }));

app.get('*', async (c) => {
  // Create a fresh Request to avoid private member access issues
  const req = new Request(c.req.url, {
    method: c.req.method,
    headers: c.req.header(),
  });
  const res = await angularAppEngine.handle(req);
  if (res) {
    return res;
  } else {
    console.log('No Angular Route matched to serve');
    return c.text('Not found', 404);
  }
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  serve({ fetch: app.fetch, port: 4000 }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  });
}

export const reqHandler = createNodeRequestHandler(async (req, res, next) => {
  try {
    console.log('forwarding Node Request to Hono');
    const webRequest = createWebRequestFromNodeRequest(req);
    const webResponse = await app.fetch(webRequest);
    await writeResponseToNodeResponse(webResponse, res);
  } catch (error) {
    console.error(
      'Error handling request:',
      error instanceof Error ? error.message : String(error),
    );
    next(error);
  }
});
