import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewV3Component } from './newV3.component';

describe('NewV3Component', () => {
  let component: NewV3Component;
  let fixture: ComponentFixture<NewV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
