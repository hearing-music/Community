import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsddComponent } from './lsdd.component';

describe('LsddComponent', () => {
  let component: LsddComponent;
  let fixture: ComponentFixture<LsddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
