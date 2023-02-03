import { Product } from './Product';

export class Purchase {
  time: string = '';
  productId: number | null = 0;
  productTitle: string = '';
  productCategory: string = '';
  productPrice: number = 0;
  payment: string = '';
  position: number = 0;
}
