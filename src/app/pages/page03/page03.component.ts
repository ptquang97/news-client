import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {ApiResponse} from '../../models/api-response';
import {TagInfo} from '../../models/tag-info';
import {CategoryInfo} from '../../models/category-info';

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
  constructor(private newsService: NewsService) {
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
    this.getListTags();
    this.getListCategory();
    this.config = {
        uiColor: '#F0F3F4',
        height: '400px',
        fullPage : false
      };
  }

  onSubmit() {
    console.log(this.ckeditor);
    console.log(this.editorValue);
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

  selectCategory() {

  }
}
