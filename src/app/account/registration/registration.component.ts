import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { Avatar } from 'src/app/model/Avatar';
import { User } from 'src/app/model/User';
import { AvatarServiceService } from 'src/app/services/avatar.service.service';
import { UserService } from '../user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public spinner: boolean = false;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 40;
  @ViewChild('carouselRef')
  public carouselRef!: NzCarouselComponent;
  public invalidPassword: string = 'Unesite vašu lozinku!';
  public invalidUsername: string = 'Unesite vaše korisničko ime!';
  public avatars: Array<Avatar> = [];
  public avatarSelection: string = 'a1.png';
  private submitVal: boolean = false;
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  handleError(error: HttpErrorResponse) {
    console.log('erro handling');
    this.spinner = false;
    this.message.create('error', 'Odaberite drugo korisničko ime!');
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  submitForm(): void {
    if (this.submitVal) {
      console.log('submiting');
      if (this.validateForm.valid) {
        let user: User = new User();
        user.city = this.validateForm.value.city;
        user.email = this.validateForm.value.email;
        user.username = this.validateForm.value.username;
        user.password = this.validateForm.value.password;
        user.firstname = this.validateForm.value.firstname;
        user.lastname = this.validateForm.value.lastname;
        user.avatar = this.avatarSelection;
        this.spinner = true;
        this.service
          .register(user)
          .pipe(catchError((error: any) => this.handleError(error)))
          .subscribe((data: any) => {
            this.spinner = false;
            console.log(data);
            this.message.create('success', 'Uspješna registracija!');
            this.validateForm.reset();
            this.submitVal = false;
            this.router.navigate(['/login']);
          });
      } else {
        Object.values(this.validateForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        this.submitVal = false;
      }
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

  constructor(
    private fb: UntypedFormBuilder,
    private service: UserService,
    private avatarService: AvatarServiceService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.avatarService.getAllAvatars().subscribe((data: Array<string>) => {
      console.log(data);
      this.avatars = this.avatarService.mapAvatars(data);
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, this.passwordValidator]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      username: [null, [Validators.required, this.usernameValidator]],
      avatar: [null],
      city: [null, [Validators.required]],
    });
  }
  next() {
    console.log('hitrSSS');
    this.carouselRef.next();
  }
  prev() {
    this.carouselRef.pre();
  }
  changed(obj: any) {
    this.avatarSelection = 'a' + obj + '.png';
    console.log(this.avatarSelection);
  }
  submitting() {
    this.submitVal = true;
    // this.submitForm();
  }
}
