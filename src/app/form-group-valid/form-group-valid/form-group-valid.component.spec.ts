import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupValidComponent } from './form-group-valid.component';

describe('FormGroupValidComponent', () => {
  let component: FormGroupValidComponent;
  let fixture: ComponentFixture<FormGroupValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
