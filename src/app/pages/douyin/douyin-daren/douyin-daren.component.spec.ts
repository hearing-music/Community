import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinDarenComponent } from './douyin-daren.component';

describe('DouyinDarenComponent', () => {
  let component: DouyinDarenComponent;
  let fixture: ComponentFixture<DouyinDarenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinDarenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinDarenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
