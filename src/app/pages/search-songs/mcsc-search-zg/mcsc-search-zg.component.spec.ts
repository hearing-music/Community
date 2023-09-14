import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McscSearchZGComponent } from './mcsc-search-zg.component';

describe('McscSearchZGComponent', () => {
  let component: McscSearchZGComponent;
  let fixture: ComponentFixture<McscSearchZGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McscSearchZGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McscSearchZGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
