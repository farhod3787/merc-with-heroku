import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/contact/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  getContact(id) {
    return this.http.get( this.api + 'getContact/' + id);
  }

  post(
    name: string,
    email: string,
    number: string,
    message: string
  ) {
    const body = {
                  'name': name,
                  'email': email,
                  'number': number,
                  'message' : message
    };
    return this.http.post(this.api, body);
  }

  callback(
    name: string,
    number: string,
    message: string
  ) {
    const body = {
                  'name': name,
                  'number': number,
                  'message' : message
    };
    return this.http.post(this.api + '/call-back', body);
  }

  getCategory(id) {
    return this.http.get(this.api + 'getSubCategory/' + id + '/' + localStorage.getItem('token'));
  }

  delete(id) {
    return this.http.delete(this.api + 'deleteContact/' + id + '/' + localStorage.getItem('token'));
  }


}
