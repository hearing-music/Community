import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeOfUseComponent } from './volumeOfUse.component';

describe('VolumeOfUseComponent', () => {
  let component: VolumeOfUseComponent;
  let fixture: ComponentFixture<VolumeOfUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeOfUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
