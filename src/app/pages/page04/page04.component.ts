import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import {NewsInfo} from '../../models/news-info';
import * as moment from 'moment';
import {DecimalPipe} from '@angular/common';
import {CategoryInfo} from '../../models/category-info';

@Component({
  selector: 'app-page04',
  templateUrl: './page04.component.html',
  styleUrls: ['./page04.component.scss']
})
export class Page04Component implements OnInit {
  listNews: NewsInfo[];
  listNewsSecond: NewsInfo[];
  firstNews: NewsInfo;
  secondNews: NewsInfo;
  categoryId: string;
  categoryInfo: CategoryInfo;
  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) {

  }

  ngOnInit() {
    console.log('aaaaa');
    this.activatedRoute.params
      .subscribe(params => {
        this.categoryId = params['categoryId'];
        this.getCategoryInfo();
        this.getNews();
      });
  }

  getNews() {
    this.listNews = [];
    this.listNewsSecond = [];
    this.newsService.showLoading(true);
    this.newsService.getNewsByCategory(this.categoryId).subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      this.firstNews = res.body[0];
      console.log(this.firstNews);
      this.secondNews = res.body[1];
      for (let i = 2; i < res.body.length; i++) {
        if (i < 5) {
          this.listNewsSecond.push(res.body[i]);
        } else {
          // const dateNow = moment();
          // // const updatedDate = moment(res.body[i].updated_at);
          // const updatedDate = moment(res.body[i].updated_at);
          // const duration = moment.duration(dateNow.diff(updatedDate));
          // const hours = new DecimalPipe('en-US').transform(duration.asHours(), '1.0-0');
          // if (Number(hours) < 24) {
          //   res.body[i].time = hours + ' giờ trước';
          // } else {
          //   res.body[i].time = moment(res.body[i].updated_at).format('dd-mm-yyyy HH:mm');
          // }
          res.body[i].updated_at = moment(res.body[i].updated_at).format('HH:mm DD-MM-YYYY');
          this.listNews.push(res.body[i]);
        }
      }
      console.log(this.listNews);
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getCategoryInfo() {
    this.newsService.getCategoryInfo(this.categoryId).subscribe((res: ApiResponse) => {
      this.categoryInfo = res.body[0];
    }, error => {

    });
  }

}
