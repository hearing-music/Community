import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyVideoTrendComponent } from './dyVideoTrend.component';

describe('DyVideoTrendComponent', () => {
  let component: DyVideoTrendComponent;
  let fixture: ComponentFixture<DyVideoTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyVideoTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyVideoTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
