import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import Swal from 'sweetalert2';
import {ThemePalette} from '@angular/material/core';
import { News_Service } from 'src/app/shared/service/news_Service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {


  displayedColumns: string[] = ['id', 'image', 'name', 'rating', 'date', 'edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  color: ThemePalette = 'primary';
  isLoad = true;

  constructor(
    private newsService: News_Service
  ) {
    this.get();
  }

  ngOnInit() {
  }

  get() {
    this.newsService.getAll().subscribe( res => {
      this.dataSource = new MatTableDataSource(res.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoad = false;
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
  this.newsService.delete(id).subscribe( res => {
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
