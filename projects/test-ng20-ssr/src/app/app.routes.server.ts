import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const ids = await Promise.resolve([
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ]);
      return ids;
    },
    fallback: PrerenderFallback.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
