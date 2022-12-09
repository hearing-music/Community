import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sing5Component } from './sing5.component';

describe('Sing5Component', () => {
  let component: Sing5Component;
  let fixture: ComponentFixture<Sing5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sing5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sing5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
