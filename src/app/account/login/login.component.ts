import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { UserService } from '../user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivationDialogComponent } from '../activation-dialog/activation-dialog.component';
import { ActivationRequest } from 'src/app/model/ActivationRequest';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  public spinner: boolean = false;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 40;
  constructor(
    private fb: UntypedFormBuilder,
    private service: UserService,
    private message: NzMessageService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
    sessionStorage.setItem('guest', 'true');
  }
  handleError(error: HttpErrorResponse, msg: string) {
    console.log('erro handling');
    this.spinner = false;
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  openDialog(): void {
    const dialogRef: any = this.dialog.open(ActivationDialogComponent, {
      width: '370px',
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      const request = new ActivationRequest(
        this.validateForm.value.userName,
        this.validateForm.value.password,
        result
      );
      this.service
        .activate(request)
        .pipe(
          catchError((error: any) =>
            this.handleError(error, 'Nevalidan kod za aktivaciju!')
          )
        )
        .subscribe((data: any) => {
          this.submitForm();
        });
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      let request: LoginRequest = new LoginRequest();
      request.password = this.validateForm.value.password;
      request.username = this.validateForm.value.userName;
      this.spinner = true;
      this.service
        .login(request)
        .pipe(
          catchError((error: any) =>
            this.handleError(error, 'Nevalidni kredencijali!')
          )
        )
        .subscribe((data: User) => {
          this.spinner = false;
          console.log(data);
          this.service.checkBlocked(data.id).subscribe((flag: boolean) => {
            if (flag) {
              this.message.create('error', 'Nevalidni kredencijali!');
            } else {
              this.service
                .checkActivated(data.id)
                .subscribe((activatd: boolean) => {
                  console.log(activatd);
                  if (activatd) {
                    sessionStorage.clear();
                    sessionStorage.setItem('guest', 'false');
                    sessionStorage.setItem('user', JSON.stringify(data));
                    this.message.create(
                      'success',
                      'Uspješno ste se prijavili na svoj nalog!'
                    );
                    this.router.navigate(['/shop']);
                  } else {
                    this.message.create('info', 'Morate aktivirati Vaš nalog!');
                    this.openDialog();
                  }
                });
            }
          });
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
