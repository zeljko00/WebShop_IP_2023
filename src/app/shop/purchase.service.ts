import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environments';
@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private client: HttpClient) {}

  getAll(id: number): any {
    return this.client.get(
      `${environment.baseURL}${environment.purchasesPath}/buyer/` + id
    );
  }
}
