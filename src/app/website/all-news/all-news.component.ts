import { Component, OnInit } from '@angular/core';
import { News_Service } from 'src/app/shared/service/news_Service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news = [];
  constructor(
    private newsService : News_Service
  ) {
    this.getLimit();
  }

  getLimit() {
    this.newsService.getLimit().subscribe( res => {
      this.news = res.json();
    });
  }

  ngOnInit() {
  }

}
