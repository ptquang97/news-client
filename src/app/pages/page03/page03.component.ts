import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import {TagInfo} from '../../models/tag-info';
import {CategoryInfo} from '../../models/category-info';
import {SweetAlertService} from 'ngx-sweetalert2';
import {NewsCreateInfo} from '../../models/news-create-info';
import {Domain} from '../../common/domain';

@Component({
  selector: 'app-page03',
  templateUrl: './page03.component.html',
  styleUrls: ['./page03.component.scss']
})
export class Page03Component implements OnInit {
  @ViewChild('ckeditor') ckeditor: ElementRef;
  public editorValue = '';
  config: any;
  categoryOption: any;
  listCategory: CategoryInfo[] = [];
  selectedCategory: any;
  lisTag: TagInfo[] = [];
  addTag: boolean;
  addCategory: boolean;
  showModal: boolean;
  type = {tag: 'tag', category: 'category'};
  categoryName: string;
  tagName: string;
  tagError: string;
  categoryError: string;
  categorySelected: any;
  tagSelected: any;
  newsInfo: NewsCreateInfo;
  listImageUpload = [];
  constructor(private newsService: NewsService,
              private swal: SweetAlertService) {
    this.categoryOption = {
      multiple: false,
      closeOnSelect: false,
      placeholder: 'Select Category',
      language: {
        noResults: () => {
          return 'No Result';
        }
      }
    };
  }

  ngOnInit() {
    this.newsInfo = new NewsCreateInfo('', '', '', '', '', '', '');
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
        console.log(error);
      });
    }
  }

  selectAvatar(fileInput: any) {
    this.newsService.showLoading(true);
    const avatar = <Array<File>>fileInput.target.files
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
    console.log(this.ckeditor);
    console.log(this.editorValue);
    this.newsService.showLoading(true);
    this.newsInfo.user_id = this.newsService.userInfo.id;
    this.newsService.creteNews(this.newsInfo).subscribe((res: ApiResponse) => {
      console.log(res.body);
      this.newsService.showLoading(false);
      this.swal.success({title: 'Tạo bài viết thành công'}).then(() => {

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
      this.lisTag.unshift({id: '', tag_name: 'Select tag'});
    });
  }

  getListCategory() {
    this.newsService.getCategories().subscribe((res: ApiResponse) => {
      this.listCategory = res.body;
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
          this.tagName = '';
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
          this.categoryName = '';
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
