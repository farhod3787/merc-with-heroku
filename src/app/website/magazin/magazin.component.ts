import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ProductService } from 'src/app/shared/service/productsService';
import { BasketService } from 'src/app/shared/service/basketService';
import { NavbarComponent } from '../navbar/navbar.component';

declare var $: any;
@Component({
  selector: 'app-magazin',
  templateUrl: './magazin.component.html',
  styleUrls: ['./magazin.component.css']
})
export class MagazinComponent implements OnInit {

  i: any;
  products = [] ;
  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private navbarComponent: NavbarComponent
  ) {
    this.getProducts();
  }

  getProducts() {
      this.productService.getForMagazine().subscribe( res =>{
          this.products = res.json();
      });
  }

  ngOnInit() {

    $(document).ready(function(){
      $('#owl-1 .owl-carousel').owlCarousel(
      {
        responsive: {
          0: {
            items: 1
          },
          450: {
            items: 2
          },
          700: {
            items: 3
          },
          868: {
            items: 3
          } ,
          992: {
            items: 5
          }
        },
        margin: 5,
        loop: true,
        stagePadding: 10,
        nav: true,
    // navText: ['Back','Next'],
    navText: ['', ''],
    // navText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
    // dots: false,
    // dotsEach: true,
    // lazyLoad: false,
    // autoplay: true,
    // autoplaySpeed: 500,
    // navSpeed: 500,
    // autoplayTimeout: 2000,
    // autoplayHoverPause: true,
  }
  );
    });

  }


  add(id) {
    this.i = this.basketService.i;
    console.log('AAAA' + this.i);
    this.basketService.products[this.i] = id;
    localStorage.setItem('products', JSON.stringify(this.basketService.products));
    this.basketService.i++;
    this.navbarComponent.updateRate(1);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }




}
