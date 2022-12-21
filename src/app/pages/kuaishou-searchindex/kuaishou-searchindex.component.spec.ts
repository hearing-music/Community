import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuaishouSearchindexComponent } from './kuaishou-searchindex.component';

describe('KuaishouSearchindexComponent', () => {
  let component: KuaishouSearchindexComponent;
  let fixture: ComponentFixture<KuaishouSearchindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuaishouSearchindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuaishouSearchindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
