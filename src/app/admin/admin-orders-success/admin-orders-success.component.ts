import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';
import Swal from 'sweetalert2';
import { OrdersService } from 'src/app/shared/service/ordersService';
@Component({
  selector: 'app-admin-orders-success',
  templateUrl: './admin-orders-success.component.html',
  styleUrls: ['./admin-orders-success.component.css']
})
export class AdminOrdersSuccessComponent implements OnInit {

  displayedColumns: string[] = ['id', 'products', 'quantity', 'user_id', 'address', 'date', 'pay_type',
                                'general_sum', 'status', 'delete'];
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
    this.ordersService.getSuccess().subscribe( res => {
      this.products = res.json();
      if (this.products.length > 0 ) {
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = false;
      } else {
        this.isLoad = false;
      }

    } );
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

  ngOnInit() {
  }

}
