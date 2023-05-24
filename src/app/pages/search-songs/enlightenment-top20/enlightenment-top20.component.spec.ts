import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlightenmentTop20Component } from './enlightenment-top20.component';

describe('EnlightenmentTop20Component', () => {
  let component: EnlightenmentTop20Component;
  let fixture: ComponentFixture<EnlightenmentTop20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlightenmentTop20Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlightenmentTop20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
