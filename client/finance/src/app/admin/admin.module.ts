import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MicrofiComponent } from './tables/microfi/microfi.component';
import { MicrofiListComponent } from './tables/microfi-list/microfi-list.component';
import { FeedbackListComponent } from './tables/feedback-list/feedback-list.component';
import { BarChartsComponent } from './charts/bar-charts/bar-charts.component';
import { LineChartsComponent } from './charts/line-charts/line-charts.component';
import { PieChartsComponent } from './charts/pie-charts/pie-charts.component';
import { DoughnutChartsComponent } from './charts/doughnut-charts/doughnut-charts.component';
import { FeedbackComponent } from './review/feedback/feedback.component';
import { PredictionComponent } from './model/prediction/prediction.component';
import { AdminComponent } from './admin.component';
import { ShareModule } from '../share/share.module';
import { HomeComponent } from './home/home/home.component';
import { ReviewComponent } from './review/review/review.component';
import { TablesComponent } from './tables/tables/tables.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { Title } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { ReportComponent } from './report/report/report.component';
import { QuillModule } from 'ngx-quill';
import { MicrofiDetailsComponent } from './home/microfi-details/microfi-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    MicrofiComponent,
    MicrofiListComponent,
    FeedbackListComponent,
    BarChartsComponent,
    LineChartsComponent,
    PieChartsComponent,
    DoughnutChartsComponent,
    FeedbackComponent,
    PredictionComponent,
    HomeComponent,
    ReviewComponent,
    TablesComponent,
    ChartsComponent,
    ReportComponent,
    MicrofiDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ShareModule,
    NgxPaginationModule,
    ChartsModule,
    QuillModule.forRoot(),
  ],
  exports: [ChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Title,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class AdminModule {}
