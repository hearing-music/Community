import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRankingComponent } from './set-ranking.component';

describe('SetRankingComponent', () => {
  let component: SetRankingComponent;
  let fixture: ComponentFixture<SetRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
