import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlightenmentComponent } from './enlightenment.component';

describe('EnlightenmentComponent', () => {
  let component: EnlightenmentComponent;
  let fixture: ComponentFixture<EnlightenmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlightenmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlightenmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
