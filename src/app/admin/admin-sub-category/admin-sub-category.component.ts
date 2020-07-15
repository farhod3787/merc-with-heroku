import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';

import Swal from 'sweetalert2';
import { SubCategoryService } from 'src/app/shared/service/sub_categoryService';
import { CategoryService } from 'src/app/shared/service/categoryService';
@Component({
  selector: 'app-admin-sub-category',
  templateUrl: './admin-sub-category.component.html',
  styleUrls: ['./admin-sub-category.component.css']
})
export class AdminSubCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name_uz', 'name_ru', 'category_name', 'edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  subcategories = [];
  isLoad = true;

  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService
  ) {
    this.getSubCategories();

  }
  getSubCategories() {
      this.subCategoryService.getAll().subscribe( res => {
        const body = res.json();

        for ( let i = 0; i <= body.length - 1; i++) {
            const id = body[i].category_id;
            this.categoryService.getCategory(id).subscribe( res => {
              const result = res.json();
              body[i].category_id = result.name_ru;
            });
        }
        this.dataSource = new MatTableDataSource(body);
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
    this.subCategoryService.delete(id).subscribe( res => {
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
      this.getSubCategories();
    });
  }

}
