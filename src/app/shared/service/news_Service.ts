import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class News_Service {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/news/';

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
      image: File
  ) {
    const News = new FormData();
    News.append('name_uz', name_uz);
    News.append('name_ru', name_ru);
    News.append('description_uz', description_uz);
    News.append('description_ru', description_ru);
    News.append('image', image);
    // return this.http.post(this.api + localStorage.getItem('token'), Product);
    return this.http.post(this.api + 'create/' + localStorage.getItem('token'), News);

  }

  getNews(id) {
    return this.http.get(this.api + 'getNews/' + id );
  }

  getLimit() {
    return this.http.get( this.api + 'getLimit');
  }

 update(
    id: string,
    name_uz: string,
    name_ru: string,
    description_uz: string,
    description_ru: string,
    image: File,
  ) {
    const News = new FormData();
    News.append('name_uz', name_uz);
    News.append('name_ru', name_ru);
    News.append('description_uz', description_uz);
    News.append('description_ru', description_ru);
    News.append('image', image);
    return this.http.patch(this.api + 'updateNews/' + id + '/' + localStorage.getItem('token'), News);
 }

 updateRating(id) {
   return this.http.get(this.api + 'updateRaiting/' + id);
 }


}
