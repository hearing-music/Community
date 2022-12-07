import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianTxComponent } from './musician-tx.component';

describe('MusicianTxComponent', () => {
  let component: MusicianTxComponent;
  let fixture: ComponentFixture<MusicianTxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicianTxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicianTxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
