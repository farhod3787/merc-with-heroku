import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';

import Swal from 'sweetalert2';
import { UsersService } from 'src/app/shared/service/usersService';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {



  displayedColumns: string[] = ['id', 'f_name', 'm_name', 'email', 'address', 'phone', 'login', 'date', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  isLoad = true;
  users = [];
  constructor(
    private userService: UsersService
  ) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(res => {
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
    this.userService.delete(id).subscribe( res => {
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
      this.getUsers();
    });
  }

}
