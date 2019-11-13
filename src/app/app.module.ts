import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient , HttpClientModule} from '@angular/common/http';
import { Page01Component } from './pages/page01/page01.component';
import {NewsService} from './services/news.service';
import {Http, HttpModule} from '@angular/http';
import {Validator} from './common/validator';
import { CKEditorModule } from '../../node_modules/ngx-ckeditor/lib/ck-editor.module';
import { LSelect2Module } from 'ngx-select2';
import { Page02Component } from './pages/page02/page02.component';
import { HeaderComponent } from './components/header/header.component';
import { Page03Component } from './pages/page03/page03.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SweetAlertService } from 'ngx-sweetalert2';
import { ModalComponent } from './components/modal/modal.component';
import { Page04Component } from './pages/page04/page04.component';
import { Page05Component } from './pages/page05/page05.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    Page01Component,
    Page02Component,
    HeaderComponent,
    Page03Component,
    LogoutComponent,
    ModalComponent,
    Page04Component,
    Page05Component,
    FooterComponent
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
    SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
