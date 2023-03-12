import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      first_name: new FormControl('', [
        Validators.required, // require to validate
        Validators.minLength(2), // first name at least 2 letters
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      other_names: new FormControl('', []),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  register(): void {
    // console.log(this.signupForm.value);
    this.authService.register(this.registrationForm.value).subscribe((msg) => {
      this.router.navigate(['login']);
    });
  }
}
