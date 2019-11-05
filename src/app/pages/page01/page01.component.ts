import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-page01',
  templateUrl: './page01.component.html',
  styleUrls: ['./page01.component.scss']
})
export class Page01Component implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }
  checkLogin() {
    // this.newsService.checkLogin(){
    //
    // }
  }
}
