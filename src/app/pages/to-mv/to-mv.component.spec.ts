import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToMvComponent } from './to-mv.component';

describe('ToMvComponent', () => {
  let component: ToMvComponent;
  let fixture: ComponentFixture<ToMvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToMvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToMvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
