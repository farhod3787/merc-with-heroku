import { Component, OnInit } from '@angular/core';
import { VideoNewsService } from 'src/app/shared/service/video_newsService';

@Component({
  selector: 'app-video-news',
  templateUrl: './video-news.component.html',
  styleUrls: ['./video-news.component.css']
})
export class VideoNewsComponent implements OnInit {

  news = [];
  constructor(
    private videonewsService: VideoNewsService
  ) {
    this.getNews();
  }

  getNews() {
    this.videonewsService.getLimit().subscribe( res => {
      this.news = res.json();
    });
  }

  ngOnInit() {
  }

}
