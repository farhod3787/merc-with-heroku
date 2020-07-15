import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewsComponent } from './admin-add-news.component';

describe('AdminAddNewsComponent', () => {
  let component: AdminAddNewsComponent;
  let fixture: ComponentFixture<AdminAddNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
