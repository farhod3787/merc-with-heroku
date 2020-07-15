import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignComponent } from './admin-sign.component';

describe('AdminSignComponent', () => {
  let component: AdminSignComponent;
  let fixture: ComponentFixture<AdminSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
