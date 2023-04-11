import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}
  signout(): void {
    this.authService.signout().subscribe(
      () => this.router.navigate(['../authentication/sign-in']),
      (err: Error) => {
        this.toastService.show(err.message, {
          classname: 'bg-success text-light',
          delay: 10000,
        });
      }
    );
  }
}
