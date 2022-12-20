import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsddPageComponent } from './lsdd-page.component';

describe('LsddPageComponent', () => {
  let component: LsddPageComponent;
  let fixture: ComponentFixture<LsddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
