import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationLayoutComponent } from './components/authentication-layout/authentication-layout.component';
import { ToastContainerComponent } from 'src/app/core/components/toast-container/toast-container.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthenticationLayoutComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    ToastContainerComponent,
  ],
})
export class AuthenticationModule {}
