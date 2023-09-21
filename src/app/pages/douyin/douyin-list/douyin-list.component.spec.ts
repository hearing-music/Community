import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinListComponent } from './douyin-list.component';

describe('DouyinListComponent', () => {
  let component: DouyinListComponent;
  let fixture: ComponentFixture<DouyinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
