import { Product } from './Product';

export class Purchase {
  time: string = '';
  productDTO: Product = new Product();
  payment: string = '';
  position: number = 0;
}
