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

@NgModule({
  declarations: [
    AppComponent,
    Page01Component
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
    // LSelect2Module
  ],
  providers: [
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
