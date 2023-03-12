import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('formDirective') formDirective!: NgForm;
  name$: Observable<Pick<User, 'first_name' | 'last_name'>> = new Observable();
  userId: number = 0;
  first_name: string = '';
  last_name: string = '';
  form: FormGroup = new FormGroup({});

  constructor(
    private homeService: HomeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
    this.userId = this.authService.userId;
    this.name$ = this.fetchName(this.userId);
    this.name$.subscribe((data) => {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
    });
  }

  fetchName(
    userId: number
  ): Observable<Pick<User, 'first_name' | 'last_name'>> {
    return this.homeService.fetchName(userId);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  update(formData: Pick<User, 'password'>): void {
    const updateData: Pick<User, 'id' | 'password'> = {
      id: this.userId,
      password: formData.password,
    };
    this.homeService.updatePassword(updateData).subscribe(() => {});
    this.form.reset();
    this.formDirective.resetForm();
  }
}
