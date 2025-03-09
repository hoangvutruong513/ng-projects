import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './content-projection-with-template/content-projection-with-template.component'
      ).then((p) => p.ContentProjectWithTemplateComponent),
  },
];
