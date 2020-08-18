import { Component, OnInit, Inject } from '@angular/core';
import { MicrofiService } from '../../service/microfi.service';
import { ToastService } from '../../../share/message/service/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stakeholder-edit',
  templateUrl: './stakeholder-edit.component.html',
  styleUrls: ['./stakeholder-edit.component.scss'],
  providers: [MicrofiService],
})
export class StakeholderEditComponent implements OnInit {
  stakeUpdateForm: FormGroup;
  submitted = false;
  title = 'Edit Address';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastMessage: ToastService,
    public mfiService: MicrofiService,
    public dialogRef: MatDialogRef<StakeholderEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.stakeUpdateForm = fb.group({
      stake_first_name: ['', Validators.required],
      stake_middle_name: [''],
      stake_last_name: ['', Validators.required],
      stake_email: ['', [Validators.email]],
      stake_phone_number: [''],
      stake_citizenship: ['', Validators.required],
      stake_share: ['', Validators.required],
      stake_avatar: [''],
    });
  }

  ngOnInit() {
    this.stakeUpdateForm.patchValue({
      stake_first_name: this.data.stake_first_name,
      stake_middle_name: this.data.stake_middle_name,
      stake_last_name: this.data.stake_last_name,
      stake_email: this.data.stake_email,
      stake_phone_number: this.data.stake_phone_number,
      stake_citizenship: this.data.stake_citizenship,
      stake_share: this.data.stake_share,
      stake_avatar: this.data.stake_avatar,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.stakeUpdateForm.controls;
  }

  updateStakeholder() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.stakeUpdateForm.invalid) {
      return;
    }
    if (this.stakeUpdateForm.valid) {
      this.mfiService
        .updateMfiStakeholder(this.data.id, this.stakeUpdateForm.value)
        .subscribe(
          (resp) => {
            this.data = resp;
            this.toastMessage.showSuccess(
              'Institution Stakeholder updated successfully',
              'Institution panel'
            );
            this.router.navigate(['/microfi/home/']);
            this.dialogRef.close();
            console.log(this.data);
          },
          (error) => {
            console.log(error);
            this.toastMessage.showError(
              'Failed to update stakeholder, try again',
              'Institution panel'
            );
          }
        );
    }
  }
}
