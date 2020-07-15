
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/admin/';

  getAll() {
    return this.http.get(  this.api + 'getall');
  }

  sign(body) {
    return this.http.post( this.api + 'sign', body);
  }

  delete(id) {
    return this.http.delete(this.api, id + localStorage.getItem('token'));
  }

  verify() {
    return this.http.get(this.api + 'verifyAdmin/' +  localStorage.getItem('token'));
  }


  postLogin(body) {
    return this.http.post(this.url + '/api/users/sign', body)
  }

  get() {
    return this.http.get(this.url + '/api/users/verifyUser/' + localStorage.getItem('token'));
  }


  getPerson() {
    return this.http.get(this.url + '/api/person/verifyPerson/' + localStorage.getItem('token'));
  }



}
