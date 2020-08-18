import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from '../../../share/message/service/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MicrofiService } from '../../service/microfi.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss'],
  providers: [MicrofiService],
})
export class AddressEditComponent implements OnInit {
  addressUpdateForm: FormGroup;
  submitted = false;
  title = 'Edit Address';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastMessage: ToastService,
    public dialogRef: MatDialogRef<AddressEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mfiService: MicrofiService
  ) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.addressUpdateForm = fb.group({
      address_office: ['', Validators.required],
      address_district: ['', Validators.required],
      address_region: ['', Validators.required],
      address_pobox: [''],
      addres_phone_number: [''],
      address_website: ['', [Validators.pattern(reg)]],
    });
  }

  ngOnInit(): void {
    this.addressUpdateForm.patchValue({
      address_office: this.data.address_office,
      address_district: this.data.address_district,
      address_region: this.data.address_region,
      address_pobox: this.data.address_pobox,
      addres_phone_number: this.data.addres_phone_number,
      address_website: this.data.address_website,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.addressUpdateForm.controls;
  }

  updateAddress(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addressUpdateForm.invalid) {
      return;
    }
    if (this.addressUpdateForm.valid) {
      this.mfiService
        .updateMfiAddress(this.data.id, this.addressUpdateForm.value)
        .subscribe(
          (resp) => {
            this.data = resp;
            this.toastMessage.showSuccess(
              'Institution address updated successfully',
              'Institution panel'
            );
            this.router.navigate(['/microfi/home/']);
            this.dialogRef.close();
            console.log(this.data);
          },
          (error) => {
            this.toastMessage.showError(
              `Failed to update address, try again ${error}`,
              'Institution panel'
            );
          }
        );
    }
  }
}
