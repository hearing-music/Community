import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McscSearchCNComponent } from './mcsc-search-cn.component';

describe('McscSearchCNComponent', () => {
  let component: McscSearchCNComponent;
  let fixture: ComponentFixture<McscSearchCNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McscSearchCNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McscSearchCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
