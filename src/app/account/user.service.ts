import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/LoginRequest';
import { environment } from '../config/environments';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private configuration: any = '../../assets/config.json';
  constructor(private client: HttpClient) {}

  login(request: LoginRequest) {
    this.client
      .post(`${environment.baseURL}${environment.usersPath}/login`, request)
      .subscribe((data) => {
        console.log(data);
      });
  }
  register(request: User) {
    this.client
      .post(`${environment.baseURL}${environment.usersPath}/register`, request)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
