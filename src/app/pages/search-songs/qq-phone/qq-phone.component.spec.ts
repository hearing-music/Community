import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QqPhoneComponent } from './qq-phone.component';

describe('QqPhoneComponent', () => {
  let component: QqPhoneComponent;
  let fixture: ComponentFixture<QqPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QqPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QqPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
