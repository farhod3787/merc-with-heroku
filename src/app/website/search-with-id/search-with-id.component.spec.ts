import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWithIDComponent } from "./search-with-id.component";

describe('SearchWithIDComponent', () => {
  let component: SearchWithIDComponent;
  let fixture: ComponentFixture<SearchWithIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWithIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWithIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
