import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightSearchComponent } from './copyright-search.component';

describe('CopyrightSearchComponent', () => {
  let component: CopyrightSearchComponent;
  let fixture: ComponentFixture<CopyrightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
