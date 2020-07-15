import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/order/';

  getWaiting() {
    return this.http.get(  this.api + 'getWaiting/' + localStorage.getItem('token'));
  }

  getSuccess() {
    return this.http.get(  this.api + 'getSuccess/' + localStorage.getItem('token'));
  }
  delete(id) {
    return this.http.delete(this.api + 'deleteOrder/'  + id + '/' + localStorage.getItem('token'));
  }

  post(
      user_id: string,
      address: string,
      products: any,   // Array
      quantity: any, // Array
      pay_type: string,
      general_sum: string
  ) {
    const order = {
      'user_id': user_id,
      'address': address,
      'products': products,
      'quantity': quantity,
      'pay_type': pay_type,
      'general_sum': general_sum
    };
    console.log(order);
    return this.http.post(this.api + localStorage.getItem('token'), order);

  }

  getOrder(id) {
    return this.http.get(this.api + 'getOrder/' + id + '/' + localStorage.getItem('token') );
  }

 update(
      id: string,
      user_id: string,
      address: string,
      products: string,   // Array
      quantity: string, // Array
      pay_type: string,
      general_sum: string

 ) {
  const Orders = new FormData();
        Orders.append('user_id', user_id);
        Orders.append('address', address);
        Orders.append('products', products);
        Orders.append('pay_type', pay_type);
        Orders.append('general_sum', general_sum);
  return this.http.patch(this.api + 'updateProduct/' + id + '/' + localStorage.getItem('token'), Orders);
 }

 updateStatus(id) {
  return this.http.patch(this.api + 'updateStatus/' + id + '/' + localStorage.getItem('token'), id);
 }


}
