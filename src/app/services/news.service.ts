import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginInfo} from '../models/login-info';
import {UserInfo} from '../models/user-info';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {HttpStatus} from '../common/http-status';
import {Domain} from '../common/domain';
import {RegisterInfo} from '../models/register-info';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Location} from '@angular/common';
import {forEach} from '@angular/router/src/utils/collection';
import {NewsCreateInfo} from '../models/news-create-info';
import {CommentCreateInfo, CommentInfo} from '../models/comment-info';
import {LocalStorage} from './local-storage.service';
import {CategoryInfo} from '../models/category-info';
import {SweetAlertService} from 'ngx-sweetalert2/src/index';

declare const $: any;

@Injectable()
export class NewsService {
  url: string;
  userInfo: UserInfo;
  listCategory: CategoryInfo[];

  constructor(private http: Http,
              private router: Router,
              private location: Location,
              private localStorage: LocalStorage,
              private swal: SweetAlertService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    router.events.subscribe((event: any) => {
      window.scrollTo(0, 0);
      if (event.error) {
        this.router.navigate(['']);
      }
      // if (event instanceof RouteConfigLoadStart) {
      //   if (this.isFirstRouteConfigLoad) {
      //     this.showLoading(true);
      //   }
      // }
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
        this.userInfo = this.localStorage.getObject('currentUser');
        this.url = this.getUrl(event.url);
        if (this.userInfo) {
          if (this.url === '/login') {
            // this.location.back();
            this.router.navigate(['']);
          }
        }
      }
    });
  }

  getUrl(url) {
    if (url === '/') {
      return url;
    }
    let urlList = url.split('/');
    if (urlList.length > 2) {
      urlList.splice(0, 1);
      urlList = urlList.splice(0, 2);
    }
    return urlList.join('/').split('?')[0];
  }

  showLoading(flag) {
    if (flag) {
      setTimeout(() => {
        $('#loading').addClass('loader');
      }, 500);
    } else {
      setTimeout(() => {
        $('.loader').fadeOut('slow');
      }, 500);
    }
  }

  checkLogin(loginInfo: LoginInfo): Observable<any> {
    console.log(loginInfo);
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/user/login', loginInfo)
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

  createUser(registerInfo: RegisterInfo): Observable<any> {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/user/createUser', registerInfo)
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

  getTags(): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/tag/getTags').subscribe((response: Response) => {
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

  getCategories(): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/category/getCategory').subscribe((response: Response) => {
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

  createTag(tagName: string): Observable<any> {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/tag/createTag', {tag_name: tagName})
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

  createCategory(categoryName: string): Observable<any> {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/category/createCategory', {category_name: categoryName})
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

  creteNews(news: NewsCreateInfo): Observable<any> {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/news/createNews', news)
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

  updateNews(news: NewsCreateInfo, newsId): Observable<any> {
    return new Observable(observer => {
      this.http.put(Domain.domain + '/api/news/updateNews/' + newsId, news)
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

  uploadImage(image: any): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append('image' + i, image[i], image[i].name);
    }
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/news/uploadImage', formData)
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

  getNewsByCategory(categoryId): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/news/getNewsByCategory/' + categoryId).subscribe((response: Response) => {
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

  getCategoryInfo(categoryId): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/category/getCategoryInfo/' + categoryId).subscribe((response: Response) => {
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

  getNewsInfo(newsId): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/news/getNewsInfo/' + newsId).subscribe((response: Response) => {
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

  getUserInfo(userId): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/user/getProfile/' + userId).subscribe((response: Response) => {
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

  createComment(comment: CommentCreateInfo): Observable<any> {
    return new Observable(observer => {
      this.http.post(Domain.domain + '/api/comment/createComment', comment)
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

  getComment(newsId): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/comment/getComment/' + newsId).subscribe((response: Response) => {
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

  getNews(): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/news/getNews').subscribe((response: Response) => {
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

  getNewsEachCategory(): Observable<any> {
    return new Observable(observer => {
      this.http.get(Domain.domain + '/api/news/getNewsEachCategory').subscribe((response: Response) => {
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

  deleteNews(newsId): Observable<any> {
    return new Observable(observer => {
      this.http.delete(Domain.domain + '/api/news/deleteNews/' + newsId).subscribe((response: Response) => {
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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private newsService: NewsService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.newsService.userInfo) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
