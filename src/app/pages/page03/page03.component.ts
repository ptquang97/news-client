import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import {TagInfo} from '../../models/tag-info';
import {CategoryInfo} from '../../models/category-info';
import {SweetAlertService} from 'ngx-sweetalert2';
import {NewsCreateInfo} from '../../models/news-create-info';
import {Domain} from '../../common/domain';
import {ActivatedRoute} from '@angular/router';
import {NewsInfo} from '../../models/news-info';

@Component({
  selector: 'app-page03',
  templateUrl: './page03.component.html',
  styleUrls: ['./page03.component.scss']
})
export class Page03Component implements OnInit {
  @ViewChild('ckeditor') ckeditor: ElementRef;
  config: any;
  tagOption: any;
  listCategory: CategoryInfo[] = [];
  lisTag: TagInfo[] = [];
  addTag: boolean;
  addCategory: boolean;
  type = {tag: 'tag', category: 'category'};
  categoryName: string;
  tagName: string;
  tagError: string;
  categoryError: string;
  tagSelected: TagInfo;
  newsInfo: NewsCreateInfo;
  listImageUpload = [];
  newsId: string;
  changeNewsContent = false;
  constructor(private newsService: NewsService,
              private swal: SweetAlertService,
              private activatedRoute: ActivatedRoute) {
    this.tagOption = {
      multiple: false,
      placeholder: 'Chọn Tag',
      language: {
        noResults: () => {
          return 'Không có kết quả';
        }
      }
    };
  }

  ngOnInit() {
    this.newsInfo = new NewsCreateInfo('', '', '', '', '', '', '');
    this.activatedRoute.params
      .subscribe(params => {
        this.newsId = params['newsId'];
      });
    if (this.newsId) {
      this.newsService.showLoading(true);
      this.newsService.getNewsInfo(this.newsId).subscribe((res: ApiResponse) => {
        const data: NewsInfo = res.body[0];
        this.newsService.showLoading(false);
        this.newsInfo = new NewsCreateInfo(data.title, data.short_intro, data.content, data.user_id, data.category_id, data.tags_id, data.image);
        this.changeNewsContent = true;
        console.log(this.newsInfo);
      }, error => {
        this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {

        });
      });
    }
    this.getListTags();
    this.getListCategory();
    this.config = {
      uiColor: '#F0F3F4',
      height: '250px',
      fullPage: false
    };
  }

  selectImage(fileInput: any) {
    const filesToUpload = <Array<File>>fileInput.target.files;
    if (filesToUpload.length > 0) {
      this.newsService.showLoading(true);
      this.newsService.uploadImage(filesToUpload).subscribe((res: ApiResponse) => {
        this.newsService.showLoading(false);
        for (let i = 0; i < res.body.length; i++) {
          this.listImageUpload.push(Domain.path + res.body[i]);
        }
      }, error => {
        this.newsService.showLoading(false);
        this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {

        });
      });
    }
  }

  selectAvatar(fileInput: any) {
    this.newsService.showLoading(true);
    const avatar = <Array<File>>fileInput.target.files;
    if (avatar.length > 0) {
      this.newsService.uploadImage(avatar).subscribe((res: ApiResponse) => {
        this.newsService.showLoading(false);
        this.newsInfo.image = Domain.path + res.body[0];
      }, error => {
        this.newsService.showLoading(false);
        this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {

        });
      });
    }
  }

  onSubmit() {
    this.newsService.showLoading(true);
    this.newsInfo.user_id = this.newsService.userInfo.id;
    this.newsService.creteNews(this.newsInfo).subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      this.swal.success({title: 'Tạo bài viết thành công'}).then(() => {

      });
    }, error => {
      this.newsService.showLoading(false);
      this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {

      });
    });
  }

  updateNews() {
    this.newsService.showLoading(true);
    this.newsInfo.user_id = this.newsService.userInfo.id;
    this.newsService.updateNews(this.newsInfo, this.newsId).subscribe((res: ApiResponse) => {
      this.newsService.showLoading(false);
      this.swal.success({title: 'Chỉnh sửa viết thành công'}).then(() => {

      });
    }, error => {
      this.newsService.showLoading(false);
      this.swal.error({title: 'Đã xảy ra lỗi'}).then(() => {

      });
    });
  }

  getListTags() {
    this.newsService.getTags().subscribe((res: ApiResponse) => {
      this.lisTag = res.body;
      this.lisTag.map(item => {
        item.text = item.tag_name;
        if (item.tag_name === this.tagName) {
          this.tagSelected = item;
        }
        if (this.changeNewsContent && this.newsInfo.tags_id === item.id) {
          this.tagSelected = item;
        }
      });
      this.tagName = '';
      this.newsInfo.tags_id = this.tagSelected ? this.tagSelected.id : this.newsInfo.tags_id;
      this.lisTag.unshift({id: '', text: 'Chọn tag', tag_name: 'Chọn tag'});
    });
  }

  getListCategory() {
    this.newsService.getCategories().subscribe((res: ApiResponse) => {
      this.listCategory = res.body;
      const category = this.listCategory.filter(item => item.category_name === this.categoryName)[0];
      this.newsInfo.category_id = category ? category.id : this.newsInfo.category_id;
      this.categoryName = '';
      this.listCategory.unshift({id: '', category_name: 'Select Category'});
    });
  }

  showModalCreateTag() {
    this.addTag = !this.addTag;
    this.tagError = '';
  }

  showModalCreateCategory() {
    this.addCategory = !this.addCategory;
    this.categoryError = '';
  }

  selectTag() {
    this.newsInfo.tags_id = this.tagSelected.id;
  }

  create(type) {
    if (type === this.type.tag) {
      if (!this.tagName) {
        this.tagError = 'Chưa nhập Tag!';
      } else if (this.lisTag.filter(item => item.tag_name === this.tagName).length > 0) {
        this.tagError = 'Tag đã tồn tại!';
      } else {
        this.newsService.showLoading(true);
        this.newsService.createTag(this.tagName).subscribe((res: ApiResponse) => {
          this.newsService.showLoading(false);
          this.tagError = '';
          this.addTag = false;
          this.getListTags();
        }, error => {
          this.newsService.showLoading(false);
          this.swal.error({title: 'Error'}).then(() => {

          });
        });
      }
    } else {
      if (!this.categoryName) {
        this.categoryError = 'Chưa nhập Category!';
      } else if (this.listCategory.filter(item => item.category_name === this.categoryName).length > 0) {
        this.categoryName = 'Category đã tồn tại!';
      } else {
        this.newsService.showLoading(true);
        this.newsService.createCategory(this.categoryName).subscribe((res: ApiResponse) => {
          this.newsService.showLoading(false);
          this.categoryError = '';
          this.addCategory = false;
          this.getListCategory();
        }, error => {
          this.newsService.showLoading(false);
          this.swal.error({title: 'Error'}).then(() => {

          });
        });
      }
    }
  }

  copyUrl(value) {
    const body = document.body || document.getElementsByTagName('body')[0];
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    textarea.value = value;
    body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    body.removeChild(textarea);
    this.swal.success({title: 'Đã copy url ảnh'}).then(() => {

    });
  }
}
