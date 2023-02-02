import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environments';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private client: HttpClient) {}
  send(content: string, id: number): any {
    return this.client.post(
      `${environment.baseURL}${environment.messagesPath}`,
      {
        content: content,
        userId: id,
      }
    );
  }
}
