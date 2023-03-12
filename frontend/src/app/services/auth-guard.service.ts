import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  // returns observable boolean response. determine if user is logged in
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (!this.authService.isUserLoggedIn$.value) {
      this.router.navigate(['signup']);
    }
    return this.authService.isUserLoggedIn$;
  }
}
