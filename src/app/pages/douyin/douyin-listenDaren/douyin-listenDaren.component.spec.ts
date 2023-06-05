import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinListenDarenComponent } from './douyin-listenDaren.component';

describe('DouyinListenDarenComponent', () => {
  let component: DouyinListenDarenComponent;
  let fixture: ComponentFixture<DouyinListenDarenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinListenDarenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinListenDarenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
