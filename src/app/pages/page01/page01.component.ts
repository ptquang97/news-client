import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {LoginInfo} from '../../models/login-info';
import {UserInfo} from '../../models/user-info';
import {Response} from '../../models/response';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterInfo} from '../../models/register-info';

@Component({
  selector: 'app-page01',
  templateUrl: './page01.component.html',
  styleUrls: ['./page01.component.scss']
})
export class Page01Component implements OnInit {
  loginInfo= new LoginInfo();
  registerInfor= new RegisterInfo();
  formErrors: any;
  loginPage = true;
  constructor(private newsService: NewsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  checkLogin() {
    this.formErrors = {
      email: '',
      password: ''
    };
    this.newsService.checkLogin(this.loginInfo).subscribe((data: Response) => {
      if (data.msg === 'Invalid Email') {
        this.formErrors.email = 'Email Không chính xác';
      } else if (data.msg === 'Invalid Password') {
        this.formErrors.password = 'Mật khẩu Không chính xác';
      } else {
        this.newsService.isLogin = true;
      }
    }, error => {

    });
  }

  goToRegisterPage() {
    this.loginPage = false;
    this.formErrors = {
      email: '',
      password: ''
    };

  }

  createUser() {
    this.registerInfor.rule = 0;
    console.log(this.registerInfor);
    this.registerInfor = {
      email: '111@gmail.com',
      password: '123456',
      rule: 0,
      userName: '12321'
    };
    this.newsService.createUser(this.registerInfor).subscribe((data: Response) => {
      // if (data.msg === 'Invalid Email') {
      //   this.formErrors.email = 'Email Không chính xác';
      // } else if (data.msg === 'Invalid Password') {
      //   this.formErrors.password = 'Mật khẩu Không chính xác';
      // } else {
      //   this.newsService.isLogin = true;
      // }
      console.log(data);
    }, error => {

    });
  }
}
