import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FufuHotComponent } from './fufu-hot.component';

describe('FufuHotComponent', () => {
  let component: FufuHotComponent;
  let fixture: ComponentFixture<FufuHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FufuHotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FufuHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
