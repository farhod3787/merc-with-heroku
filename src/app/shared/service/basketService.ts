import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
    providedIn: 'root'
  })
  export class BasketService {

    i: any = 0;     //products uchun
    q: any = 0;      //rate uchun
    products = [];
    rates = []; // Soni
    general_sum: any = 0;
    temporary: any;

    constructor(private http: Http) {

    }



}
