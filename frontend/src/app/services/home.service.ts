import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = 'http://localhost:3000/home';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchName(
    userId: number
  ): Observable<Pick<User, 'first_name' | 'last_name'>> {
    return this.http
      .get<Pick<User, 'first_name' | 'last_name'>>(`${this.url}/${userId}`, {
        responseType: 'json',
      })
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<
            Pick<User, 'first_name' | 'last_name'>
          >('fetchName')
        )
      );
  }

  updatePassword(
    updateduser: Pick<User, 'id' | 'password'>
  ): Observable<Pick<User, 'id' | 'password'>> {
    return this.http
      .put<Pick<User, 'id' | 'password'>>(
        `${this.url}`,
        updateduser,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Pick<User, 'id' | 'password'>>(
            'updatePassword'
          )
        )
      );
  }
}
