import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FufuleidaComponent } from './fufuleida.component';

describe('FufuleidaComponent', () => {
  let component: FufuleidaComponent;
  let fixture: ComponentFixture<FufuleidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FufuleidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FufuleidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
