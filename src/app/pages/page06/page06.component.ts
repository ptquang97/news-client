import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';
import {ApiResponse} from '../../models/api-response';
import {NewsInfo} from '../../models/news-info';
import * as moment from 'moment';

declare const $: any;

@Component({
  selector: 'app-page06',
  templateUrl: './page06.component.html',
  styleUrls: ['./page06.component.scss']
})
export class Page06Component implements OnInit {
  news: NewsInfo[];
  dataTable: any;

  constructor(private newsService: NewsService,
              private swal: SweetAlertService) {
  }

  ngOnInit() {
    // setTimeout(() => {
    //
    // });
    this.getNews();
  }

  getNews() {
    this.newsService.showLoading(true);
    this.newsService.getNews().subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      setTimeout(() => {
      }, 500);
      for (let i = 0; i < res.body.length; i++) {
        res.body[i].created_at = moment(res.body[i].created_at).format('DD-MM-YYYY HH:mm');
        res.body[i].updated_at = moment(res.body[i].updated_at).format('DD-MM-YYYY HH:mm');
      }
      this.news = res.body;
    }, error => {
      this.newsService.showLoading(false);
      this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {
      });
    });
  }

  deleteNews(item: NewsInfo) {
    this.swal.confirm({
      title: 'Xóa tin này?',
      showCancelButton: true,
      confirmButtonText: 'Có',
      type: 'warning',
      cancelButtonText: 'Không'
    }).then(() => {
      this.newsService.deleteNews(item.id).subscribe((res: ApiResponse) => {
        this.swal.success({title: 'Xóa bài viết thành công'}).then(() => {

        });
      }, error => {
        this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {
        });
      });
    });

  }
}
