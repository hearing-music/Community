import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerySonglistComponent } from './query-songlist.component';

describe('QuerySonglistComponent', () => {
  let component: QuerySonglistComponent;
  let fixture: ComponentFixture<QuerySonglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerySonglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerySonglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
