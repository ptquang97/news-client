import {Component, OnInit} from '@angular/core';
import {NewsInfo} from '../../models/news-info';
import {CategoryInfo} from '../../models/category-info';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import * as moment from 'moment';
import {TagInfo} from '../../models/tag-info';

@Component({
  selector: 'app-tag-news',
  templateUrl: './tag-news.component.html',
  styleUrls: ['./tag-news.component.scss']
})
export class TagNewsComponent implements OnInit {

  listNews: NewsInfo[];
  tagId: string;
  tagInfo: TagInfo;
  loadingDone = false;
  loaded = false;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) {

  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.tagId = params['tagId'];
        this.getNews();
      });
  }

  getNews() {
    this.listNews = [];
    this.newsService.showLoading(true);
    this.newsService.getNewsByTag(this.tagId).subscribe((res: ApiResponse) => {
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
