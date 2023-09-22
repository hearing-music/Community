import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisingHotComponent } from './rising-hot.component';

describe('RisingHotComponent', () => {
  let component: RisingHotComponent;
  let fixture: ComponentFixture<RisingHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisingHotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RisingHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
