import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/model/Product';
import { ProductService } from '../product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

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
  pageSizeOptions = [2, 4, 10, 20, 40, 60, 80];
  showFirstLastButtons = true;
  products: Array<Product> = [];
  constructor(
    private message: NzMessageService,
    private service: ProductService
  ) {}

  handlePageEvent(event: PageEvent) {
    console.log(
      'from ' + this.length + ' ' + this.pageSize + ' ' + this.pageIndex
    );
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    console.log(
      'to ' + +this.length + ' ' + this.pageSize + ' ' + this.pageIndex
    );
    this.change();
  }
  ngOnInit(): void {
    const temp: Array<Product> = [];
    this.spinner = true;
    this.service
      .getProducts(this.pageIndex, this.pageSize)
      .pipe(
        catchError((error: any) =>
          this.handleError(error, 'Neuspješno dobavljanje podataka')
        )
      )
      .subscribe((data: any) => {
        console.log(
          'before ' + this.length + ' ' + this.pageSize + ' ' + this.pageIndex
        );
        this.spinner = false;
        if (data.totalElements === 0)
          this.message.create('info', 'Ne postoje takvi proizvodi!');
        // console.log(data);
        this.products = data.products;
        this.length = data.totalElements;
        console.log(
          'fter ' + this.length + ' ' + this.pageSize + ' ' + this.pageIndex
        );
      });
    this.products = temp;
  }
  handleError(error: HttpErrorResponse, msg: string) {
    console.log('erro handling');
    this.spinner = false;
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  change() {
    console.log(
      'data before fetch ' +
        this.length +
        ' ' +
        this.pageSize +
        ' ' +
        this.pageIndex
    );
    let searchVal = this.searchValue;
    let minVal = this.min;
    let maxVal = this.max;
    if (this.searchValue === '') searchVal = '-';
    if (this.min === null || this.min === '') minVal = '-1';
    if (this.max === null || this.max === '') maxVal = '-1';
    const temp: Array<Product> = [];
    this.service
      .getProductsFiltered(
        minVal,
        maxVal,
        this.used,
        this.category,
        searchVal,
        this.pageIndex,
        this.pageSize
      )
      .pipe(
        catchError((error: any) =>
          this.handleError(error, 'Neuspješno dobavljanje podataka')
        )
      )
      .subscribe((data: any) => {
        this.spinner = false;
        // console.log(data);
        if (data.totalElements === 0)
          this.message.create('info', 'Ne postoje takvi proizvodi!');
        this.products = data.products;
        this.length = data.totalElements;
        console.log(
          'after ' + this.length + ' ' + this.pageSize + ' ' + this.pageIndex
        );
      });
  }
  filter() {
    this.change();
    this.paginator.firstPage();
  }
  clearSearch() {
    this.searchValue = '';
    this.filter();
  }
}
