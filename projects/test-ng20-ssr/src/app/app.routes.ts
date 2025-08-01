import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pokemon-summary/pokemon-summary').then((p) => p.PokemonSummary),
  },
];
