import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WangyiyunPhoneComponent } from './wangyiyun-phone.component';

describe('WangyiyunPhoneComponent', () => {
  let component: WangyiyunPhoneComponent;
  let fixture: ComponentFixture<WangyiyunPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WangyiyunPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WangyiyunPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
