import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuwoComponent } from './kuwo.component';

describe('KuwoComponent', () => {
  let component: KuwoComponent;
  let fixture: ComponentFixture<KuwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
