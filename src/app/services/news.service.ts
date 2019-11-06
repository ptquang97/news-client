import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginInfo} from '../models/login-info';
import {UserInfo} from '../models/user-info';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {HttpStatus} from '../common/http-status';
import {Domain} from '../common/domain';
import {RegisterInfo} from '../models/register-info';

@Injectable()
export class NewsService {
  isLogin: boolean;
  constructor(private http: Http) {
  }

  checkLogin(loginInfo: LoginInfo): Observable<any > {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/user/login', JSON.stringify(loginInfo))
        .subscribe((response: Response) => {
          console.log(response);
          if (response.status === HttpStatus.OK) {
            observer.next(response.json());
            observer.complete();
          } else {
            observer.error();
          }
        }, (error) => {
          observer.error(error);
        });
    });
  }

  createUser(registerInfo: RegisterInfo): Observable<any > {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/user/createUser', JSON.stringify(registerInfo))
        .subscribe((response: Response) => {
          if (response.status === HttpStatus.OK) {
            observer.next(response.json());
            observer.complete();
          } else {
            observer.error();
          }
        }, (error) => {
          observer.error(error);
        });
    });
  }

}
