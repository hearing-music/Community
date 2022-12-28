import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiryToolsComponent } from './musiry-tools.component';

describe('MusiryToolsComponent', () => {
  let component: MusiryToolsComponent;
  let fixture: ComponentFixture<MusiryToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusiryToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiryToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
