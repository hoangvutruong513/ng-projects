import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { AngularAppEngine } from '@angular/ssr';
import {
  createNodeRequestHandler,
  isMainModule,
  NodeRequestHandlerFunction,
} from '@angular/ssr/node';
import { H3, serve, serveStatic, toNodeHandler } from 'h3/node';

const app = new H3();
const apiApp = new H3();
const angularAppEngine = new AngularAppEngine();
const browserDistFolder = join(import.meta.dirname, '../browser');

apiApp.get('', (event) => {
  console.log('event.url in apiApp', event.url);
  console.log('event.req.url in apiApp', event.req.url);
  return { message: `Hello from H3 API!` };
});

app.mount('/api', apiApp);

if (isMainModule(import.meta.url)) {
  app.use(async (event) => {
    // Skip static file serving for /api routes
    if (event.url.pathname.startsWith('/api')) {
      return undefined;
    }

    // Construct file path using event.url.pathname
    const filePath = join(browserDistFolder, event.url.pathname);
    try {
      const stats = await stat(filePath);
      console.log({
        pathname: event.url.pathname,
        filePath,
        isFile: stats.isFile(),
      });
      if (stats.isFile()) {
        // eslint-disable-next-line @typescript-eslint/return-await
        return serveStatic(event, {
          getMeta: (id) => {
            console.log({ id });
            return { size: stats.size, mtime: stats.mtimeMs };
          },
          getContents: (id) => {
            return readFile(join(browserDistFolder, id));
          },
        });
      } else {
        return undefined;
      }
    } catch {
      // File doesn't exist, continue to SSR
      console.log('File not found:', filePath);
      return undefined;
    }
  });
}

app.use(async (event) => {
  // Skip Angular SSR for /api routes
  if (event.url.pathname.startsWith('/api')) {
    return undefined;
  }

  const response = await angularAppEngine.handle(event.req);
  console.log({ response });
  if (!response) {
    return undefined;
  } else {
    return response;
  }
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  serve(app, { port: 4000 });
}

const nodeHandler = toNodeHandler(app) as NodeRequestHandlerFunction;

export const reqHandler = createNodeRequestHandler(nodeHandler);
