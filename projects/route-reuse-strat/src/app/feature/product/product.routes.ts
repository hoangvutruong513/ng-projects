import { Routes } from '@angular/router';

const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/product-index/product-index').then((m) => m.ProductIndex),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./page/product-detail/product-detail').then(
            (m) => m.ProductDetail,
          ),
      },
      {
        path: ':productId',
        loadComponent: () =>
          import('./page/product-detail/product-detail').then(
            (m) => m.ProductDetail,
          ),
      },
    ],
  },
];

export default PRODUCT_ROUTES;
