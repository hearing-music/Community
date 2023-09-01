import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalAudioComponent } from './original-audio.component';

describe('OriginalAudioComponent', () => {
  let component: OriginalAudioComponent;
  let fixture: ComponentFixture<OriginalAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
