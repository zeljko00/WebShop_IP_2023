import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/account/user.service';
import { User } from 'src/app/model/User';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return control?.value.length < 8;
  }
}
@Component({
  selector: 'app-personal-info-settings',
  templateUrl: './personal-info-settings.component.html',
  styleUrls: ['./personal-info-settings.component.css'],
})
export class PersonalInfoSettingsComponent {
  @Input() user: User = new User();
  passwordMatcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    // this.format(),
  ]);
  cityFormControl = new FormControl('', [Validators.required]);

  constructor(
    public matDialogRef: MatDialogRef<PersonalInfoSettingsComponent>,
    private service: UserService,
    private message: NzMessageService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
    this.user.password = '';
  }
  submit() {
    this.passwordFormControl.markAllAsTouched();
    this.firstnameFormControl.markAllAsTouched();
    this.lastnameFormControl.markAllAsTouched();
    this.cityFormControl.markAllAsTouched();
    this.emailFormControl.markAllAsTouched();
    if (
      this.firstnameFormControl.valid &&
      this.lastnameFormControl.valid &&
      this.passwordFormControl.valid &&
      this.cityFormControl.valid &&
      this.emailFormControl.valid
    ) {
      //poziv servisa
      this.service
        .update(this.user)
        .pipe(
          catchError((error: any) =>
            this.handleError(error, 'Neuspješno slanje!')
          )
        )
        .subscribe((data: any) => {
          this.message.create('success', 'Podaci ažurirani!');
        });
      this.matDialogRef.close();
    } else {
      this.message.create('error', 'Uneseni podaci nisu validni!');
    }
  }
  // format(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     // const regex = new RegExp('.*[#,$,%,&,_]+.*');
  //     const regex = new RegExp('1.*');
  //     const invalid = regex.test(control.value);
  //     return { format: { value: control.value } };
  //   };
  // }
  handleError(error: HttpErrorResponse, msg: string) {
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
