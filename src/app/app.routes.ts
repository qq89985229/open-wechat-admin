import {Routes} from '@angular/router';
import {LayoutComponent as AdminLayoutComponent} from "./admin/pages/layout/layout.component";

export const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  {path: '', pathMatch: 'full', redirectTo: '/admin'},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  }
];
