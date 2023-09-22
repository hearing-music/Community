import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyHotDetailComponent } from './dyHotDetail.component';

describe('DyHotDetailComponent', () => {
  let component: DyHotDetailComponent;
  let fixture: ComponentFixture<DyHotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyHotDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyHotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
