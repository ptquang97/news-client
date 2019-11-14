import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {LoginInfo} from '../../models/login-info';
import {UserInfo} from '../../models/user-info';
import {ApiResponse} from '../../models/api-response';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterInfo} from '../../models/register-info';
import {Validator} from '../../common/validator';
import {Router} from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import {LocalStorage} from '../../services/local-storage.service';

@Component({
  selector: 'app-page01',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
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
  rePassword = '';
  rePasswordError = '';
  constructor(private newsService: NewsService,
              private formBuilder: FormBuilder,
              private validator: Validator,
              private router: Router,
              private localStorage: LocalStorage,
              private swal: SweetAlertService) { }

  ngOnInit() {
    this.resetError();
  }

  checkLogin() {
    const form = this.createFormLogin(this.loginInfo);
    this.formErrors = this.checkValidate(form, this.formErrors);
    if (!this.checkError(this.formErrors)) {
      this.newsService.showLoading(true);
      this.newsService.checkLogin(this.loginInfo).subscribe((data: ApiResponse) => {
        this.newsService.showLoading(false);
        if (data.msg === 'Invalid Email') {
          this.formErrors.email = 'Email does not exist';
        } else if (data.msg === 'Invalid Password') {
          this.formErrors.password = 'Password invalid';
        } else {
          this.router.navigate(['']);
          this.localStorage.setObject('currentUser', data.body);
        }
        console.log(data);
      }, error => {
        this.newsService.showLoading(false);
        this.swal.error({title: 'Error'}). then(() => {

        });
      });
    }
  }

  goToRegisterPage(key?) {
    this.resetError();
    if (key) {
      this.loginPage = false;
    } else {
      this.loginPage = true;
    }
  }

  createUser() {
    this.rePasswordError = '';
    if (this.registerInfor.password !== this.rePassword) {
      this.rePasswordError = 'Password not match!';
    } else {
      this.registerInfor.rule = 0;
      const form = this.createForm(this.registerInfor);
      this.formErrorsRegister = this.checkValidate(form, this.formErrorsRegister);
      this.validator.gotoError();
      if (!this.checkError(this.formErrorsRegister)) {
        this.newsService.showLoading(true);
        this.newsService.createUser(this.registerInfor).subscribe((data: ApiResponse) => {
          this.newsService.showLoading(false);
          this.swal.success({ title: 'Create User Success' }).then(() => {
            this.loginPage = true;
          });
          console.log(data);
        }, error => {
          this.newsService.showLoading(false);
          this.swal.error({title: 'Error'}). then(() => {
          });
        });
      }
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

  createFormLogin(model: any) {
    let form: FormGroup;
    form = this.formBuilder.group({
      'email': [model.email, [Validators.required, Validators.email]],
      'password': [model.password, [Validators.required]],
    });
    return form;
  }

  checkValidate(createTopicForm: FormGroup, formError) {
    if (!createTopicForm) {
      return false;
    }
    const form = createTopicForm;

    for (const field in formError) {
      if (formError.hasOwnProperty(field)) {
        formError[field] = '';
        formError[field] = this.validator.validateForm(form, field, this.messageValidationError[field]);
      }
    }
    return formError;
  }

  checkError(formErrors: any) {
    for (const field in formErrors) {
      if (formErrors[field] !== '') {
        return true;
      }
    }
    return false;
  }

  resetError() {
    this.loginInfo = new LoginInfo();
    this.registerInfor = new RegisterInfo();
    this.formErrors = {
      email: '',
      password: ''
    };
    this.formErrorsRegister = {
      email: '',
      password: '',
      userName: ''
    };
    this.rePasswordError = '';
  }
}
