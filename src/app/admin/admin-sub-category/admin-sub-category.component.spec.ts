import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubCategoryComponent } from './admin-sub-category.component';

describe('AdminSubCategoryComponent', () => {
  let component: AdminSubCategoryComponent;
  let fixture: ComponentFixture<AdminSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
