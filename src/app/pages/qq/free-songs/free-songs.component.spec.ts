import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSongsComponent } from './free-songs.component';

describe('FreeSongsComponent', () => {
  let component: FreeSongsComponent;
  let fixture: ComponentFixture<FreeSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
