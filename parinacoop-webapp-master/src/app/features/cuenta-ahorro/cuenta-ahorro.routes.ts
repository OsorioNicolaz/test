import { Routes } from '@angular/router';
import { ROUTE_TOKENS } from '@app/route-tokens';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./cuenta-ahorro.component'),
  },
  {
    path: ROUTE_TOKENS.NEW_CUENTA_AHORRO,
    loadComponent: () => import('./pages/new-cuenta-ahorro/new-cuenta-ahorro.component').then(m => m.NewCuentaAhorroComponent),
  },

];

export default routes;