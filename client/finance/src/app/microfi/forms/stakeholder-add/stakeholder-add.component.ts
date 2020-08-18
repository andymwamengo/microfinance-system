import { Component, OnInit, Inject } from '@angular/core';
import { MicrofiService } from '../../service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stakeholder } from 'src/app/share/model/models';
import { Router } from '@angular/router';
import { ToastService } from '../../../share/message/service/toast.service';

@Component({
  selector: 'app-stakeholder-add',
  templateUrl: './stakeholder-add.component.html',
  styleUrls: ['./stakeholder-add.component.scss'],
  providers: [MicrofiService],
})
export class StakeholderAddComponent implements OnInit {
  stakeholderForm: FormGroup;
  submitted = false;
  title = 'Add Stakeholders';

  constructor(
    private router: Router,
    private toastMessage: ToastService,
    private fb: FormBuilder,
    private mfiService: MicrofiService,
    private dialogRef: MatDialogRef<StakeholderAddComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      stake_first_name,
      stake_middle_name,
      stake_last_name,
      stake_email,
      stake_phone_number,
      stake_citizenship,
      stake_share,
      stake_avatar,
    }: Stakeholder
  ) {
    this.stakeholderForm = fb.group({
      stake_first_name: [stake_first_name, Validators.required],
      stake_middle_name: [stake_middle_name],
      stake_last_name: [stake_last_name, Validators.required],
      stake_email: [stake_email, [Validators.email]],
      stake_phone_number: [stake_phone_number],
      stake_citizenship: [stake_citizenship, Validators.required],
      stake_share: [stake_share, Validators.required],
      stake_avatar: [stake_avatar],
    });
  }

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.stakeholderForm.controls;
  }

  saveStakeholder() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.stakeholderForm.invalid) {
      return;
    }
    if (this.stakeholderForm.valid) {
      console.log(this.stakeholderForm.value);
      this.mfiService
        .registerMfiStakeholder(this.stakeholderForm.value)
        .subscribe(
          (resp) => {
            console.log(resp);
            this.toastMessage.showSuccess(
              'Institution stakeholder added successfully',
              'Institution panel'
            );
            this.router.navigate(['/microfi/home/']);
            this.dialogRef.close();
          },
          (error) => {
            console.log(error);
            this.toastMessage.showError(
              'Failed to add stakeholder, try again',
              'Institution panel'
            );
          }
        );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
