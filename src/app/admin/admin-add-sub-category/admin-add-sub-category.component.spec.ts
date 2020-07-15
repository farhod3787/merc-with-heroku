import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSubCategoryComponent } from './admin-add-sub-category.component';

describe('AdminAddSubCategoryComponent', () => {
  let component: AdminAddSubCategoryComponent;
  let fixture: ComponentFixture<AdminAddSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
