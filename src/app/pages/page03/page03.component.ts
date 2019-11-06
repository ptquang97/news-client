import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page03',
  templateUrl: './page03.component.html',
  styleUrls: ['./page03.component.scss']
})
export class Page03Component implements OnInit {
  public editorValue = '';

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.editorValue);
  }
}
