import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductService } from 'src/app/shared/service/productsService';
import Swal from 'sweetalert2';
import { VideoNewsService } from 'src/app/shared/service/video_newsService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-video-news',
  templateUrl: './admin-video-news.component.html',
  styleUrls: ['./admin-video-news.component.css']
})
export class AdminVideoNewsComponent implements OnInit {


  displayedColumns: string[] = ['id', 'url', 'date', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  safeSrc: SafeResourceUrl = [];
  categories = [];
  isLoad = true;
  constructor(
    private videonewsService: VideoNewsService,
    private sanitizer: DomSanitizer
  ) {

    this.getnews();
  }

  getnews() {
    this. videonewsService.getAll().subscribe( res => {
      this.dataSource = new MatTableDataSource(res.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoad = false;
    });
  }

  addNews(url) {
    this.videonewsService.post(url).subscribe( res => {
      if ( res.ok ) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        );
        }  else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Maxsulot o`chirilmadi ',
            timer: 3000
          });
        }
      this.getnews();
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
    this. videonewsService.delete(id).subscribe( res => {
      const obj = res.json();
      if( obj.message ) {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        );
        }  else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Maxsulot o`chirilmadi ',
            timer: 3000
          });
        }
      this.getnews();
    });
  }

  ngOnInit() {
  }

}
