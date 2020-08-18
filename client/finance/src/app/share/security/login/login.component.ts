import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { takeUntil, first } from 'rxjs/operators';
import { Microfi, AdminFeedback } from '../../model/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
  posts: AdminFeedback[];
  form: FormGroup;

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrlOne: string;
  returnUrlTwo: string;
  errorMessage = '';
  loggedUser: Microfi;
  // Password hide
  hide = true;
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    // const logg = this.authService.currentUserValue.mfi_name;
    if (this.authService.currentUserValue !== null) {
      if (this.authService.currentUserValue.is_superuser === true) {
        router.navigate(['/admin/home/']);
      } else if (this.authService.currentUserValue.is_superuser === false) {
        router.navigate(['/microfi/home/']);
      }
    }
  }

  ngOnInit(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // reset login status
    this.authService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrlOne =
      this.route.snapshot.queryParams.returnUrl || '/admin/home/';
    // Second router
    this.returnUrlTwo =
      this.route.snapshot.queryParams.returnUrl || '/microfi/home/';
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }

  onLoginSubmit(): any {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy), first())
        .subscribe(
          (data) => {
            if (data.is_superuser === true) {
              this.router.navigate([this.returnUrlOne]);
            } else if (data.is_superuser === false) {
              this.router.navigate([this.returnUrlTwo]);
            }
          },
          (error) => {
            this.errorMessage = error;
            this.loading = false;
          }
        );
    }
  }

  onReset(): any {
    this.submitted = false;
    this.loginForm.reset();
  }

  /**
   * Unsubscribing from observables
   */
  ngOnDestroy(): any {
    this.destroy.next(true);
    // Unsubscribe from the subject
    this.destroy.unsubscribe();
  }
}
