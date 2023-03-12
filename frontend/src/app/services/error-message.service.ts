import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { ErrorData } from '../models/Error-Data';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor(public errDialog: MatDialog) {}

  start(err: ErrorData): void {
    const dialogRef = this.errDialog.open(ErrorMessageComponent, {
      width: '500px',
      height: '200px',
      data: err,
    });
  }
}
