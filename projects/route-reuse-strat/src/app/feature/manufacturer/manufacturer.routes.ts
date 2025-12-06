import { Routes } from '@angular/router';

const MANUFACTURER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/manufacturer-index/manufacturer-index').then(
        (m) => m.ManufacturerIndex,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./page/manufacturer-detail/manufacturer-detail').then(
            (m) => m.ManufacturerDetail,
          ),
      },
      {
        path: ':manufacturerId',
        loadComponent: () =>
          import('./page/manufacturer-detail/manufacturer-detail').then(
            (m) => m.ManufacturerDetail,
          ),
      },
    ],
  },
];

export default MANUFACTURER_ROUTES;
