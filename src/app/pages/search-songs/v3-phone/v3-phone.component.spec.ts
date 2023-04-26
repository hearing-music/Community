import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V3PhoneComponent } from './v3-phone.component';

describe('V3PhoneComponent', () => {
  let component: V3PhoneComponent;
  let fixture: ComponentFixture<V3PhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ V3PhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(V3PhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
