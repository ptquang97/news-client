import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';
import {ApiResponse} from '../../models/api-response';
import {NewsInfo} from '../../models/news-info';
import {CategoryInfo} from '../../models/category-info';
import set = Reflect.set;

@Component({
  selector: 'app-page02',
  templateUrl: './page02.component.html',
  styleUrls: ['./page02.component.scss']
})
export class Page02Component implements OnInit {
  newsLeft: NewsInfo[] = [];
  middleNews: NewsInfo;
  firstMultiMedia: NewsInfo;
  secondMultiMedia: NewsInfo[];
  news: NewsInfo[];
  newsRight: NewsInfo[] = [];
  newsForUser = [{}, {}, {}, {}, {}, {}, {}, {}];
  listCategory: CategoryInfo[];
  multiMediaRight: CategoryInfo[];
  loadingDone = false;
  loaded = false;
  constructor(private newsService: NewsService,
              private swal: SweetAlertService) {
  }

  ngOnInit() {
    this.getNews();
    this.getListCategory();
  }

  getNews() {
    this.newsService.showLoading(true);
    this.newsService.getNews().subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      setTimeout(() => {
        this.loadingDone = true;
      }, 500);
      this.news = res.body;
      this.middleNews = res.body[4];
      this.firstMultiMedia = res.body[7];
      for (let i = 0; i < 4; i++) {
        this.newsLeft.push(res.body[i]);
      }
      for (let i = 5; i < 7; i++) {
        this.newsRight.push(res.body[i]);
      }
      for (let i = 8; i < 10; i++) {
        this.multiMediaRight.push(res.body[i]);
      }
      for (let i = 10; i < 14; i++) {
        this.multiMediaRight.push(res.body[i]);
      }
      console.log(res);
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getListCategory() {
    this.newsService.getCategories().subscribe((res: ApiResponse) => {
        this.listCategory = res.body;
    });
  }

  loadedData() {
    setTimeout(() => {
      this.loaded = true;
    });
  }
}

