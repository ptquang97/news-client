import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Router} from '@angular/router';
import {LocalStorage} from '../../services/local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private newsService: NewsService,
              private router: Router,
              private localStorage: LocalStorage) { }

  ngOnInit() {
    this.localStorage.remove('currentUser');
    this.router.navigate(['']);
  }

}
