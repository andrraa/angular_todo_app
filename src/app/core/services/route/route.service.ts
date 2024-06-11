import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private route: Router) {}

  async navigateTo(path: string): Promise<boolean> {
    try {
      return await this.route.navigate([path]);
    } catch (error) {
      console.error('Failed to navigate to route, caused by: ', error);
      return false;
    }
  }
}
