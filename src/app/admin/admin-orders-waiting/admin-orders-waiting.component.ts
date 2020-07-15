import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';
import Swal from 'sweetalert2';
import { OrdersService } from 'src/app/shared/service/ordersService';

@Component({
  selector: 'app-admin-orders-waiting',
  templateUrl: './admin-orders-waiting.component.html',
  styleUrls: ['./admin-orders-waiting.component.css']
})
export class AdminOrdersWaitingComponent implements OnInit {


  displayedColumns: string[] = ['id', 'products', 'quantity', 'user_id', 'address', 'date', 'pay_type',
                                'general_sum', 'status', 'accept', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  isLoad = true;
  products: any = [];

  constructor(
    private ordersService: OrdersService,
    private productService: ProductService
  ) {
    this.getOrders();
   }

   getOrders() {
    this.ordersService.getWaiting().subscribe( res => {
      this.products = res.json();
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoad = false;
    });
   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(id) {
    this.ordersService.delete(id).subscribe( res => {
      const obj = res.json();
      if ( obj.message ) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Maxsulot o`chirilmadi ',
            timer: 3000
          });
        }
      this.getOrders();
    });
  }

  accept(id) {
    this.ordersService.updateStatus(id).subscribe( res => {
      console.log(res);
      if (res.ok) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        );
        this.getOrders();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Maxsulot qabul qilinmadi ',
          timer: 3000
        });
      }
    });
  }


  ngOnInit() {
  }

}
