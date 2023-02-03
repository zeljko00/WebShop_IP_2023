import { SpecAttribute } from './SpecAttribute';

export class Category {
  id: number = -1;
  name: string = 'kategorija';
  specificAttributes: Array<SpecAttribute> = [];
}
