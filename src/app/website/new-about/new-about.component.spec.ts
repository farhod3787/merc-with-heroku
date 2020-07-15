import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAboutComponent } from './new-about.component';

describe('NewAboutComponent', () => {
  let component: NewAboutComponent;
  let fixture: ComponentFixture<NewAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
