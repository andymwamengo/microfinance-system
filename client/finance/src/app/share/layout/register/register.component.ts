import { Component, OnInit } from '@angular/core';
import { MicrofiService } from '../../../microfi/service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../validators/password';
import { License } from '../../model/models';
import { ToastService } from '../../message/service/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MicrofiService],
})
export class RegisterComponent implements OnInit {
  license: License[];
  registerForm: FormGroup;
  submitted = false;
  // Password hide
  hide = true;
  errorMessage  = '';
  warnMessage: [];

  constructor(
    private formBuilder: FormBuilder,
    private microfiService: MicrofiService,
    private router: Router,
    private toastMessage: ToastService
  ) {}

  ngOnInit(): void {
    // License list from BRELA
    this.getLicenseList();

    this.registerForm = this.formBuilder.group(
      {
        id: [''],
        mfi_type: ['', Validators.required],
        mfi_name: ['', Validators.required],
        mfi_license: ['', Validators.required],
        mfi_service: ['', Validators.required],
        mfi_assets: ['', Validators.required],
        mfi_liability: ['', Validators.required],
        mfi_technology: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  /**
   * get license lists
   */
  getLicenseList(): void {
    this.microfiService.getLicense().subscribe((resp) => (this.license = resp));
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.valid) {
      this.microfiService
        .registerMfi(this.registerForm.value)
        .subscribe((res) => {
          if (res){
            this.toastMessage.showSuccess(
              `Institutional registered successfully`,
              'Institution panel'
            );
            this.router.navigate(['/auth/login']);
         } else if (!res){
          this.toastMessage.showError(
            `The credential provided are not consistency`,
            ''
          );
         }
        }, error => {
          this.errorMessage = error;
          this.toastMessage.showError(
            `Failed to register institution, Try again ${error}`,
            'Institution panel'
          );
        });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
