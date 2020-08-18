import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminFeedback } from 'src/app/share/model/models';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ToastService } from '../../../share/message/service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [AdminService],
})
export class FeedbackComponent implements OnInit {
  adminReportForm: FormGroup;
  submitted = false;
  title = 'Add Admin Feedback';
  errorMessage = '';

  /** Quill editor */
  blured = false;
  focused = false;

  created(): any {
  }

  changedEditor(): any {
  }

  focus(): any {
    this.focused = true;
    this.blured = false;
  }

  blur(): any {
    this.focused = false;
    this.blured = true;
  }


  constructor(
    private fb: FormBuilder, public cdr: ChangeDetectorRef, private router: Router,
    private adminService: AdminService, private toastMessage: ToastService,
    private dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) { admin_feedback }: AdminFeedback
  ) {
    this.adminReportForm = fb.group({
      admin_feedback: [admin_feedback, Validators.required],
    });
  }

  triggerChangeDetection(): any {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f(): any {
    return this.adminReportForm.controls;
  }

  saveFeedback(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.adminReportForm.invalid) {
      return;
    }
    if (this.adminReportForm.valid) {
      this.adminService.saveAdminFeedback(this.adminReportForm.value).subscribe(
        (resp) => {
          this.toastMessage.showSuccess(
            `Admin Feedback added successfully ${resp.id}`,
            'Admin panel'
          );
          this.router.navigate(['/admin/home/']);
          this.dialogRef.close();

        },
        (error) => {
          this.errorMessage = error;
          this.toastMessage.showError(
            'Failed to add feedback, try again',
            'Admin panel'
          );
          this.router.navigate(['/admin/home/']);
          this.dialogRef.close();
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
