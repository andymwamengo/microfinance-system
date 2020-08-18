/**
 * shared module that enforces
 * admin module for addmin operations
 * microfinance module microfinance operations
 * default module main entry operations
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

// Angular material imports
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { LoginComponent } from './security/login/login.component';
import { Title } from '@angular/platform-browser';
import { DeleteDialogComponent } from './message/dialog/delete-dialog/delete-dialog.component';
import { UserFeedbackComponent } from './user/user-feedback/user-feedback.component';
import { RegisterComponent } from './layout/register/register.component';
import { StatisticsComponent } from './more/statistics/statistics.component';
import { PublicationsComponent } from './more/publications/publications.component';
import { AboutUsComponent } from './more/about-us/about-us.component';
import { ContactUsComponent } from './more/contact-us/contact-us.component';
import { RelatedComponent } from './more/related/related.component';
import { BureauComponent } from './more/bureau/bureau.component';
import { TablesComponent } from './layout/tables/tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './security/interceptor/jwt.interceptor';
import { NotFoundComponent } from './404/not-found/not-found.component';

@NgModule({
  declarations: [
    ShareComponent,
    FooterComponent,
    NavBarComponent,
    SideBarComponent,
    LoginComponent,
    DeleteDialogComponent,
    UserFeedbackComponent,
    RegisterComponent,
    StatisticsComponent,
    PublicationsComponent,
    AboutUsComponent,
    ContactUsComponent,
    RelatedComponent,
    BureauComponent,
    TablesComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShareRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    // angular material imports
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  exports: [
    // angular material imports
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    // Export shared components
    NavBarComponent,
    FooterComponent,
    UserFeedbackComponent,
    StatisticsComponent,
    PublicationsComponent,
    AboutUsComponent,
    ContactUsComponent,
    BureauComponent,
    LoginComponent,
    RegisterComponent,
    TablesComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //  dialog componnets as entry for data
  entryComponents: [DeleteDialogComponent],
  // List of Angular providers for the system
  providers: [
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class ShareModule {}
