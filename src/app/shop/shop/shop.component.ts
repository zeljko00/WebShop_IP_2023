import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/model/Product';
import { ProductService } from '../product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  categories: Array<string> = [];

  return: boolean = false;

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

  data: any;
  constructor(
    private message: NzMessageService,
    private service: ProductService,
    private router: Router
  ) {
    if (router.getCurrentNavigation()!.extras.state) {
      console.log('returning');
      this.return = true;
      this.readFilters();
    }
  }

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
  ngAfterViewInit() {
    if (this.return) {
      console.log('after view');
      console.log(this.pageSize);
      console.log(this.pageIndex);
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.length;
      if (this.paginator.hasNextPage()) {
        this.paginator.nextPage();
        this.paginator.previousPage();
      } else if (this.paginator.hasPreviousPage()) {
        this.paginator.previousPage();
        this.paginator.nextPage();
      }
    }
  }
  ngOnInit(): void {
    const temp: Array<Product> = [];
    this.spinner = true;
    this.service
      .getCategories()
      .pipe(
        catchError((error: any) =>
          this.handleError(error, 'Neuspješno dobavljanje podataka')
        )
      )
      .subscribe((data: any) => {
        const temp: Array<string> = [];
        data.forEach((c: any) => {
          temp.push(c.name);
        });
        this.categories = temp;
      });
    if (this.return) {
      this.change();
    } else {
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
    }
    // this.products = temp;
  }
  handleError(error: HttpErrorResponse, msg: string) {
    console.log('erro handling');
    this.spinner = false;
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  readFilters() {
    if (sessionStorage.getItem('returnData')) {
      this.data = JSON.parse(sessionStorage.getItem('returnData') || '');

      let searchVal = this.data.searchValue;
      let minVal = this.data.min;
      let maxVal = this.data.max;
      if (this.searchValue === '-') searchVal = '';
      if (this.data.min === null || this.data.min === '-1') minVal = '';
      if (this.data.max === null || this.data.max === '-1') maxVal = '';
      this.min = minVal;
      this.max = maxVal;
      this.category = this.data.category;
      this.used = this.data.used;
      this.searchValue = searchVal;

      this.pageIndex = this.data.pageIndex;
      this.length = this.data.length;
      this.pageSize = this.data.pageSize;
    }
  }
  saveFilters() {
    //stavljamo u sesiju
    let searchVal = this.searchValue;
    let minVal = this.min;
    let maxVal = this.max;
    if (this.searchValue === '') searchVal = '-';
    if (this.min === null || this.min === '') minVal = '-1';
    if (this.max === null || this.max === '') maxVal = '-1';

    const obj = {
      min: minVal,
      max: maxVal,
      category: this.category,
      used: this.used,
      searchValue: searchVal,
      pageIndex: this.pageIndex,
      length: this.length,
      pageSize: this.pageSize,
    };
    console.log(obj);
    if (this.return === false) {
      sessionStorage.setItem('returnData', JSON.stringify(obj));
    }
  }
  change() {
    let searchVal = this.searchValue;
    let minVal = this.min;
    let maxVal = this.max;
    if (this.searchValue === '') searchVal = '-';
    if (this.min === null || this.min === '') minVal = '-1';
    if (this.max === null || this.max === '') maxVal = '-1';

    this.saveFilters();
    console.log(
      'data before fetch ' +
        this.length +
        ' ' +
        this.pageSize +
        ' ' +
        this.pageIndex
    );
    console.log('filtering by title ' + searchVal);
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
