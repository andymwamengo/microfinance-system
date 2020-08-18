import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home/home.component';
import { ReviewComponent } from './review/review/review.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { TablesComponent } from './tables/tables/tables.component';
import { AuthGuard } from '../share/security/guard/auth.guard';
import { NotFoundComponent } from '../share/404/not-found/not-found.component';
import { ReportComponent } from './report/report/report.component';
import { MicrofiDetailsComponent } from './home/microfi-details/microfi-details.component';
import { MicrofiResolverService } from '../microfi/resolver/microfi-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: { microfi: MicrofiResolverService },
        data: { title: 'Admin Home' },
      },
      {
        path: 'microfi/:id',
        component: MicrofiDetailsComponent,
        canActivate: [AuthGuard],
        resolve: { microfi: MicrofiResolverService },
        data: { title: 'Microfinance Details' },
      },
      {
        path: 'tables',
        component: TablesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Tables of Admin' },
      },
      {
        path: 'charts',
        component: ChartsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Charts | Admin' },
      },
      {
        path: 'reviews',
        component: ReviewComponent,
        canActivate: [AuthGuard],
        data: { title: 'Reviews | admin' },
      },
      {
        path: 'reports',
        component: ReportComponent,
        canActivate: [AuthGuard],
        data: { title: 'Reports | admin' },
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: { title: 'Page Not Found' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
