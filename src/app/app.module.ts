import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient , HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {NewsService} from './services/news.service';
import {Http, HttpModule} from '@angular/http';
import {Validator} from './common/validator';
import { CKEditorModule } from '../../node_modules/ngx-ckeditor/lib/ck-editor.module';
import { LSelect2Module } from 'ngx-select2';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateNewsComponent } from './pages/create-news/create-news.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SweetAlertService } from 'ngx-sweetalert2';
import { ModalComponent } from './components/modal/modal.component';
import { CategoryNewsComponent } from './pages/category-news/category-news.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import {LocalStorage} from './services/local-storage.service';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    HeaderComponent,
    CreateNewsComponent,
    LogoutComponent,
    ModalComponent,
    CategoryNewsComponent,
    NewsDetailComponent,
    FooterComponent,
    ManagePageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CKEditorModule,
    LSelect2Module
  ],
  providers: [
    NewsService,
    Validator,
    SweetAlertService,
    LocalStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
