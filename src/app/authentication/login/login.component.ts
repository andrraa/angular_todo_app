import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteService } from '@core/services/route/route.service';
import { AuthService } from '@core/services/authentication/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '@model/authentication/auth.model';
import { ToastService } from '@shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  pageTitle: string = 'Login - Account';

  // Login Properties
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
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

  async onLogin(): Promise<void> {
    const formData = this.loginForm.value;

    const loginData: LoginUser = {
      email: formData.email,
      password: formData.password,
    };

    const loginResult = await this.authService.loginUser(loginData);

    this.toastService.showToast({
      icon: loginResult.isSuccess ? 'success' : 'error',
      title: loginResult.message,
    });
  }

  async goToRegister() {
    await this.routeService.navigateTo('/auth/register');
  }

  async goToForgotPassword() {
    await this.routeService.navigateTo('/auth/forgot-password');
  }

  getLoginControl(controlName: string) {
    return this.loginForm.get(controlName);
  }
}
