import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouDiZhuComponent } from './dou-di-zhu.component';

describe('DouDiZhuComponent', () => {
  let component: DouDiZhuComponent;
  let fixture: ComponentFixture<DouDiZhuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouDiZhuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouDiZhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
