import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JianyingComponent } from './jianying.component';

describe('JianyingComponent', () => {
  let component: JianyingComponent;
  let fixture: ComponentFixture<JianyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JianyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JianyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
