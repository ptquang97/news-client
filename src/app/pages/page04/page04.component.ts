import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';

@Component({
  selector: 'app-page04',
  templateUrl: './page04.component.html',
  styleUrls: ['./page04.component.scss']
})
export class Page04Component implements OnInit {
  listNews = [{}, {}, {}, {}, {}, {}, {}, {}];
  categoryId: string;
  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) {

  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.categoryId = params['categoryId'];
        this.getNews();
      });
  }

  getNews() {
    this.newsService.getNewsByCategory(this.categoryId).subscribe((res: ApiResponse) => {
      console.log(res);
      this.listNews = res.body;
    }, error => {

    });
  }
}
