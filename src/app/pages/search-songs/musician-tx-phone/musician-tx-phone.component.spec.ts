import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianTxPhoneComponent } from './musician-tx-phone.component';

describe('MusicianTxPhoneComponent', () => {
  let component: MusicianTxPhoneComponent;
  let fixture: ComponentFixture<MusicianTxPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicianTxPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicianTxPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
