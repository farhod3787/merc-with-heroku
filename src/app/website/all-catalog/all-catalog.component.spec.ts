import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCatalogComponent } from './all-catalog.component';

describe('AllCatalogComponent', () => {
  let component: AllCatalogComponent;
  let fixture: ComponentFixture<AllCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
