import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KugouSoaringComponent } from './kugou-soaring.component';

describe('KugouSoaringComponent', () => {
  let component: KugouSoaringComponent;
  let fixture: ComponentFixture<KugouSoaringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KugouSoaringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KugouSoaringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
