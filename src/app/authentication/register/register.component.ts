import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteService } from '../../core/services/route/route.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  pageTitle: string = 'Register - Account';

  constructor(
    private routeService: RouteService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  async goToLogin() {
    await this.routeService.navigateTo('/auth/login');
  }
}
