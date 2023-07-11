import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QqLabelComponent } from './qq-label.component';

describe('QqLabelComponent', () => {
  let component: QqLabelComponent;
  let fixture: ComponentFixture<QqLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QqLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QqLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
