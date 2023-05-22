import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DYComponent } from './dy.component';

describe('DYComponent', () => {
  let component: DYComponent;
  let fixture: ComponentFixture<DYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DYComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
