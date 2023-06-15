import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinVideoComponent } from './douyin-video.component';

describe('DouyinVideoComponent', () => {
  let component: DouyinVideoComponent;
  let fixture: ComponentFixture<DouyinVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
