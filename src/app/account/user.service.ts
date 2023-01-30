import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/LoginRequest';
import { environment } from '../config/environments';
import { User } from '../model/User';
import { ActivationRequest } from '../model/ActivationRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private configuration: any = '../../assets/config.json';
  constructor(private client: HttpClient) {}

  login(request: LoginRequest): any {
    return this.client.post(
      `${environment.baseURL}${environment.usersPath}/login`,
      request
    );
  }
  register(request: User): any {
    return this.client.post(
      `${environment.baseURL}${environment.usersPath}/register`,
      request
    );
  }
  activate(request: ActivationRequest): any {
    return this.client.post(
      `${environment.baseURL}${environment.usersPath}/activate`,
      request
    );
  }
  checkActivated(id: number): any {
    return this.client.get(
      `${environment.baseURL}${environment.usersPath}/activated/` + id
    );
  }
  checkBlocked(id: number): any {
    return this.client.get(
      `${environment.baseURL}${environment.usersPath}/blocked/` + id
    );
  }
}
