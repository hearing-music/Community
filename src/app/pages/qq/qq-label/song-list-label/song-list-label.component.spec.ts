import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListLabelComponent } from './song-list-label.component';

describe('SongListLabelComponent', () => {
  let component: SongListLabelComponent;
  let fixture: ComponentFixture<SongListLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongListLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongListLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
