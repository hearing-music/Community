import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyAuthorComponent } from './dyAuthor.component';

describe('DyAuthorComponent', () => {
  let component: DyAuthorComponent;
  let fixture: ComponentFixture<DyAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
