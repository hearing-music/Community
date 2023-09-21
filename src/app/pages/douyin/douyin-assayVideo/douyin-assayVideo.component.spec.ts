import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouyinAssayVidedoComponent } from './douyin-assayVideo.component';

describe('DouyinAssayVidedoComponent', () => {
  let component: DouyinAssayVidedoComponent;
  let fixture: ComponentFixture<DouyinAssayVidedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DouyinAssayVidedoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DouyinAssayVidedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
