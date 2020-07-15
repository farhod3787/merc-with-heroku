import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWeComponent } from './about-we.component';

describe('AboutWeComponent', () => {
  let component: AboutWeComponent;
  let fixture: ComponentFixture<AboutWeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutWeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
