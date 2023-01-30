export class ActivationRequest {
  username: string = '';
  password: string = '';
  code: string = '';
  constructor(username: string, password: string, code: string) {
    this.username = username;
    this.password = password;
    this.code = code;
  }
}
