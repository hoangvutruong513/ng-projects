import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home-page/home-page').then((p) => p.HomePage),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pokemon-summary/pokemon-summary').then((p) => p.PokemonSummary),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
