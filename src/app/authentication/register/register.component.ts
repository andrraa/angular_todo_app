import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteService } from '@core/services/route/route.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@shared/services/toast/toast.service';
import { AuthService } from '@core/services/authentication/auth.service';
import { RegisterUser } from '@model/authentication/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  pageTitle: string = 'Register - Account';

  // Register User Properties
  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  // Loading State
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private title: Title,
    private toastService: ToastService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  async onRegister() {
    const formValue = this.registerForm.value;

    const registerData: RegisterUser = {
      email: formValue.email,
      password: formValue.password,
      fullName: formValue.fullName.toUpperCase(),
    };

    const registerResult = await this.authService.registerUser(registerData);

    this.toastService.showToast({
      icon: registerResult.isSuccess ? 'success' : 'error',
      title: registerResult.message,
    });

    if (registerResult.isSuccess) {
      await this.goToLogin();
    }
  }

  async goToLogin() {
    await this.routeService.navigateTo('/auth/login');
  }

  getLoginControl(controlName: string) {
    return this.registerForm.get(controlName);
  }
}
