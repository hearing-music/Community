import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISRCComponent } from './ISRC.component';

describe('ISRCComponent', () => {
  let component: ISRCComponent;
  let fixture: ComponentFixture<ISRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ISRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ISRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
