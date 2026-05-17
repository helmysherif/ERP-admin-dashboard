import { Routes } from '@angular/router';
import { authGuard } from './components/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
    ],
    // canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent,
          ),
      },
    ],
  },
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./pages/auth/login/login.component').then(
  //       (m) => m.LoginComponent,
  //     ),
  // },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./pages/auth/sign-up/sign-up.component').then(
  //       (m) => m.SignUpComponent,
  //     ),
  // },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
