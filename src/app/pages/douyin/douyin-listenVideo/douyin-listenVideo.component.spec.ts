import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinListenVideoComponent } from './douyin-listenVideo.component';

describe('DouyinListenVideoComponent', () => {
  let component: DouyinListenVideoComponent;
  let fixture: ComponentFixture<DouyinListenVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinListenVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinListenVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
