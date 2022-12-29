import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrickComponent } from './audio-trick.component';

describe('AudioTrickComponent', () => {
  let component: AudioTrickComponent;
  let fixture: ComponentFixture<AudioTrickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTrickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
