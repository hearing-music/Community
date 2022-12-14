import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YinghuoComponent } from './yinghuo.component';

describe('YinghuoComponent', () => {
  let component: YinghuoComponent;
  let fixture: ComponentFixture<YinghuoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YinghuoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YinghuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
