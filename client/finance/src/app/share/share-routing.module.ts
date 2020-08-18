import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareComponent } from './share.component';
import { RegisterComponent } from './layout/register/register.component';
import { StatisticsComponent } from './more/statistics/statistics.component';
import { PublicationsComponent } from './more/publications/publications.component';
import { LoginComponent } from './security/login/login.component';
import { AboutUsComponent } from './more/about-us/about-us.component';
import { ContactUsComponent } from './more/contact-us/contact-us.component';
import { RelatedComponent } from './more/related/related.component';
import { BureauComponent } from './more/bureau/bureau.component';
import { TablesComponent } from './layout/tables/tables.component';
import { MicrofiResolverService } from '../microfi/resolver/microfi-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShareComponent,
    children: [
      { path: '', redirectTo: 'microfinance', pathMatch: 'full' },
      {
        path: 'microfinance',
        component: TablesComponent,
        resolve: { microfi: MicrofiResolverService },
        data: { title: 'Microfinance Institutions' },
      },
      {
        path: 'auth/login',
        component: LoginComponent,
        data: { title: 'Login Users  System' },
      },
      {
        path: 'microfi/register',
        component: RegisterComponent,
        data: { title: 'Regsiter Institutions System' },
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        data: { title: 'Statistics System' },
      },
      {
        path: 'publications',
        component: PublicationsComponent,
        data: { title: 'System Publications' },
      },
      {
        path: 'about',
        component: AboutUsComponent,
        data: { title: 'About Us System' },
      },
      {
        path: 'contact',
        component: ContactUsComponent,
        data: { title: 'Contact Us System' },
      },
      {
        path: 'related',
        component: RelatedComponent,
        data: { title: 'Related System' },
      },
      {
        path: 'bureau',
        component: BureauComponent,
        data: { title: 'Foreign Exchange' },
      },
      {
        path: 'terms',
        component: AboutUsComponent,
        data: { title: 'Terms and Conditions' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareRoutingModule {}
