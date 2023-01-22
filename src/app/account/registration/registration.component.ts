import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { User } from 'src/app/model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public invalidPassword: string = 'Unesite vašu lozinku!';
  public invalidUsername: string = 'Unesite vaše korisničko ime!';
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      let user: User = new User();
      user.city = this.validateForm.value.city;
      user.email = this.validateForm.value.email;
      user.username = this.validateForm.value.username;
      user.password = this.validateForm.value.password;
      user.firstname = this.validateForm.value.firstname;
      user.lastname = this.validateForm.value.lastname;
      this.service.register(user);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  passwordValidator = (control: AbstractControl): ValidationErrors => {
    console.log(control.value);
    if (control.value === null || control.value === '') {
      console.log('requiring');
      this.invalidPassword = 'Unesite vašu lozinku!';
      return { required: true };
    } else if (
      (control.value.includes('#') === false &&
        control.value.includes('$') === false &&
        control.value.includes('%') === false &&
        control.value.includes('&') === false &&
        control.value.includes('_') === false) ||
      control.value.length <= 7
    ) {
      this.invalidPassword =
        'Min 8 karaktera i min jedan specijalni (#,$,%,&,_)!';
      return { confirm: true, error: true };
    }
    return {};
  };
  usernameValidator = (control: AbstractControl): ValidationErrors => {
    console.log(control.value);
    if (control.value === null || control.value === '') {
      console.log('requiring');
      this.invalidUsername = 'Unesite vaše korisničko ime!';
      return { required: true };
    } else if (control.value.length <= 4) {
      this.invalidUsername = 'Minimalno 5 karaktera!';
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder, private service: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, this.passwordValidator]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      username: [null, [Validators.required, this.usernameValidator]],
      city: [null, [Validators.required]],
    });
  }
}
