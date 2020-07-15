import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/products/';

  getAll() {
    return this.http.get(  this.api + 'getall');
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
      name_uz: string,
      name_ru: string,
      description_uz: string,
      description_ru: string,
      id_number: string,
      image: File,
      category_id: string,
      subcategory_id: string,
      quantity: string,
      brand: string,
      model: string,
      configuration: string,
      price: string,
      sale: string,
      rating: string
  ) {
    const Product = new FormData();
    Product.append('name_uz', name_uz);
    Product.append('name_ru', name_ru);
    Product.append('description_uz', description_uz);
    Product.append('description_ru', description_ru);
    Product.append('id_number', id_number);
    Product.append('category_id', category_id);
    Product.append('subcategory_id', subcategory_id);
    Product.append('image', image);
    Product.append('quantity', quantity);
    Product.append('brand', brand);
    Product.append('model', model);
    Product.append('configuration', configuration);
    Product.append('price', price);
    Product.append('sale', sale);
    Product.append('rating', rating);
    // return this.http.post(this.api + localStorage.getItem('token'), Product);
    return this.http.post(this.api + 'create/' + localStorage.getItem('token'), Product);

  }

  getProduct(id) {
    return this.http.get(this.api + 'getProduct/' + id );
  }

  getSelected(cat_id, subcat_id) {
      return this.http.get(this.api + 'getSelected/' + cat_id + '/' + subcat_id);
  }

  getForMagazine() {
    return this.http.get(this.api + 'getForMagazine');
  }

  getForCategory(id) {
    return this.http.get(this.api + 'getForCategory/' + id);
  }

  getInIdNumber(id) {
    return this.http.get( this.api + 'getInIdNumber/' + id);
  }

 update(
    id: string,
    name_uz: string,
    name_ru: string,
    description_uz: string,
    description_ru: string,
    id_number: string,
    image: File,
    category_id: string,
    subcategory_id: string,
    quantity: string,
    brand: string,
    model: string,
    configuration: string,
    price: string,
    sale: string,
    rating: string

 ) {
  const Product = new FormData();
  Product.append('name_uz', name_uz);
  Product.append('name_ru', name_ru);
  Product.append('description_uz', description_uz);
  Product.append('description_ru', description_ru);
  Product.append('id_number', id_number);
  Product.append('category_id', category_id);
  Product.append('subcategory_id', subcategory_id);
  Product.append('image', image);
  Product.append('quantity', quantity);
  Product.append('brand', brand);
  Product.append('model', model);
  Product.append('configuration', configuration);
  Product.append('price', price);
  Product.append('sale', sale);
  Product.append('rating', rating);
  return this.http.patch(this.api + 'updateProduct/' + id + '/' + localStorage.getItem('token'), Product);
 }

  updateQuantity(id, rate) {
    var body = {
      'quantity' : rate
    };
    return this.http.patch(this.api + 'updateQuanity/' + id, body);
  }

}
