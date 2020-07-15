import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/shared/service/productsService';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from 'src/app/shared/service/basketService';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent implements OnInit {

  id: any;
  i: any;
  product: any = {};
  quantity = [];

  general_sum: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private basketService: BasketService,
    private navbarComponent: NavbarComponent
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.id = paramMap.get('id');
      this.productService.getProduct(this.id).subscribe( result => {
          this.product = result.json();
          for (let i = 0; i <= this.product.quantity; i ++) {
            this.quantity[i] = i;
          }
      });
    } else {
      this.id = null;
    }

  });


    $(document).ready(function(){
      $('#owl-1 .owl-carousel').owlCarousel(
      {
        responsive:{
          0:{
            items:1
          },
          450:{
            items:2
          },
          700:{
            items:3
          },
          868:{
            items:3
          } ,
          992:{
            items:5
          }
        },
        margin: 5,
        loop: true,
        stagePadding:10,
        nav: true,
    // navText: ['Back','Next'],
    navText: ['',''],
    // navText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
  }
  );
    });


    function init() {
        document.getElementById("clickMe1").addEventListener("click", function() {
        document.getElementById("bikini-display1").style.display = "block";
        document.getElementById("bikini-display3").style.display = "none";
        document.getElementById("bikini-display4").style.display = "none";
        document.getElementById("bikini-display2").style.display = "none";
      });

      document.getElementById("clickMe2").addEventListener("click", function() {
        document.getElementById("bikini-display2").style.display ="block";
        document.getElementById("bikini-display1").style.display ="none";
        document.getElementById("bikini-display3").style.display ="none";
        document.getElementById("bikini-display4").style.display ="none";

      });

      document.getElementById("clickMe3").addEventListener("click", function() {
        document.getElementById("bikini-display3").style.display ="block";
        document.getElementById("bikini-display1").style.display ="none";
        document.getElementById("bikini-display4").style.display ="none";
        document.getElementById("bikini-display2").style.display ="none";
      });

      document.getElementById("clickMe4").addEventListener("click", function() {
        document.getElementById("bikini-display4").style.display ="block";
        document.getElementById("bikini-display1").style.display ="none";
        document.getElementById("bikini-display3").style.display ="none";
        document.getElementById("bikini-display2").style.display ="none";
      });
    }
    init();

    $(".bikini-thumbnail img").click(function() {
      //Remove the my-list--selected class from any elements that already have it
      $('.thumbnail-clicked').removeClass('thumbnail-clicked');
      //Add the .border-bottom class back to any element that is missing it
      $('.thumbnail-clicked').addClass('bikini-thumbnails');
      //Add the my-list--selected class to the clicked element
      $(this).addClass('thumbnail-clicked');
      //Remove the border-bottom class from the clicked element
      $(this).find('.bikini-thumbnails').removeClass('bikini-thumbnails');
      });
  }

  addBasket(id) {
    this.i = this.basketService.i;
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

  buy(id) {
    this.basketService.products[this.i] = id;
    localStorage.setItem('products', JSON.stringify(this.basketService.products));
    this.basketService.i++;
    this.router.navigate(['shopping-card']);
  }

  select(rate, price) {
    this.i = this.basketService.q;
    this.basketService.rates[this.i] = rate;
    localStorage.setItem('rate', JSON.stringify(this.basketService.rates));
    this.basketService.q++;
    const money = rate * price;
    this.basketService.temporary = money;
    this.basketService.general_sum = this.basketService.general_sum + this.basketService.temporary;
    this.general_sum = this.basketService.general_sum ;
  }

}
