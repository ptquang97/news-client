import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {LoginInfo} from '../../models/login-info';
import {UserInfo} from '../../models/user-info';
import {Response} from '../../models/response';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterInfo} from '../../models/register-info';
import {Validator} from '../../common/validator';

@Component({
  selector: 'app-page01',
  templateUrl: './page01.component.html',
  styleUrls: ['./page01.component.scss']
})
export class Page01Component implements OnInit {
  loginInfo= new LoginInfo();
  registerInfor= new RegisterInfo();
  formErrors: any;
  formErrorsRegister: any;
  loginPage = true;
  messageValidationError = {
    'userName': {
      'required': 'User Name required',
    },
    'email': {
      'email': 'Email Invalid',
      'required': 'Email required'
    },
    'password': {
      'required': 'Password required',
    }
  };
  constructor(private newsService: NewsService,
              private formBuilder: FormBuilder,
              private validator: Validator) { }

  ngOnInit() {
    this.formErrors = {
      email: '',
      password: ''
    };
    this.formErrorsRegister = {
      email: '',
      password: '',
      userName: ''
    };
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
    this.formErrorsRegister = {
      email: '',
      password: '',
      userName: ''
    };
  }

  createUser() {
    this.registerInfor.rule = 0;
    const form = this.createForm(this.registerInfor);
    this.formErrorsRegister = this.checkValidate(form);
    this.validator.gotoError();
    if (!this.checkError(this.formErrorsRegister)) {
      this.newsService.createUser(this.registerInfor).subscribe((data: Response) => {
        if (data.msg === 'Invalid Email') {
          this.formErrors.email = 'Email Không chính xác';
        } else if (data.msg === 'Invalid Password') {
          this.formErrors.password = 'Mật khẩu Không chính xác';
        } else {
          this.newsService.isLogin = true;
        }
        console.log(data);
      }, error => {

      });
    }
  }

  createForm(model: any) {
    let form: FormGroup;
    form = this.formBuilder.group({
      'userName': [model.userName, [Validators.required]],
      'email': [model.email, [Validators.required, Validators.email]],
      'password': [model.password, [Validators.required]],
    });
    return form;
  }

  checkValidate(createTopicForm: FormGroup) {
    if (!createTopicForm) {
      return false;
    }
    const form = createTopicForm;

    for (const field in this.formErrorsRegister) {
      if (this.formErrorsRegister.hasOwnProperty(field)) {
        this.formErrorsRegister[field] = '';
        this.formErrorsRegister[field] = this.validator.validateForm(form, field, this.messageValidationError[field]);
      }
    }
    return this.formErrorsRegister;
  }

  checkError(formErrors: any) {
    for (const field in formErrors) {
      if (formErrors[field] !== '') {
        return true;
      }
    }
    return false;
  }
}
