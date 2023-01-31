import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/model/Product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public spinner: boolean = false;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 40;

  public searchValue: string = '';
  public min: string = '';
  public max: string = '';
  public category: string = '-';
  public used: string = '-';

  length = 500;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20, 40, 60, 80];
  showFirstLastButtons = true;
  products: Array<Product> = [];
  constructor(
    // private message: NzMessageService,
    private service: ProductService
  ) {}

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  ngOnInit(): void {
    const temp: Array<Product> = [];
    this.spinner = true;
    this.service
      .getProducts()
      .pipe(
        catchError((error: any) =>
          this.handleError(error, 'Neuspješno dobavljanje podataka')
        )
      )
      .subscribe((data: Array<Product>) => {
        this.spinner = false;
        console.log(data);
        this.products = data;
      });
    this.products = temp;
  }
  handleError(error: HttpErrorResponse, msg: string) {
    console.log('erro handling');
    this.spinner = false;
    // this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  change() {
    let searchVal = this.searchValue;
    let minVal = this.min;
    let maxVal = this.max;
    if (this.searchValue === '') searchVal = '-';
    if (this.min === null || this.min === '') minVal = '-1';
    if (this.max === null || this.max === '') maxVal = '-1';
    console.log(this.searchValue);
    console.log(this.category);
    console.log(this.used);
    console.log(this.min);
    console.log(this.max);
    const temp: Array<Product> = [];
    this.service
      .getProductsFiltered(minVal, maxVal, this.used, this.category, searchVal)
      .pipe(
        catchError((error: any) =>
          this.handleError(error, 'Neuspješno dobavljanje podataka')
        )
      )
      .subscribe((data: Array<Product>) => {
        this.spinner = false;
        console.log(data);
        this.products = data;
      });
    this.products = temp;
  }
  clearSearch() {
    this.searchValue = '';
    this.change();
  }
}
