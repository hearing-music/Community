import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinPopularAccountsComponent } from './douyin-popular-accounts.component';

describe('DouyinPopularAccountsComponent', () => {
  let component: DouyinPopularAccountsComponent;
  let fixture: ComponentFixture<DouyinPopularAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinPopularAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinPopularAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
