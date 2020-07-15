import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersWaitingComponent } from './admin-orders-waiting.component';

describe('AdminOrdersWaitingComponent', () => {
  let component: AdminOrdersWaitingComponent;
  let fixture: ComponentFixture<AdminOrdersWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
