import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenientPaymentComponent } from './convenient-payment.component';

describe('ConvenientPaymentComponent', () => {
  let component: ConvenientPaymentComponent;
  let fixture: ComponentFixture<ConvenientPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvenientPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenientPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
