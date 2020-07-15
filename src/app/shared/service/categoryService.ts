import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/category/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
    name_uz: string,
    name_ru: string
  ) {
    const body = {
      'name_uz': name_uz,
      'name_ru': name_ru
    };
    return this.http.post(this.api + localStorage.getItem('token'), body);
  }

  getCategory(id) {
    return this.http.get(this.api + 'getCategory/' + id);
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



}
