import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagNewsComponent } from './tag-news.component';

describe('TagNewsComponent', () => {
  let component: TagNewsComponent;
  let fixture: ComponentFixture<TagNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
