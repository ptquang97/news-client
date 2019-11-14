import {Component, OnInit} from '@angular/core';
import {NewsInfo} from '../../models/news-info';
import {CategoryInfo} from '../../models/category-info';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import * as moment from 'moment';
import {UserInfo} from '../../models/user-info';
import {CommentCreateInfo, CommentInfo} from '../../models/comment-info';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-page05',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  listNews: NewsInfo[];
  listNewsSecond: NewsInfo[];
  newsInfo: NewsInfo;
  newsId: number;
  relatedNews: NewsInfo;
  commentInfo: CommentCreateInfo;
  listComment: CommentInfo[];

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService,
              private swal: SweetAlertService,
              private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.newsId = params['newsId'];
        this.commentInfo = new CommentCreateInfo('',  '', this.newsId,);
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
      this.getNews();
      this.getComment();
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
        } else {
          let random = Math.floor(Math.random() * (res.body.length - 1 - i) + i);
          if (random == i) {
            if (random == res.body.length - 2) {
              random++;
            } else {
              random--;
            }
          }
          this.relatedNews = res.body[random];
        }
      }
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getComment() {
    this.newsService.getComment(this.newsId).subscribe((res: ApiResponse) => {
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
        } else if (Number(hours) < 24) {
          res.body[i].time = hours + ' giờ trước';
        } else {
          res.body[i].time = moment(res.body[i].updated_at).format('DD-MM-YYYY HH:mm');
        }
      }
      this.listComment = res.body;
    }, error => {
      this.swal.alert({title: 'Đã xảy ra lỗi'}).then(() => {

      });
    });
  }

  sentComment() {
    this.newsService.showLoading(true);
      this.newsService.createComment(this.commentInfo).subscribe((res: ApiResponse) => {
        this.newsService.showLoading(false);
        this.commentInfo.comment = '';
        this.commentInfo.user_name = '';
        this.swal.success({title: 'Bình luận thành công'}).then(() => {

        });
        this.getComment();
      }, error => {
        this.newsService.showLoading(false);
        this.swal.alert({title: 'Đã xảy ra lỗi'}).then(() => {

        });
      });
    }

  goToTagPage(id) {
    this.router.navigate(['tag', id]);
  }
}
