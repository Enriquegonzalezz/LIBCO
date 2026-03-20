import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test-connection/test-connection.component').then(m => m.TestConnectionComponent)
  },
  {
    path: 'add-component',
    loadComponent: () => import('./pages/add-component/add-component.component').then(m => m.AddComponentComponent)
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/components-view/components-view.component').then(m => m.ComponentsViewComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
