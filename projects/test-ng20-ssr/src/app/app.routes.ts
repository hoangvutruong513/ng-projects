import { Routes } from '@angular/router';

// const authGuardFn: CanActivateFn = (routeSnapshot, routeState) => {
//   const request = inject(REQUEST, { optional: true });
//   // On Server Side
//   if (request) {
//     const cookiesString = request.headers.get('cookie');
//     if (cookiesString) {
//       const cookies = cookiesString
//         .split(';')
//         .reduce<Record<string, string>>((acc, curr) => {
//           const [key, val] = curr.trim().split('=');
//           acc[key] = decodeURIComponent(val);
//           return acc;
//         }, {});
//     }
//   // On Client Side
//   } else {

//   }
//   return true;
// };

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
