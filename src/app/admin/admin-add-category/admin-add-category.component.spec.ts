import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCategoryComponent } from './admin-add-category.component';

describe('AdminAddCategoryComponent', () => {
  let component: AdminAddCategoryComponent;
  let fixture: ComponentFixture<AdminAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
