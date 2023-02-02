import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { environment } from 'src/app/config/environments';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSupportComponent } from '../customer-support/customer-support.component';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { PersonalInfoSettingsComponent } from '../personal-info-settings/personal-info-settings.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  flag: boolean = true;
  user: User = new User();
  hasAvatar: boolean = false;
  avatar: string = '';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: MessageService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '');
    if (this.user.avatar && this.user.avatar !== '') {
      this.hasAvatar = true;
      this.avatar =
        environment.baseURL + environment.avatarsPath + '/' + this.user.avatar;
    }
    console.log(this.hasAvatar + ' ' + this.avatar);
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  contactSupport() {
    const dialogRef: any = this.dialog.open(CustomerSupportComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);
      if (result && result !== '')
        this.service
          .send(result, JSON.parse(sessionStorage.getItem('user') || '').id)
          .pipe(
            catchError((error: any) =>
              this.handleError(error, 'Neuspješno slanje!')
            )
          )
          .subscribe((data: any) => {
            this.message.create('success', 'Poruka je poslata!');
          });
    });
  }
  changePersonalInfo() {
    const dialogRef: any = this.dialog.open(PersonalInfoSettingsComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);
    });
  }
  handleError(error: HttpErrorResponse, msg: string) {
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
