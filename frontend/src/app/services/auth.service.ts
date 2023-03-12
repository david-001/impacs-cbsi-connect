import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/auth/';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false); // observable, use BehaviorSubject set initial value to false
  userId: number = 0;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // inject services in constructor
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  register(user: Omit<User, 'id'>): Observable<User> {
    // first() don't have to unsubscribe, give back first response
    return this.http
      .post<User>(`${this.url}/registration`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('register'))
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{ token: string; userId: number }> {
    // See auth.js in backend controllers
    return this.http
      .post<{ token: string; userId: number }>(
        `${this.url}/login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        // first() don't have to unsubscribe, give back first response
        first(),
        tap((tokenObject: { token: string; userId: number }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['home']);
        }), // tap into response
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: number;
          }>('login')
        )
      );
  }
}
