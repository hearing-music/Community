import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McscSearchHKComponent } from './mcsc-search-hk.component';

describe('McscSearchHKComponent', () => {
  let component: McscSearchHKComponent;
  let fixture: ComponentFixture<McscSearchHKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McscSearchHKComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McscSearchHKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
