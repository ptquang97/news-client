import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
  listCategory: any;
  selectedCategory: any;
  constructor() {
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
    this.listCategory = [
      {id: '', text: 'Select Category'},
      {id: 1, text: 'a'},
      {id: 1, text: 'b'},
      {id: 1, text: 'c'}
      ];
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

  selectCategory() {

  }
}
