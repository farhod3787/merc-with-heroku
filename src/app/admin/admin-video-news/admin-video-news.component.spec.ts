import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoNewsComponent } from './admin-video-news.component';

describe('AdminVideoNewsComponent', () => {
  let component: AdminVideoNewsComponent;
  let fixture: ComponentFixture<AdminVideoNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
