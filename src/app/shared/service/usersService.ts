import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // tslint:disable-next-line: deprecation
  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/users/';

  getAll() {
    return this.http.get(this.api);
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
    f_name: string,
    m_name: string,
    email: string,
    address: string,
    phone: string,
    login: string,
    password: string
  ) {
    const body = {
      'f_name' : f_name,
      'm_name':  m_name,
      'email' : email,
      'address' : address,
      'phone' : phone,
      'login' : login ,
      'password' : password
    };
    return this.http.post(this.api, body);
  }             // keyinroq

  sign(login, password) {
    const body = {
      'login' : login,
      'password': password
    } ;
    return this.http.post(this.api + 'sign', body );
  }

  getUser(id) {
    return this.http.get(this.api + id);
  }

  update(
    id: string,
    name_uz: string,
    name_ru: string
  ) {
    const body = {
      'name_uz': name_uz,
      'name_ru': name_ru
    };

    return this.http.patch(this.api + 'updateCategory/' + id + '/' + localStorage.getItem('token'), body);
  }

  getVerify() {
    return this.http.get(this.api + 'verifyUser/' + localStorage.getItem('token'));
  }



}
