import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';
import Swal from 'sweetalert2';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'image', 'name', 'id_number', 'quantity', 'price', 'sale', 'date', 'edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  color: ThemePalette = 'primary';
  isLoad = true;

  constructor(
    private productService: ProductService
  ) {
    this.get();
   }

   get() {
      this.productService.getAll().subscribe( res => {
        this.dataSource = new MatTableDataSource(res.json());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = false;
      } );
   }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id) {
    this.productService.delete(id).subscribe( res => {
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
      this.get();
    });
  }

}
