import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineOilComponent } from './engine-oil.component';

describe('EngineOilComponent', () => {
  let component: EngineOilComponent;
  let fixture: ComponentFixture<EngineOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
