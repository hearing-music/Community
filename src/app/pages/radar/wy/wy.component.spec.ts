import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WYComponent } from './wy.component';

describe('WYComponent', () => {
  let component: WYComponent;
  let fixture: ComponentFixture<WYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WYComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
