import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwollenKsEeListComponent } from './swollen-ks-ee-list.component';

describe('SwollenKsEeListComponent', () => {
  let component: SwollenKsEeListComponent;
  let fixture: ComponentFixture<SwollenKsEeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwollenKsEeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwollenKsEeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
