import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinComponent } from './magazin.component';

describe('MagazinComponent', () => {
  let component: MagazinComponent;
  let fixture: ComponentFixture<MagazinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
