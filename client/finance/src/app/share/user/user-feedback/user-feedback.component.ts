import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { UserFeedback } from '../../model/models';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ToastService } from '../../message/service/toast.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss'],
})
export class UserFeedbackComponent implements OnInit {
  userFeedForm: FormGroup;
  submitted = false;
  title = 'Add User Feedback to the System and Users';

  constructor(
    private fb: FormBuilder, public cdr: ChangeDetectorRef,
    private userService: UserService, private toastMessage: ToastService,
    private router: Router,
    private dialogRef: MatDialogRef<UserFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA)
    { user_email, user_first_name, user_last_name, user_feedback }: UserFeedback
  ) {
    this.userFeedForm = fb.group({
      user_email: [user_email, [Validators.required, Validators.email]],
      user_first_name: [user_first_name, Validators.required],
      user_last_name: [user_last_name, Validators.required],
      user_feedback: [user_feedback, Validators.required],
    });
  }

  ngOnInit(): void {}


  triggerChangeDetection(): any {
    this.cdr.detectChanges();
  }


  // convenience getter for easy access to form fields
  get f(): any {
    return this.userFeedForm.controls;
  }

  // Sending user feedback to service
  saveUserFeedback(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userFeedForm.invalid) {
      return;
    }
    if (this.userFeedForm.valid) {
      this.userService.postFeedback(this.userFeedForm.value).subscribe(
        (resp) => {
          this.toastMessage.showSuccess(
            'User Feedback added successfully',
            'InstituUsertion panel'
          );
          this.router.navigate(['/home/microfinance/']);
          this.dialogRef.close();

        },
        (error) => {
          this.toastMessage.showError(
            `Failed to add feedback, try again ${error}`,
            'User panel'
          );
          this.router.navigate(['/home/microfinance/']);
          this.dialogRef.close();
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
