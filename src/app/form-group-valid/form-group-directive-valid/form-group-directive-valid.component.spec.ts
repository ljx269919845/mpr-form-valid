import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupDirectiveValidComponent } from './form-group-directive-valid.component';

describe('FormGroupDirectiveValidComponent', () => {
  let component: FormGroupDirectiveValidComponent;
  let fixture: ComponentFixture<FormGroupDirectiveValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupDirectiveValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupDirectiveValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
