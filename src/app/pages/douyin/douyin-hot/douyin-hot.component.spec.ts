import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinHotComponent } from './douyin-hot.component';

describe('DouyinHotComponent', () => {
  let component: DouyinHotComponent;
  let fixture: ComponentFixture<DouyinHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinHotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
