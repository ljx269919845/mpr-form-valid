import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidOnlyComponent } from './form-valid-only.component';

describe('FormValidOnlyComponent', () => {
  let component: FormValidOnlyComponent;
  let fixture: ComponentFixture<FormValidOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormValidOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
