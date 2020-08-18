/**
 *
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MicrofiRoutingModule } from './microfi-routing.module';
import { MicrofiComponent } from './microfi.component';
import { ProfileComponent } from './profile/profile.component';
import { BarChartsComponent } from './charts/bar-charts/bar-charts.component';
import { LineChartsComponent } from './charts/line-charts/line-charts.component';
import { PieChartsComponent } from './charts/pie-charts/pie-charts.component';
import { DoughnutChartsComponent } from './charts/doughnut-charts/doughnut-charts.component';
import { StakeholderComponent } from './tables/stakeholder/stakeholder.component';
import { BoardComponent } from './tables/board/board.component';
import { AddressComponent } from './tables/address/address.component';
import { LocationComponent } from './maps/location/location.component';
import { BoardAddComponent } from './forms/board-add/board-add.component';
import { BoardEditComponent } from './forms/board-edit/board-edit.component';
import { AddressAddComponent } from './forms/address-add/address-add.component';
import { AddressEditComponent } from './forms/address-edit/address-edit.component';
import { StakeholderAddComponent } from './forms/stakeholder-add/stakeholder-add.component';
import { StakeholderEditComponent } from './forms/stakeholder-edit/stakeholder-edit.component';
import { ReportAddComponent } from './forms/report-add/report-add.component';
import { ReportEditComponent } from './forms/report-edit/report-edit.component';
import { RegisterEditComponent } from './forms/register-edit/register-edit.component';
import { ShareModule } from '../share/share.module';
import { TablesComponent } from './tables/tables/tables.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Title } from '@angular/platform-browser';
import { ReportsComponent } from './reports/reports.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MicrofiComponent,
    ProfileComponent,
    BarChartsComponent,
    LineChartsComponent,
    PieChartsComponent,
    DoughnutChartsComponent,
    ReportsComponent,
    StakeholderComponent,
    BoardComponent,
    AddressComponent,
    LocationComponent,
    BoardAddComponent,
    BoardEditComponent,
    AddressAddComponent,
    AddressEditComponent,
    StakeholderAddComponent,
    StakeholderEditComponent,
    ReportAddComponent,
    ReportEditComponent,
    RegisterEditComponent,
    TablesComponent,
    ChartsComponent,
    ReviewsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MicrofiRoutingModule,
    ShareModule,
    NgxPaginationModule,
    ChartsModule,
  ],
  exports: [ChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title],
})
export class MicrofiModule {}
