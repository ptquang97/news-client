import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogoutComponent} from './components/logout/logout.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {CreateNewsComponent} from './pages/create-news/create-news.component';
import {CategoryNewsComponent} from './pages/category-news/category-news.component';
import {NewsDetailComponent} from './pages/news-detail/news-detail.component';
import {ManagePageComponent} from './pages/manage-page/manage-page.component';
import {TagNewsComponent} from './pages/tag-news/tag-news.component';
import {SearchNewsComponent} from './pages/search-news/search-news.component';
import {AuthGuard} from './services/news.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'admin',
    component: CreateNewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/:newsId',
    component: CreateNewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'page/:categoryId',
    component: CategoryNewsComponent
  },
  {
    path: 'news/:newsId',
    component: NewsDetailComponent
  },
  {
    path: 'manage',
    component: ManagePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tag/:tagId',
    component: TagNewsComponent
  },
  {
    path: 'search/:keyWord',
    component: SearchNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
