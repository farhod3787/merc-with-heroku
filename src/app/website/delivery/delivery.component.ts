import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/shared/service/basketService';
import { ProductService } from 'src/app/shared/service/productsService';
import { ConditionalExpr } from '@angular/compiler';
import { UsersService } from 'src/app/shared/service/usersService';
import { OrdersService } from 'src/app/shared/service/ordersService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  products = [];
  rates = [];
  delivery_text: any = 'Не выбрано';
  pay_type: any = 'Не выбрано';
  delivery = true;
  first_delivery = true;
  full_address: any;
  address = true;
  isUser = true;
  userId: any;
  body: any = {};
  generalSum: any = 0;
  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private userService: UsersService,
    private orderService: OrdersService,
    private router: Router
  ) {
    this.getProducts();
    this.verifyuser();
  }

  verifyuser() {
    this.userService.getVerify().subscribe( res => {
      this.body = res.json();
      if ( this.body.isUser ) {
        this.isUser = false;
        this.userId = this.body.userId;
      }
    });
  }
  getProducts() {
    const array = JSON.parse(localStorage.getItem('products'));
    this.rates = JSON.parse(localStorage.getItem('rate'));
    for ( let i = 0; i <= array.length - 1; i++) {
      this.productService.getProduct(array[i]).subscribe( res => {
        this.products[i] = res.json();
        // this.rates[i] = {
        //   'rate ': rate_array[i]
        // };
        // this.products.push(res.json());
        // for (let q = 0; q <= this.products[i].quantity; q++) {
        //   this.quantity[i][q] = q;
        // }
        // this.products.push(res.json());

      });
    }
    this.generalSum = localStorage.getItem('generalSum');
    console.log(this.generalSum);

  }

  createOrder() {
    const products = JSON.parse(localStorage.getItem('products'));
    const rates = JSON.parse(localStorage.getItem('rate'));
    const general_sum = this.basketService.general_sum;

    this.orderService.post(
        this.userId,
        this.full_address,
        products,
        rates,
        this.pay_type,
        general_sum
    ).subscribe( res => {
      if (res.ok) {
          for (let i = 0; i <= products.length - 1; i++) {
            this.productService.updateQuantity(products[i], rates[i]);
          }
          Swal.fire(
              'Good job!',
              'New Product Saved!',
              'success'
            );
          localStorage.removeItem('products');
          localStorage.removeItem('rate');
          localStorage.removeItem('generalSum');
          this.router.navigate(['/']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in Save New Product',
          timer: 3000
        });
      }
    });
  }



  select_delivery() {
    this.delivery = false;
    this.first_delivery = false;
    this.delivery_text = 'Доставка на дом или в офис';
    // this.full_address = 'Manzilni to`ldiring';
  }

  selected_delivery() {
    this.delivery = true;
    this.first_delivery = false;
    this.delivery_text = 'Самовывоз из Pick-up Point';
    this.full_address = 'Kompaniya manzili: Toshkent shaxar, Chilonzor tumani.'
  }

  click() {
    this.pay_type = 'Click';
  }
  payme() {
    this.pay_type = 'PayMe';
  }
  cash() {
    this.pay_type = 'Наличка';
  }

  confirm_address(province, region, street, number_home, floor, apartment) {
    this.full_address = province + ' ' + region + ' ' + street + ' ' + number_home + ' ' + floor + ' ' + apartment;
    this.address = false;
  }


  ngOnInit() {
  }

}
