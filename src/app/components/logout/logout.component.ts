import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private newsService: NewsService,
              private router: Router) { }

  ngOnInit() {
    this.newsService.isLogin = false;
    this.router.navigate(['/login']);
  }

}
