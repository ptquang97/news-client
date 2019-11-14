import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page06Component } from './page06.component';

describe('Page06Component', () => {
  let component: Page06Component;
  let fixture: ComponentFixture<Page06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
