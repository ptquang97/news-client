import {Component, OnInit} from '@angular/core';
import {NewsInfo} from '../../models/news-info';
import {CategoryInfo} from '../../models/category-info';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import * as moment from 'moment';
import {UserInfo} from '../../models/user-info';
import {CommentCreateInfo, CommentInfo} from '../../models/comment-info';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';

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
  userCreated: UserInfo;
  relatedNews: NewsInfo;
  commentInfo: CommentCreateInfo;
  listComment: CommentInfo[];
  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService,
              private swal: SweetAlertService) {

  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.newsId = params['newsId'];
        if (this.newsService.userInfo) {
          this.commentInfo = new CommentCreateInfo('', this.newsService.userInfo.id, this.newsId);
        } else {
          this.commentInfo = new CommentCreateInfo('', '', this.newsId);
        }
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
      this.getUserInfo();
      this.getCategoryInfo();
      this.getNews();
      this.getComment();
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getUserInfo() {
    this.newsService.getUserInfo(this.newsInfo.user_id).subscribe((res: ApiResponse) => {
      this.userCreated = res.body;
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

  getCategoryInfo() {
    this.newsService.getCategoryInfo(this.newsInfo.category_id).subscribe((res: ApiResponse) => {
      this.categoryInfo = res.body[0];
    }, error => {
      this.newsService.showLoading(false);

    });
  }

  getComment() {
    this.newsService.getComment(this.newsId).subscribe((res: ApiResponse) => {
      this.listComment = res.body;

    }, error => {
    });
  }

  sentComment() {
    if (this.commentInfo.user_id) {
      this.newsService.createComment(this.commentInfo).subscribe((res: ApiResponse) => {
        this.commentInfo.comment = '';
        this.getComment();
      }, error => {
      });
    } else {
      this.swal.alert({title: 'Bạn cần đăng nhập để bình luận'}).then(() => {

      });
    }
  }
}
