import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  isLogged = false;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nickname: ['', Validators.required],
      interests: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value,
      nickname: this.f.nickname.value,
      interests: this.f.interests.value.split(',')
    };

    this.authSrv.register(registerData).subscribe(
      response => {
        localStorage.setItem(environment.LSTOKEN, response.token);
        localStorage.setItem(environment.NICK, response.nickname);
        this.isLogged = true;
        this.router.navigate(['/']);
      },
      error => {
        this.errorMsg = error.error.message;
        console.log('There was an error on register: ' + this.errorMsg);
      }
    );
  }

}
