import { Component, OnInit } from '@angular/core';
import {NewsInfo} from '../../models/news-info';
import {CategoryInfo} from '../../models/category-info';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import * as moment from 'moment';
import {UserInfo} from '../../models/user-info';

@Component({
  selector: 'app-page05',
  templateUrl: './page05.component.html',
  styleUrls: ['./page05.component.scss']
})
export class Page05Component implements OnInit {

  listNews: NewsInfo[];
  listNewsSecond: NewsInfo[];
  categoryInfo: CategoryInfo;
  newsInfo: NewsInfo;
  newsId: number;
  userInfo: UserInfo;
  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) {

  }

  ngOnInit() {
    this.userInfo = this.newsService.userInfo;
    this.activatedRoute.params
      .subscribe(params => {
        this.newsId = params['newsId'];
        this.getNewsInfo();
      });
  }

  getNewsInfo() {
    this.listNews = [];
    this.listNewsSecond = [];
    this.newsService.showLoading(true);
    this.newsService.getNewsInfo(this.newsId).subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      this.newsInfo = res.body[0];
      this.newsInfo.updated_at = moment(this.newsInfo.updated_at).format('HH:mm DD-MM-YYYY');
      this.getCategoryInfo();
      this.getNews();
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getNews() {
    this.listNews = [];
    this.newsService.showLoading(true);
    this.newsService.getNewsByCategory(this.newsInfo.category_id).subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].id != this.newsId) {
          res.body[i].updated_at = moment(res.body[i].updated_at).format('HH:mm DD-MM-YYYY');
          this.listNews.push(res.body[i]);
        }
      }
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getCategoryInfo() {
    this.newsService.getCategoryInfo(this.newsInfo.category_id).subscribe((res: ApiResponse) => {
      this.categoryInfo = res.body[0];
    }, error => {
      this.newsService.showLoading(false);

    });
  }
}
