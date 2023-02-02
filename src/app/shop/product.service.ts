import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environments';
import { Comment } from '../model/Comment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private client: HttpClient) {}
  getCategories(): any {
    return this.client.get(
      `${environment.baseURL}${environment.categoriesPath}`
    );
  }
  getProducts(index: number, size: number): any {
    console.log('fetching');
    return this.client.get(
      `${environment.baseURL}${environment.productsPath}` +
        '?pageNo=' +
        index +
        '&pageSize=' +
        size
    );
  }
  getProductsFiltered(
    p1: string,
    p2: string,
    sold: string,
    category: string,
    title: string,
    index: number,
    size: number
  ): any {
    console.log('fetching filtered');
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
        category +
        '?pageNo=' +
        index +
        '&pageSize=' +
        size
    );
  }
  getProductsBySeller(index: number, size: number, id: number): any {
    console.log('fetching by id=' + id);
    return this.client.get(
      `${environment.baseURL}${environment.productsPath}` +
        '/seller/' +
        id +
        '?pageNo=' +
        index +
        '&pageSize=' +
        size
    );
  }
  getProductsFilteredBySeller(
    p1: string,
    p2: string,
    sold: string,
    category: string,
    title: string,
    index: number,
    size: number,
    id: number
  ): any {
    console.log('fetching filtered by id=' + id);
    return this.client.get(
      `${environment.baseURL}${environment.productsPath}` +
        '/seller/' +
        p1 +
        '/' +
        p2 +
        '/' +
        sold +
        '/' +
        title +
        '/' +
        category +
        '/' +
        id +
        '?pageNo=' +
        index +
        '&pageSize=' +
        size
    );
  }
  buy(product: number, user: number, payment: string): any {
    return this.client.post(
      `${environment.baseURL}${environment.purchasesPath}`,
      { payment: payment, userID: user, productDTO: { id: product } }
    );
  }
  comment(comment: Comment) {
    return this.client.post(
      `${environment.baseURL}${environment.commentsPath}`,
      comment
    );
  }
}
