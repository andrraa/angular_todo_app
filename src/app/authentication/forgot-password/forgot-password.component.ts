import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteService } from '@core/services/route/route.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/authentication/auth.service';
import { ToastService } from '@shared/services/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  pageTitle: string = 'Forgot Password - Account';

  // Forgot Password Form
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private title: Title,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  async onPasswordReset() {
    const email = this.forgotPasswordForm.get('email')?.value;

    const passwordResetResult = await this.authService.resetPasswordUser(email);

    this.toastService.showToast({
      icon: passwordResetResult.isSuccess ? 'success' : 'error',
      title: passwordResetResult.message,
    });
  }

  async goToLogin() {
    await this.routeService.navigateTo('/auth/login');
  }

  getLoginControl(controlName: string) {
    return this.forgotPasswordForm.get(controlName);
  }
}
