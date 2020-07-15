import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersSuccessComponent } from './admin-orders-success.component';

describe('AdminOrdersSuccessComponent', () => {
  let component: AdminOrdersSuccessComponent;
  let fixture: ComponentFixture<AdminOrdersSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
