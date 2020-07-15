import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNewsComponent } from './video-news.component';

describe('VideoNewsComponent', () => {
  let component: VideoNewsComponent;
  let fixture: ComponentFixture<VideoNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
