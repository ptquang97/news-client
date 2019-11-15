import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';
import {ApiResponse} from '../../models/api-response';
import {NewsInfo} from '../../models/news-info';
import {CategoryInfo} from '../../models/category-info';
import * as moment from 'moment';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-page02',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  middleNews: NewsInfo;
  firstMultiMedia: NewsInfo;
  listNewEachCategory: NewsInfo[];
  news: NewsInfo[];
  listCategory: CategoryInfo[];
  loadingDone = false;
  loaded = false;
  constructor(private newsService: NewsService,
              private swal: SweetAlertService) {
  }

  ngOnInit() {
    this.getNews();
    this.getListCategory();
    this.getNewsEachCategory();
  }

  getNews() {
    this.newsService.showLoading(true);
    this.newsService.getNews().subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      setTimeout(() => {
        this.loadingDone = true;
      }, 500);
      for (let i = 0; i < res.body.length; i++) {
        const dateNow = moment();
        // const updatedDate = moment(res.body[i].updated_at);
        const updatedDate = moment(res.body[i].updated_at);
        const duration = moment.duration(dateNow.diff(updatedDate));
        const second = new DecimalPipe('en-US').transform(duration.asSeconds(), '1.0-0');
        const minute = new DecimalPipe('en-US').transform(duration.asMinutes(), '1.0-0');
        const hours = new DecimalPipe('en-US').transform(duration.asHours(), '1.0-0');
        if (Number(second) < 60) {
          res.body[i].time = second + ' giây trước';
        } else if (Number(minute) < 60) {
          res.body[i].time = minute + ' phút trước';
        } else if (Number(hours) < 25) {
          res.body[i].time = hours + ' giờ trước';
        } else {
          res.body[i].time = moment(res.body[i].updated_at).format('DD-MM-YYYY HH:mm');
        }
      }
      this.news = res.body;
      this.middleNews = res.body[4];
      this.firstMultiMedia = res.body[7];
    }, error => {
      this.newsService.showLoading(false);
      this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {
      });
    });
  }

  getListCategory() {
    this.newsService.getCategories().subscribe((res: ApiResponse) => {
        this.listCategory = res.body.length > 8 ? res.body.slice(0 , 8) : res.body;
    });
  }

  getNewsEachCategory() {
    this.newsService.getNewsEachCategory().subscribe((res: ApiResponse) => {
        this.listNewEachCategory = res.body;
    });
  }

  loadedData() {
    setTimeout(() => {
      this.loaded = true;
    });
  }
}

