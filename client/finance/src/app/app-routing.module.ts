/**
 * Microfinance routing module
 * admin operations
 * microfinance operations
 * common/shared operations
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './share/security/guard/auth.guard';

const routes: Routes = [
  {
    path: 'share',
    loadChildren: () =>
      import('./share/share.module').then((m) => m.ShareModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./default/default.module').then((m) => m.DefaultModule),
  },
  {
    // path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // children: [
    //   {
    //     path: 'microfi',
    //     loadChildren: () =>
    //       import('./microfi/microfi.module').then((m) => m.MicrofiModule),
    //   },
    // ],
    path: 'microfi',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./microfi/microfi.module').then((m) => m.MicrofiModule),
  },
  {
    // path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // children: [
    //   {
    //     path: 'admin',
    //     loadChildren: () =>
    //     import('./admin/admin.module').then((m) => m.AdminModule),
    //   },
    // ],
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // {
  //   path: '**', pathMatch: 'full',
  //   component: NotFoundComponent,
  //   data: { title: 'Page Not Found' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
