import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FufuBillboardComponent } from './fufu-billboard.component';

describe('FufuBillboardComponent', () => {
  let component: FufuBillboardComponent;
  let fixture: ComponentFixture<FufuBillboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FufuBillboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FufuBillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
