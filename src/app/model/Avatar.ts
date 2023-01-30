import { environment } from '../config/environments';
export class Avatar {
  public value: string = '';
  public path: string = '';

  constructor(avatar: string) {
    this.value = avatar;
    this.path =
      `${environment.baseURL}${environment.avatarsPath}` + '/' + avatar;
  }
}
