import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoIdentifyingTextComponent } from './photo-identifying-text.component';

describe('PhotoIdentifyingTextComponent', () => {
  let component: PhotoIdentifyingTextComponent;
  let fixture: ComponentFixture<PhotoIdentifyingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoIdentifyingTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoIdentifyingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
