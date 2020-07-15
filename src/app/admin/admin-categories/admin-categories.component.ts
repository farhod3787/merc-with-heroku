import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';

import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/shared/service/categoryService';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name_uz', 'name_ru', 'edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  categories = [];
  isLoad = true;

  constructor(
    private categoryService: CategoryService
  ) {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe( res => {
      this.dataSource = new MatTableDataSource(res.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoad = false;
    });
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
    this.categoryService.delete(id).subscribe( res => {
      const obj = res.json();
      if( obj.message ) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Maxsulot o`chirilmadi ',
            timer: 3000
          })
        }
      this.getCategories();
    });
  }



}
