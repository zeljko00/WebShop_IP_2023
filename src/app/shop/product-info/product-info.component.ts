import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { environment } from 'src/app/config/environments';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BuyingModalComponent } from '../buying-modal/buying-modal.component';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit {
  @Input() product: any;
  images: Array<string> = [];
  state: string = 'KORIŠTENO';
  sold: string = 'NA STANJU';
  noImage: boolean = false;
  guest: boolean = true;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: ProductService,
    private message: NzMessageService
  ) {
    if (this.router.getCurrentNavigation()!.extras.state) {
      console.log(this.router.getCurrentNavigation()!.extras.state);
      this.product = this.router.getCurrentNavigation()!.extras.state;
      if (this.product.unused) this.state = 'NOVO';
      if (this.product.sold) this.sold = 'PRODATO';
    } else router.navigate(['shop']);
  }
  ngOnInit() {
    if (
      sessionStorage.getItem('guest') &&
      sessionStorage.getItem('guest') === 'false'
    )
      this.guest = false;
    const temp: Array<string> = [];
    if (this.product.images.length === 0) this.noImage = true;
    this.product.images.forEach((i: any) => {
      console.log(environment.baseURL + environment.imagesPath + '/' + i.id);
      temp.push(environment.baseURL + environment.imagesPath + '/' + i.id);
    });
    this.images = temp;
  }
  home() {
    this.router.navigate(['shop'], { state: { return: true } });
  }
  buy() {
    const dialogRef: any = this.dialog.open(BuyingModalComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);

      this.service
        .buy(
          this.product.id,
          JSON.parse(sessionStorage.getItem('user') || '').id,
          result
        )
        .pipe(
          catchError((error: any) =>
            this.handleError(error, 'Neuspješna kupovina!')
          )
        )
        .subscribe((data: any) => {
          this.message.create('success', 'Uspješna kupovina!');
          this.sold = 'PRODATO';
          this.product.sold = true;
        });
    });
  }
  handleError(error: HttpErrorResponse, msg: string) {
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
