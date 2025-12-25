import { Routes } from '@angular/router';
import { ROUTE_TOKENS } from '@app/route-tokens';

const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_TOKENS.CLIENT_PATH,
    pathMatch: 'full',
  },
  {
    path: ROUTE_TOKENS.CLIENT_PATH,
    loadComponent: () => import('@layout/home-layout/home-layout.component'),
    children: [
      {
        path: ROUTE_TOKENS.CLIENT_HOME,
        loadComponent: () => import('@features/home/home.component'),
      },
      {
        path: ROUTE_TOKENS.DAP,
        loadChildren: () => import('@features/dap/dap.routes'),
      },
      {
        path: ROUTE_TOKENS.PROFILE,
        loadComponent: () => import('@features/profile/profile.component'),
      },
      {
        path: ROUTE_TOKENS.CUENTA_AHORRO,
        loadChildren: () =>
          import('@features/cuenta-ahorro/cuenta-ahorro.routes'),
      },
      {
        path: 'creditos-de-consumo',
        loadComponent: () =>
          import('@features/credito-consumo/credito-consumo.component'),
      },
      {
        path: 'creditos-comerciales',
        loadComponent: () =>
          import('@features/credito-comercial/credito-comercial.component'),
      },
    ],
  },
];

export default homeRoutes;
