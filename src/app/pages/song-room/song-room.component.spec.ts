import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRoomComponent } from './song-room.component';

describe('SongRoomComponent', () => {
  let component: SongRoomComponent;
  let fixture: ComponentFixture<SongRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
