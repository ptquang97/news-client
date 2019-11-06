import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient , HttpClientModule} from '@angular/common/http';
// import { LSelect2Module } from 'ngx-select2';
import { Page01Component } from './pages/page01/page01.component';
import {NewsService} from './services/news.service';
import {Http, HttpModule} from '@angular/http';
import {Validator} from './common/validator';
import { CKEditorModule } from 'ngx-ckeditor';

import { Page02Component } from './pages/page02/page02.component';
import { HeaderComponent } from './components/header/header.component';
import { Page03Component } from './pages/page03/page03.component';

@NgModule({
  declarations: [
    AppComponent,
    Page01Component,
    Page02Component,
    HeaderComponent,
    Page03Component
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CKEditorModule
    // LSelect2Module
  ],
  providers: [
    NewsService,
    Validator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
