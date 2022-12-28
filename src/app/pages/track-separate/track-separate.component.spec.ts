import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSeparateComponent } from './track-separate.component';

describe('TrackSeparateComponent', () => {
  let component: TrackSeparateComponent;
  let fixture: ComponentFixture<TrackSeparateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSeparateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSeparateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
