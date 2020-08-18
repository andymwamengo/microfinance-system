import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from '../../../share/message/service/toast.service';
import { MicrofiService } from '../../service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.component.html',
  styleUrls: ['./register-edit.component.scss'],
  providers: [MicrofiService],
})
export class RegisterEditComponent implements OnInit {
  updateMfiForm: FormGroup;
  submitted = false;
  title = 'Edit Mfi';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastMessage: ToastService,
    public dialogRef: MatDialogRef<RegisterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mfiService: MicrofiService
  ) {
    this.updateMfiForm = fb.group({
      mfi_name: ['', Validators.required],
      mfi_license: ['', Validators.required],
      mfi_service: ['', Validators.required],
      mfi_assets: ['', Validators.required],
      mfi_liability: ['', Validators.required],
      mfi_technology: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.updateMfiForm.patchValue({
      mfi_name: this.data.mfi_name,
      mfi_license: this.data.mfi_license,
      mfi_service: this.data.mfi_service,
      mfi_assets: this.data.mfi_assets,
      mfi_liability: this.data.mfi_liability,
      mfi_technology: this.data.mfi_technology,
      email: this.data.email,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateMfiForm.controls;
  }

  updateMfi() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateMfiForm.invalid) {
      return;
    }
    if (this.updateMfiForm.valid) {
      this.mfiService
        .updateMfi(this.data.id, this.updateMfiForm.value)
        .subscribe(
          (resp) => {
            this.data = resp;
            this.toastMessage.showSuccess(
              'Institution updated successfully',
              'Institution panel'
            );
            this.router.navigate(['/microfi/home/']);
            this.dialogRef.close();
            console.log(this.data);
          },
          (error) => {
            console.log(error);
            this.toastMessage.showError(
              'Failed to update institution, try again',
              'Institution panel'
            );
          }
        );
    }
  }
}
