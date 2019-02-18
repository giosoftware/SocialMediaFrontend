import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy: jasmine.Spy;

  beforeEach(async(() => {

    // Create a fake service
    const authService = jasmine.createSpyObj('AuthenticationService', ['login']);
    // Make the spy return a synchronous Observable usin rxjs 'of'
    loginSpy = authService.login.and.returnValue(of(false));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthenticationService, useValue: authService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test if component is created', () => {
    expect(component).toBeTruthy();
  });

  // Test form validity
  it('Test if form is invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  // Test email input validity
  it('Test email field validity', () => {
    let errors = {};

    // email field invalid when empty
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    // Set email to something correct
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('Test password field validity', () => {
    let errors = {};
    const password = component.loginForm.controls['password'];
    // password field invalid when empty
    expect(password.valid).toBeFalsy();

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue('1234');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set password to something correct
    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  // Test login
  describe('Test when submit receives a valid response', () => {
    beforeEach(() => {
      loginSpy.and.returnValue(of(true));
      const email = component.loginForm.controls['email'].setValue('pepe@gmail.com');
      const password = component.loginForm.controls['password'].setValue('123456');
      component.onSubmit();
    });

    it('isLogged should be true', async(() => {
      expect(component.isLogged).toBe(true, 'should be true');
    }));

    it('errorMsg should be undefined', async(() => {
      expect(component.errorMsg).toBeUndefined();
    }));
  });

  describe('Test when submit receives and error', () => {
    beforeEach(() => {
      loginSpy.and.returnValue(throwError({error: {message: 'login failure'}}));
      const email = component.loginForm.controls['email'].setValue('pepe@gmail.com');
      const password = component.loginForm.controls['password'].setValue('123456');
      component.onSubmit();
    });

    it('isLogged should be false', async(() => {
      expect(component.isLogged).toBe(false, 'should be false');
    }));

    it('errorMsg should be "login failure"', async(() => {
      expect(component.errorMsg).toEqual('login failure');
    }));
  });


});
