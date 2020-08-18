import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from '../../../share/message/service/toast.service';
import { MicrofiService } from '../../service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss'],
})
export class ReportEditComponent implements OnInit {
  reportUpdateForm: FormGroup;
  submitted = false;
  title = 'Edit Report';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public mfiService: MicrofiService,
    private toastMessage: ToastService,
    public dialogRef: MatDialogRef<ReportEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reportUpdateForm = fb.group({
      report_assets: ['', Validators.required],
      report_liability: ['', Validators.required],
      report_revenue: ['', Validators.required],
      report_income: ['', Validators.required],
      report_dividend: [''],
    });
  }

  ngOnInit() {
    this.reportUpdateForm.patchValue({
      report_assets: this.data.report_assets,
      report_liability: this.data.report_liability,
      report_revenue: this.data.report_revenue,
      report_income: this.data.report_income,
      report_dividend: this.data.report_dividend,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.reportUpdateForm.controls;
  }

  updateReport() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reportUpdateForm.invalid) {
      return;
    }
    if (this.reportUpdateForm.valid) {
      this.mfiService
        .updateMfiReport(this.data.id, this.reportUpdateForm.value)
        .subscribe(
          (resp) => {
            this.data = resp;
            this.toastMessage.showSuccess(
              'Institution report updated successfully',
              'Institution panel'
            );
            this.router.navigate(['/microfi/reports/']);
            this.dialogRef.close();
            console.log(this.data);
          },
          (error) => {
            console.log(error);
            this.toastMessage.showError(
              'Failed to edit report, try again',
              'Institution panel'
            );
          }
        );
    }
  }
}
