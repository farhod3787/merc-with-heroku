import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/sub-category/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  getSelected(id) {
    return this.http.get( this.api + 'getSelected/' + id);
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
    name_uz: string,
    name_ru: string,
    category_id: string
  ) {
    const body = {
          'name_uz': name_uz,
          'name_ru': name_ru,
          'category_id': category_id
    };
    return this.http.post(this.api + localStorage.getItem('token'), body);
  }

  getCategory(id) {
    return this.http.get(this.api + 'getSubCategory/' + id);
  }

  update(
    id: string,
    name_uz: string,
    name_ru: string,
    category_id: string
  ) {
    const body = {
      'name_uz': name_uz,
      'name_ru': name_ru,
      'category_id': category_id

    };

    return this.http.patch(this.api + 'updateSubCategory/' + id + '/' + localStorage.getItem('token'), body);
  }



}
