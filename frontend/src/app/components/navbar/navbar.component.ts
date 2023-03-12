import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isUserLoggedIn$) => {
      this.isAuthenticated = isUserLoggedIn$;
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(['login']);
  }
}
