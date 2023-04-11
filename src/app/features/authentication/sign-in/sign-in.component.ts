import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  });
  loading = false;

  get email(): AbstractControl<string | null, string | null> | null {
    return this.loginForm.get('email');
  }

  get emailInvalid(): boolean | undefined {
    return this.email?.invalid && this.email.touched;
  }

  get emailIsRequiredMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'email is required';
    }
    return '';
  }

  get emailValidEmailMessage(): string {
    if (this.email?.errors?.['email']) {
      return 'Not a valid email email';
    }
    return '';
  }

  get password(): AbstractControl<string | null, string | null> | null {
    return this.loginForm.get('password');
  }

  get passwordInvalid(): boolean | undefined {
    return this.password?.invalid && this.password.touched;
  }

  get passwordIsRequiredMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Password is required';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  signin() {
    const email = this.email?.value ? this.email.value : '';
    const password = this.password?.value ? this.password.value : '';
    this.loading = true;
    this.authService.signin(email, password).subscribe(
      () => {
        this.loading = false;
        this.toastService.show('Login success', {
          classname: 'bg-success text-light',
          delay: 10000,
        });
        this.router.navigate(['home']);
      },
      (err: Error) => {
        this.loading = false;
        this.toastService.show(err.message, {
          classname: 'bg-danger text-light',
          delay: 10000,
        });
      }
    );
  }
}
