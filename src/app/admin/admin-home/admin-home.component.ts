import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/service/ordersService';
import { ProductService } from 'src/app/shared/service/productsService';
import { UsersService } from 'src/app/shared/service/usersService';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  ordersWaiting: any;
  ordersSuccess: any;
  products: any;
  users: any;
  constructor(
    private ordersService: OrdersService,
    private productService: ProductService,
    private userService: UsersService
  ) {
    this.getOrders();
    this.getProducts();
    this.getusers();
  }

  getProducts() {
    this.productService.getAll().subscribe(res => {
      this.products = res.json().length;
    });
  }

  getusers() {
    this.userService.getAll().subscribe( res => {
      this.users = res.json().length;
    });
  }

  getOrders() {
    this.ordersService.getSuccess().subscribe( res => {
      this.ordersSuccess = res.json().length;
    });
    this.ordersService.getWaiting().subscribe( res => {
      this.ordersWaiting = res.json().length;
    });
  }

  ngOnInit() {
  }

}
