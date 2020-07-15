import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';

import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/shared/service/categoryService';
import { ContactService } from 'src/app/shared/service/contactService';


@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css']
})
export class AdminContactsComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'email', 'number', 'message', 'date', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  contacts = [];
  isLoad = true;

  constructor( private contactService: ContactService) {
    this.getContacts()
   }

   getContacts() {
      this.contactService.getAll().subscribe( res => {
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
    this.contactService.delete(id).subscribe( res => {
      const obj = res.json();
      if( obj.message ) {
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
      this.getContacts();
    });
  }



}
