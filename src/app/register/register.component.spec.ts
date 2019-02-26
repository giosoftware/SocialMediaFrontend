import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


/**
 * This component doesn't has any logic in it
 */
// describe('CounterComponent (isolated test)', () => {});

/**
 * When we need to render the template and trigger some clicks we do a Shallow
 * test.
 */
describe('RegisterComponent (shallow test)', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [RegisterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  describe('firstName field', () => {
    let errors = {};
    let firstName: AbstractControl;

    beforeEach(() => {
      firstName = component.registerForm.controls['firstName'];
    });

    afterEach(() => {
      firstName = null;
    });

    it('should be invalid when empty', () => {
      // Assert
      expect(firstName.valid).toBeFalsy();
    });

    it('should be required when empty', () => {
      // Act
      errors = firstName.errors || {};
      // Assert
      expect(errors['required']).toBeTruthy();
    });

    it('should be valid when not empty', () => {
      // Arrange
      firstName.setValue('test');
      // Assert
      expect(firstName.valid).toBeTruthy();
    });
  });

  describe('lastName field', () => {
    let errors = {};
    let lastName: AbstractControl;

    beforeEach(() => {
      lastName = component.registerForm.controls['lastName'];
    });

    afterEach(() => {
      lastName = null;
    });

    it('should be invalid when empty', () => {
      // Assert
      expect(lastName.valid).toBeFalsy();
    });

    it('should be required when empty', () => {
      // Act
      errors = lastName.errors || {};
      // Assert
      expect(errors['required']).toBeTruthy();
    });

    it('should be valid when not empty', () => {
      // Arrange
      lastName.setValue('test');
      // Assert
      expect(lastName.valid).toBeTruthy();
    });
  });

  describe('email field', () => {
    let errors = {};
    let email: AbstractControl;

    beforeEach(() => {
      email = component.registerForm.controls['email'];
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
      password = component.registerForm.controls['password'];
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

  describe('nickname field', () => {
    let errors = {};
    let nickname: AbstractControl;

    beforeEach(() => {
      nickname = component.registerForm.controls['nickname'];
    });

    afterEach(() => {
      nickname = null;
    });

    it('should be invalid when empty', () => {
      // Assert
      expect(nickname.valid).toBeFalsy();
    });

    it('should be required when empty', () => {
      // Act
      errors = nickname.errors || {};
      // Assert
      expect(errors['required']).toBeTruthy();
    });

    it('should be valid when not empty', () => {
      // Arrange
      nickname.setValue('test');
      // Assert
      expect(nickname.valid).toBeTruthy();
    });
  });

  describe('interests field', () => {
    let errors = {};
    let interests: AbstractControl;

    beforeEach(() => {
      interests = component.registerForm.controls['interests'];
    });

    afterEach(() => {
      interests = null;
    });

    it('should be invalid when empty', () => {
      // Assert
      expect(interests.valid).toBeFalsy();
    });

    it('should be required when empty', () => {
      // Act
      errors = interests.errors || {};
      // Assert
      expect(errors['required']).toBeTruthy();
    });

    it('should be valid when not empty', () => {
      // Arrange
      interests.setValue('test');
      // Assert
      expect(interests.valid).toBeTruthy();
    });

  });

}); // End shallow test
