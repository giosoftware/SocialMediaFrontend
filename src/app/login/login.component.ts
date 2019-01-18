import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';


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
			email: ['cmaresma@gmail.com', [Validators.required, Validators.email]],
			password: ['cmaresma', [Validators.required, Validators.minLength(6)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	onSubmit() {
		console.log('onSubmit');
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
				console.log(response);
				window.localStorage.setItem(environment.LSTOKEN, response.token);
        this.isLogged = true;
        this.router.navigate(['/']);
				console.log(response.message);

			},
			error => {
        console.log('Ha habido un error al hacer login: ');
        this.errorMsg = error.error.message;
        console.log(this.errorMsg);
			}
		);
	}

}
