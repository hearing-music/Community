import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FufuSingerComponent } from './fufu-singer.component';

describe('FufuSingerComponent', () => {
  let component: FufuSingerComponent;
  let fixture: ComponentFixture<FufuSingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FufuSingerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FufuSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
