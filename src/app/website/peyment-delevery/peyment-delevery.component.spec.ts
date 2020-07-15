import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeymentDeleveryComponent } from './peyment-delevery.component';

describe('PeymentDeleveryComponent', () => {
  let component: PeymentDeleveryComponent;
  let fixture: ComponentFixture<PeymentDeleveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeymentDeleveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeymentDeleveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
