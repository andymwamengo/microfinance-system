import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicrofiComponent } from './microfi.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesComponent } from './tables/tables/tables.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthGuard } from '../share/security/guard/auth.guard';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: MicrofiComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { title: 'Institution Profile' },
      },
      {
        path: 'tables',
        component: TablesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Tables Institutions ' },
      },
      {
        path: 'charts',
        component: ChartsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Charts Institutions ' },
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Reviews Institutions ' },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Reports Institutions ' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicrofiRoutingModule {}
