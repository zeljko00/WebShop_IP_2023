import { Comment } from './Comment';
import { Attribute } from './Attribute';
import { Image } from './Image';
import { Seller } from './Seller';
export class Product {
  id: number = -1;
  title: string = '';
  description: string = '';
  price: number = -1;
  location: string = '';
  unused: boolean = false;
  sold: boolean = false;
  seller: Seller = new Seller();
  category: string = '';
  contact: string = '';
  comments: Array<Comment> = [];
  attributes: Array<Attribute> = [];
  images: Array<Image> = [];
}
