

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/shared/service/productsService';

@Component({
  selector: 'app-search-with-id',
  templateUrl: './search-with-id.component.html',
  styleUrls: ['./search-with-id.component.css']
})
export class SearchWithIDComponent implements OnInit {

  products = [];
  id;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.productService.getInIdNumber(this.id).subscribe(result => {
          this.products = result.json();
        });
      }
      else {
        this.id = null;
      }
    });

  }

}
