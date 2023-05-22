import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlightenmentSongsComponent } from './enlightenment-songs.component';

describe('EnlightenmentSongsComponent', () => {
  let component: EnlightenmentSongsComponent;
  let fixture: ComponentFixture<EnlightenmentSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlightenmentSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlightenmentSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
