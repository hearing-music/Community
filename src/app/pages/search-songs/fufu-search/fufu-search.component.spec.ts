import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FufuSearchComponent } from './fufu-search.component';

describe('FufuSearchComponent', () => {
  let component: FufuSearchComponent;
  let fixture: ComponentFixture<FufuSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FufuSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FufuSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
