import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRankingComponent } from './get-ranking.component';

describe('GetRankingComponent', () => {
  let component: GetRankingComponent;
  let fixture: ComponentFixture<GetRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
