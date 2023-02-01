import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { User } from 'src/app/model/User';
import { environment } from '../../config/environments';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('product') product: Product = new Product();
  public cardClass: string = '';
  public my: boolean = false;
  public state: string = 'POLOVNO';
  public image: string = '';
  ngOnInit() {
    if (sessionStorage.getItem('user')) {
      const user: User = JSON.parse(sessionStorage.getItem('user') || '');
      this.my = user.id === this.product.seller.id;
    }
    if (this.product.images)
      this.image =
        environment.baseURL +
        environment.imagesPath +
        '/' +
        this.product.images.at(0)?.id;
    this.cardClass = this.my ? 'my-card' : this.product.sold ? 'sold-card' : '';
  }
}
