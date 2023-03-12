import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ErrorData } from '../models/Error-Data';
import { ErrorMessageService } from './error-message.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(public errorMessageService: ErrorMessageService) {}
  private err: ErrorData = { title: '', message: '' };

  // <T> generic type (any type), operation e.g. login or signup, result what to return when there is error
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      this.err = {
        title: 'Error',
        message: `${operation} failed: ${error.message}`,
      };
      this.errorMessageService.start(this.err);
      return of(result as T); // return observable of result, can be null (return type is input type)
    };
  }
}
