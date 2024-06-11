import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteService } from '../../core/services/route/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  pageTitle: string = 'Login - Account';

  constructor(
    private routeService: RouteService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  async goToRegister() {
    await this.routeService.navigateTo('/auth/register');
  }
}
