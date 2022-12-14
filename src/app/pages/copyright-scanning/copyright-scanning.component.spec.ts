import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightScanningComponent } from './copyright-scanning.component';

describe('CopyrightScanningComponent', () => {
  let component: CopyrightScanningComponent;
  let fixture: ComponentFixture<CopyrightScanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightScanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
