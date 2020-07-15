import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class VideoNewsService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/video-news/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
    url: string
  ) {
    const body = {
      'url': url
    };
    return this.http.post(this.api + 'create/' + localStorage.getItem('token'), body);
  }

  getLimit() {
    return this.http.get(this.api + 'getLimit');
  }


}
