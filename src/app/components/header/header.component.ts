import {Component, OnInit} from '@angular/core';
import {ApiResponse} from '../../models/api-response';
import {NewsService} from '../../services/news.service';
import {CategoryInfo} from '../../models/category-info';
import {Router} from '@angular/router';
import {UserInfo} from '../../models/user-info';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  listCategory: CategoryInfo[] = [];
  userInfo: UserInfo;
  keyWord: string;

  constructor(private newsService: NewsService,
              private swal: SweetAlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.userInfo = this.newsService.userInfo;
    this.getListCategory();
  }

  getListCategory() {
    if (!this.newsService.listCategory) {
      this.newsService.getCategories().subscribe((res: ApiResponse) => {
        for (let i = 0; i < 8; i++) {
          this.listCategory.push(res.body[i]);
        }
        this.newsService.listCategory = this.listCategory;
      });
    } else {
      this.listCategory = this.newsService.listCategory;
    }
  }

  goToNews(categoryId) {
    this.router.navigate(['page', categoryId]);
  }

  searchNews() {
    this.router.navigate(['search', this.keyWord]);
  }
}
