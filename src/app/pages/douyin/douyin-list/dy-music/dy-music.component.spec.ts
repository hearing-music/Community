import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyMusicComponent } from './dy-music.component';

describe('DyMusicComponent', () => {
  let component: DyMusicComponent;
  let fixture: ComponentFixture<DyMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
