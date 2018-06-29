import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlValidComponent } from './form-control-valid.component';

describe('FormControlValidComponent', () => {
  let component: FormControlValidComponent;
  let fixture: ComponentFixture<FormControlValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
