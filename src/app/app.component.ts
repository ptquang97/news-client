import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {NewsService} from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    private newsService: NewsService) {
  }
}
