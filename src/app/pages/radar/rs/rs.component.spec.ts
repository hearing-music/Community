import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSComponent } from './rs.component';

describe('RSComponent', () => {
  let component: RSComponent;
  let fixture: ComponentFixture<RSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
