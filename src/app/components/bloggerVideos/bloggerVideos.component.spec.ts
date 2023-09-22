import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerVideosComponent } from './bloggerVideos.component';

describe('BloggerVideosComponent', () => {
  let component: BloggerVideosComponent;
  let fixture: ComponentFixture<BloggerVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloggerVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggerVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
