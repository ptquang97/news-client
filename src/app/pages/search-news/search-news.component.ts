import { Component, OnInit } from '@angular/core';
import {NewsInfo} from '../../models/news-info';
import {TagInfo} from '../../models/tag-info';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import * as moment from 'moment';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.scss']
})
export class SearchNewsComponent implements OnInit {

  listNews: NewsInfo[];
  keyWord: string;
  loadingDone = false;
  loaded = false;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) {

  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.keyWord = params['keyWord'];
        this.getNews();
      });
  }

  getNews() {
    this.listNews = [];
    this.newsService.showLoading(true);
    this.newsService.searchNews(this.keyWord).subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      setTimeout(() => {
        this.loadingDone = true;
      }, 500);
      for (let i = 0; i < res.body.length; i++) {
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
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  loadedData() {
    setTimeout(() => {
      this.loaded = true;
    });
  }
}
