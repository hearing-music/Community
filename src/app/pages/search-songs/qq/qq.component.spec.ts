import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QqComponent } from './qq.component';

describe('QqComponent', () => {
  let component: QqComponent;
  let fixture: ComponentFixture<QqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
