import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	submitted = false;
  isLogged = false;
  errorMsg: string;

	constructor(
		private formBuilder: FormBuilder,
    private authSrv: AuthenticationService,
    private router: Router
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		const loginData = {
			email: this.f.email.value,
			password: this.f.password.value
		};

		this.authSrv.login(loginData).subscribe(
			response => {
        this.isLogged = true;
        this.router.navigate(['/']);
			},
			error => {
        this.errorMsg = error.error.message;
        console.log('There was an error on login: ' + this.errorMsg);
			}
		);
	}

}
