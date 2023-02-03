import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';
import { Attribute } from 'src/app/model/Attribute';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { SpecAttribute } from 'src/app/model/SpecAttribute';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  categories: Array<Category> = [];

  title = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  contact = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  desc = new FormControl('');
  price = new FormControl('', [Validators.required, this.priceValidator()]);
  constructor(
    private service: ProductService,
    private message: NzMessageService
  ) {}
  state: boolean = true;
  attrs: Array<Attribute> = [];
  ngOnInit(): void {
    this.service.getCategories().subscribe((data: Array<Category>) => {
      console.log(data);
      this.categories = data;
    });
  }
  submit() {
    if (
      this.title.valid &&
      this.price.valid &&
      this.category.valid &&
      this.contact.valid &&
      this.location.valid
    ) {
      const p = new Product();
      p.category = this.category.value || '';
      p.location = this.location.value || '';
      p.price = Number.parseFloat(this.price.value || '');
      p.title = this.title.value || '';
      p.contact = this.contact.value || '';
      p.unused = this.state;
      p.description = this.desc.value || '';
      p.seller.id = JSON.parse(sessionStorage.getItem('user') || '').id;
      p.attributes = this.attrs;
      p.id = null;
      console.log(p);
      this.service
        .addProduct(p)
        .pipe(
          catchError((error: any) =>
            this.handleError(error, 'Neuspješno dodavanje ponude!')
          )
        )
        .subscribe((data: any) => {
          console.log('id= ' + data.id);
          this.message.create('success', 'Ponuda uspješno kreirana!');
          //dodavanje atributa
        });
    }
  }
  categoryChange() {
    console.log(this.category.value);
    this.categories.forEach((c) => {
      if (c.name === (this.category.value || 1)) {
        const temp: Array<Attribute> = [];
        c.specificAttributes.forEach((a) => {
          const attr: Attribute = new Attribute();
          attr.name = a.name;
          temp.push(attr);
        });
        this.attrs = temp;
        console.log(this.attrs);
      }
    });
  }
  selectedNew() {
    this.state = true;
  }
  selectedUsed() {
    this.state = false;
  }
  priceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const num = Number.parseFloat(control.value);
      if (isNaN(num)) {
        console.log('invalid');
        return { format: { value: control.value } };
      } else {
        console.log('invalid');
        return null;
      }
    };
  }
  handleError(error: HttpErrorResponse, msg: string) {
    this.message.create('error', msg);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
