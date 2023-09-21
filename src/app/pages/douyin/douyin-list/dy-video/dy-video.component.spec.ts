import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyVideoComponent } from './dy-video.component';

describe('DyVideoComponent', () => {
  let component: DyVideoComponent;
  let fixture: ComponentFixture<DyVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
