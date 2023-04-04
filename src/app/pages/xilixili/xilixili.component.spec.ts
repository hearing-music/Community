import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XilixiliComponent } from './xilixili.component';

describe('XilixiliComponent', () => {
  let component: XilixiliComponent;
  let fixture: ComponentFixture<XilixiliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XilixiliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XilixiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
