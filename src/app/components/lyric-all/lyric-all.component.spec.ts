import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricAllComponent } from './lyric-all.component';

describe('LyricAllComponent', () => {
  let component: LyricAllComponent;
  let fixture: ComponentFixture<LyricAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
