import { Component, OnInit, Inject } from '@angular/core';
import { MicrofiService } from '../../service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MfiReport } from 'src/app/share/model/models';
import { Router } from '@angular/router';
import { ToastService } from '../../../share/message/service/toast.service';

@Component({
  selector: 'app-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.scss'],
  providers: [MicrofiService],
})
export class ReportAddComponent implements OnInit {
  reportForm: FormGroup;
  submitted = false;
  title = 'Add Report';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private mfiService: MicrofiService,
    private toastMessage: ToastService,
    private dialogRef: MatDialogRef<ReportAddComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      report_assets,
      report_liability,
      report_revenue,
      report_income,
      report_dividend,
    }: MfiReport
  ) {
    this.reportForm = fb.group({
      report_assets: [report_assets, Validators.required],
      report_liability: [report_liability, Validators.required],
      report_revenue: [report_revenue, Validators.required],
      report_income: [report_income, Validators.required],
      report_dividend: [report_dividend],
    });
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f(): any {
    return this.reportForm.controls;
  }

  saveReport(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reportForm.invalid) {
      return;
    }
    if (this.reportForm.valid) {
      console.log(this.reportForm.value);
      this.mfiService.registerMfiReport(this.reportForm.value).subscribe(
        (resp) => {
          console.log(resp);
          this.toastMessage.showSuccess(
            `Institutional report added successfully ${resp}`,
            'Institution panel'
          );
          this.dialogRef.close();
          this.router.navigate(['/microfi/reports/']);
        },
        (error) => {
          this.toastMessage.showError(
            `Failed to add report, try again ${error}`,
            'Institution panel'
          );
        }
      );

      // to prediction panel
      this.mfiService.sendPredictionReport(this.reportForm.value).subscribe(
        (resp) => {
          this.toastMessage.showSuccess(
            `Institution address added successfully ${resp}`,
            'Institution panel'
          );
          this.dialogRef.close();
        },
        (error) => {
          this.toastMessage.showError(
            `Failed to add address, try again ${error}`,
            'Institution panel'
          );
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
