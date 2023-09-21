import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyHotComponent } from './dy-hot.component';

describe('DyHotComponent', () => {
  let component: DyHotComponent;
  let fixture: ComponentFixture<DyHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyHotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
