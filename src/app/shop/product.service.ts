import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environments';
import { Comment } from '../model/Comment';
import { Product } from '../model/Product';

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
  buy(
    productId: number,
    productTitle: string,
    productPrice: number,
    productCategory: string,
    user: number,
    payment: string
  ): any {
    return this.client.post(
      `${environment.baseURL}${environment.purchasesPath}`,
      {
        payment: payment,
        userID: user,
        productTitle: productTitle,
        productCategory: productCategory,
        productPrice: productPrice,
        productId: productId,
      }
    );
  }
  comment(comment: Comment) {
    return this.client.post(
      `${environment.baseURL}${environment.commentsPath}`,
      comment
    );
  }
  addProduct(product: Product, rand: number) {
    return this.client.post(
      `${environment.baseURL}${environment.productsPath}/` + rand,
      product
    );
  }
  delete(product: number, seller: number) {
    return this.client.delete(
      `${environment.baseURL}${environment.productsPath}/` +
        seller +
        '/' +
        product
    );
  }
}
