import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyYyhComponent } from './dy-yyh.component';

describe('DyYyhComponent', () => {
  let component: DyYyhComponent;
  let fixture: ComponentFixture<DyYyhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyYyhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyYyhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
