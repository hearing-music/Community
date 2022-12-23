import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightLinkComponent } from './copyright-link.component';

describe('CopyrightLinkComponent', () => {
  let component: CopyrightLinkComponent;
  let fixture: ComponentFixture<CopyrightLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
