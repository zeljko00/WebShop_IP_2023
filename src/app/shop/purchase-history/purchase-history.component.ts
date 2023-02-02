import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { Purchase } from 'src/app/model/Purchase';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
})
export class PurchaseHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'date',
    'product',
    'category',
    'payment',
    'price',
  ];
  dataSource: Array<Purchase> = [];
  constructor(
    private service: PurchaseService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    const id: number = JSON.parse(sessionStorage.getItem('user') || '').id;
    const temp: Array<Purchase> = [];
    this.service
      .getAll(id)
      .pipe(
        catchError((error: any) =>
          this.handleError(error, 'Neuspješno dobavljanje podataka!')
        )
      )
      .subscribe((data: Array<Purchase>) => {
        const temp: Array<Purchase> = data;
        let counter = 1;
        temp.forEach((p) => {
          p.position = counter++;
        });
        this.dataSource = temp;
      });
  }
  handleError(error: HttpErrorResponse, msg: string) {
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  getTotalCost() {
    return this.dataSource
      .map((t) => t.productDTO.price)
      .reduce((acc, value) => acc + value, 0);
  }
}
