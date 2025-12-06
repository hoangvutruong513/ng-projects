import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./feature/product/product.routes'),
  },
];
