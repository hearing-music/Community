import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightCheckComponent } from './copyright-check.component';

describe('CopyrightCheckComponent', () => {
  let component: CopyrightCheckComponent;
  let fixture: ComponentFixture<CopyrightCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
