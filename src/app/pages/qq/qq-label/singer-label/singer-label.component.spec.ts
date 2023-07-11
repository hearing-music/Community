import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerLabelComponent } from './singer-label.component';

describe('SingerLabelComponent', () => {
  let component: SingerLabelComponent;
  let fixture: ComponentFixture<SingerLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingerLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
