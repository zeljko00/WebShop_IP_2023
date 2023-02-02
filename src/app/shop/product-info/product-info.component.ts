import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { environment } from 'src/app/config/environments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit {
  @Input() product: any;
  images: Array<string> = [];
  state: string = 'KORIŠTENO';
  noImage: boolean = false;
  constructor(private router: Router) {
    if (this.router.getCurrentNavigation()!.extras.state) {
      console.log(this.router.getCurrentNavigation()!.extras.state);
      this.product = this.router.getCurrentNavigation()!.extras.state;
      if (this.product.unused) this.state = 'NOVO';
    } else router.navigate(['shop']);
  }
  ngOnInit() {
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
}
