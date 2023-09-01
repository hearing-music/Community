import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistVisualizationComponent } from './artist-visualization.component';

describe('ArtistVisualizationComponent', () => {
  let component: ArtistVisualizationComponent;
  let fixture: ComponentFixture<ArtistVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
