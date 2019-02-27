import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

/**
 * This component doesn't has any logic in it
 */
// describe('CounterComponent (isolated test)', () => {});

/**
 * When we need to render the template and trigger some clicks we do a Shallow
 * test.
 */
describe('LoginComponent (shallow test)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents(); // This is not needed if you are in the CLI context
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  describe('email field', () => {
    let errors = {};
    let email: AbstractControl;

    beforeEach(() => {
      email = component.loginForm.controls['email'];
    });

    afterEach(() => {
      email = null;
    });

    it('should be invalid when empty', () => {
      // Assert
      expect(email.valid).toBeFalsy();
    });

    it('should be required when empty', () => {
      // Act
      errors = email.errors || {};
      // Assert
      expect(errors['required']).toBeTruthy();
    });

    it('should has email error when enter a wrong email', () => {
      // Act
      email.setValue('test');
      errors = email.errors || {};
      // Assert
      expect(errors['email']).toBeTruthy();
    });

    it('should doesn\'t has email error when enter a correct email', () => {
      // Act
      email.setValue('test@example.com');
      errors = email.errors || {};
      // Assert
      expect(errors['email']).toBeFalsy();
    });
  });

  describe('password field', () => {
    let errors = {};
    let password: AbstractControl;

    beforeEach(() => {
      // Arrange
      password = component.loginForm.controls['password'];
    });

    afterEach(() => {
      password = null;
    });

    it('should be invalid when empty', () => {
      // Assert
      expect(password.valid).toBeFalsy();
    });

    it('should be required when empty', () => {
      // Act
      errors = password.errors || {};
      // Assert
      expect(errors['required']).toBeTruthy();
    });

    it('should has a minlength error when enter less than 6 characters', () => {
      // Act
      password.setValue('1234');
      errors = password.errors || {};
      // Assert
      expect(errors['minlength']).toBeTruthy();
    });

    it('should be correct when enter at least 6 characters', () => {
      // Act
      password.setValue('123456');
      errors = password.errors || {};
      // Assert
      expect(errors['minlength']).toBeFalsy();
    });
  });

}); // End shallow test

/**
 * We could now go deeper and test the whole component with its dependencies,
 * see if everything is working great.
 * This is an Integrated test.
 */
describe('LoginComponent (integrated test)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy: jasmine.Spy;
  let router: Router;

  beforeEach(async(() => {
    // Create a fake service
    const authService = jasmine.createSpyObj('AuthenticationService', ['login']);
    // Make the spy return a synchronous Observable usin rxjs 'of'
    loginSpy = authService.login;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: authService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submit receives a valid response', () => {
    beforeEach(() => {
      // Arrange
      // Make the spy return a synchronous Observable usin rxjs 'of'
      loginSpy.and.returnValue(of(true));
      component.loginForm.controls['email'].setValue('pepe@gmail.com');
      component.loginForm.controls['password'].setValue('123456');

      // Act
      component.onSubmit();
    });

    // Assert
    it('isLogged should be true', async(() => {
      expect(component.isLogged).toBe(true, 'should be true');
    }));

    it('errorMsg should be undefined', async(() => {
      expect(component.errorMsg).toBeUndefined();
    }));

    it('should redirect to web root', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('when submit receives and error', () => {
    beforeEach(() => {
      // Arrange
      loginSpy.and.returnValue(throwError({ error: { message: 'login failure' } }));
      component.loginForm.controls['email'].setValue('pepe@gmail.com');
      component.loginForm.controls['password'].setValue('123456');

      // Act
      component.onSubmit();
    });

    // Assert
    it('isLogged should be false', async(() => {
      expect(component.isLogged).toBe(false, 'should be false');
    }));

    it('errorMsg should be "login failure"', async(() => {
      expect(component.errorMsg).toEqual('login failure');
    }));

    it('should not redirect', () => {
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('when user click Register button', () => {
    it('should call to router', async(() => {
      // Arrange
      spyOn(router, 'navigateByUrl');

      // const button = fixture.debugElement.query(By.css('.register'));
      const button = fixture.debugElement.nativeElement.querySelector('.register');
      console.log(button);
      // Act
      // button.triggerEventHandler('click', null);
      button.click();
      fixture.detectChanges();

      // Assert
      expect(router.navigateByUrl).toHaveBeenCalled();
    }));
  });

});
