import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuwoPhoneComponent } from './kuwo-phone.component';

describe('KuwoPhoneComponent', () => {
  let component: KuwoPhoneComponent;
  let fixture: ComponentFixture<KuwoPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuwoPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuwoPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
