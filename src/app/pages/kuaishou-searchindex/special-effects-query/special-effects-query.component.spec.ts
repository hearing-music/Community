import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEffectsQueryComponent } from './special-effects-query.component';

describe('SpecialEffectsQueryComponent', () => {
  let component: SpecialEffectsQueryComponent;
  let fixture: ComponentFixture<SpecialEffectsQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialEffectsQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEffectsQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
