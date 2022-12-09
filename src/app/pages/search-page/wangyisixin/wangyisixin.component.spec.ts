import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WangyisixinComponent } from './wangyisixin.component';

describe('WangyisixinComponent', () => {
  let component: WangyisixinComponent;
  let fixture: ComponentFixture<WangyisixinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WangyisixinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WangyisixinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
