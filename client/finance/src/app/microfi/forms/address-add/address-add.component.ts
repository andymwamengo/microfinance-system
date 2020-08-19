import { Component, OnInit, Inject } from '@angular/core';
import { MicrofiService } from '../../service/microfi.service';
import { ToastService } from '../../../share/message/service/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/share/model/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss'],
  providers: [MicrofiService],
})
export class AddressAddComponent implements OnInit {
  addressForm: FormGroup;
  submitted = false;
  title = 'Add Adress';
  errorMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private mfiService: MicrofiService,
    private toastMessage: ToastService,
    private dialogRef: MatDialogRef<AddressAddComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      address_office,
      address_district,
      address_region,
      addres_phone_number,
      address_website,
      address_pobox,
    }: Address
  ) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.addressForm = fb.group({
      address_office: [address_office, Validators.required],
      address_district: [address_district, Validators.required],
      address_region: [address_region, Validators.required],
      addres_phone_number: [addres_phone_number],
      address_pobox: [address_pobox],
      address_website: ['', [Validators.pattern(reg)]],
    });
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f(): any {
    return this.addressForm.controls;
  }

  saveAddress(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    if (this.addressForm.valid) {
      this.mfiService.registerMfiAddress(this.addressForm.value).subscribe(
        (resp) => {
          this.toastMessage.showSuccess(
            'Institution address added successfully',
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

  close(): any {
    this.dialogRef.close();
  }
}
