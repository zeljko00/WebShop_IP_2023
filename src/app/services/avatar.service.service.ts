import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environments';
import { Avatar } from '../model/Avatar';

@Injectable({
  providedIn: 'root',
})
export class AvatarServiceService {
  private configuration: any = '../../assets/config.json';
  constructor(private client: HttpClient) {}

  getAllAvatars(): any {
    return this.client.get(`${environment.baseURL}${environment.avatarsPath}`);
  }
  mapAvatars(data: Array<string>): Array<Avatar> {
    let result: Array<Avatar> = [];
    data.forEach((element) => {
      result.push(new Avatar(element));
    });
    console.log(result);
    return result;
  }
}
