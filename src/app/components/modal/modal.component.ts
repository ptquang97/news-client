import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import set = Reflect.set;
declare const $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit,OnChanges {
  @Input() showModal: boolean;
  @Input() addTag: boolean;
  @Input() addCategory: boolean;
  constructor() { }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['showModal']);
    if (changes['showModal']) {
      if (this.showModal) {
        setTimeout(() => {
          $('#modal').modal('show');
        });
      }
    }
  }

}
