import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WangyiyunComponent } from './wangyiyun.component';

describe('WangyiyunComponent', () => {
  let component: WangyiyunComponent;
  let fixture: ComponentFixture<WangyiyunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WangyiyunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WangyiyunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
