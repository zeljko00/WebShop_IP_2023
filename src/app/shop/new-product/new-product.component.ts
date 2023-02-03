import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
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
import { environment } from 'src/app/config/environments';

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

  random: number = Math.random() * 1000000;
  url = `${environment.baseURL + environment.imagesPath}`;

  constructor(
    private service: ProductService,
    private message: NzMessageService,
    private client: HttpClient
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
    this.title.markAsTouched();
    this.contact.markAsTouched();
    this.price.markAsTouched();
    this.category.markAsTouched();
    this.location.markAsTouched();
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
        .addProduct(p, this.random)
        .pipe(
          catchError((error: any) =>
            this.handleError(error, 'Neuspješno dodavanje ponude!')
          )
        )
        .subscribe((data: any) => {
          console.log('id= ' + data.id);
          this.message.create('success', 'Ponuda uspješno kreirana!');
          //dodavanje atributa
          this.title.reset();
          this.category.reset();
          this.price.reset();
          this.desc.reset();
          this.location.reset();
          this.contact.reset();
          this.attrs = [];
          this.fileList = [];
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

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  previewImage: string | undefined = '';
  previewVisible = false;

  fileList: NzUploadFile[] = [];

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
  // addImage(item: NzUploadXHRArgs) {
  //   console.log(item);
  // }

  setMediaUploadHeaders = (file: NzUploadFile) => {
    return {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };
  };
  customUploadReq = (item: any) => {
    const formData = new FormData();
    formData.append('image', item.file as any); // tslint:disable-next-line:no-any
    formData.append('id', this.random.toString());
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress: true,
      withCredentials: false,
    });
    console.log(item);
    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
    return this.client.request(req).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total || 1 > 0) {
            (event as any).percent = (event.loaded / (event.total || 1)) * 100; // tslint:disable-next-line:no-any
          }
          // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
          item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) {
          /* success */
          item.onSuccess(event.body || '', item.file, event);
        }
      },
      (err: any) => {
        /* error */
        item.onError(err, item.file);
      }
    );
  };
}
