import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: Http) { }

  lang;
  url = url.url;
  api = this.url + '/api/category/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  getCategory(id) {
    return this.http.get(this.api + 'getCategory/' + id);
  }





}
