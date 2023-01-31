import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private client: HttpClient) {}
  getProducts(): any {
    return this.client.get(`${environment.baseURL}${environment.productsPath}`);
  }
  getProductsFiltered(
    p1: string,
    p2: string,
    sold: string,
    category: string,
    title: string
  ): any {
    return this.client.get(
      `${environment.baseURL}${environment.productsPath}` +
        '/' +
        p1 +
        '/' +
        p2 +
        '/' +
        sold +
        '/' +
        title +
        '/' +
        category
    );
  }
}
