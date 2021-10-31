import { Component, OnInit } from '@angular/core';

import { MicrofiService } from '../service/microfi.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
  Microfi,
  Board,
  Address,
  MfiReport,
  Stakeholder,
} from '../../share/model/models';
import { ToastService } from '../../share/message/service/toast.service';
import { ReportEditComponent } from '../forms/report-edit/report-edit.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [MicrofiService, ToastService],
})
export class ReportsComponent implements OnInit {
  // Mfi model imports
  users: Microfi[];
  boards: Board[];
  addresses: Address[];
  reports: MfiReport[];
  stakeholders: Stakeholder[];
  prediction: any[];
  errorMessage = '';

  // Loading data
  loading = false;
  loggedUser: Microfi;
  total: number;
  id: number;

  constructor(
    public mfiService: MicrofiService,
    private dialog: MatDialog,
    private router: Router,
    private toastMessage: ToastService
  ) {}

  ngOnInit(): void {
    // Find all mfi reports
    this.loading = true;
    this.mfiService
      .getMfiReport()
      .pipe(first())
      .subscribe(
        (resr) => {
          this.loading = false;
          this.reports = resr;
          this.total = this.reports.length;
        },
        (error) => {
          this.errorMessage = error;
        }
      );

    // Find all mfi reports
    this.loading = true;
    this.mfiService
      .getPredictionReport()
      .pipe(first())
      .subscribe(
        (resr) => {
          this.loading = false;
          this.prediction = resr;
          this.total = this.reports.length;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  /**
   * update Mfi Report
   */
  updateMfiReport(
    id: number,
    report_assets: string,
    report_liability: string,
    report_revenue: string,
    report_income: string,
    report_dividend: string
  ): any {
    this.id = id;
    const dialogRef = this.dialog.open(ReportEditComponent, {
      width: '300px',

      data: {
        id,
        report_assets,
        report_liability,
        report_revenue,
        report_income,
        report_dividend,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.toastMessage.showSuccess(
          'Mfi report updated successfully',
          'Microfinance Monitoring'
        );
        this.router.navigate(['microfi/reports/']);
      }
    });
  }
}
