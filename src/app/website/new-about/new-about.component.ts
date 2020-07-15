import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { News_Service } from 'src/app/shared/service/news_Service';

@Component({
  selector: 'app-new-about',
  templateUrl: './new-about.component.html',
  styleUrls: ['./new-about.component.css']
})
export class NewAboutComponent implements OnInit {

    isLoad = true;
    id: any;
    news: any = {};
  constructor(
    private route: ActivatedRoute,
    private newsService: News_Service

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoad = false;
        this.id = paramMap.get('id');
        this.newsService.getNews(this.id).subscribe( result => {
            this.news = result.json();
            this.isLoad = true;
            this.newsService.updateRating(this.id).subscribe( res => {
              console.log(res)
            });
        });
      } else {
        this.id = null;
      }
    });
  }

}
