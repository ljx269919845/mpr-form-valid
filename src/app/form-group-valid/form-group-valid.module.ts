import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupValidComponent } from './form-group-valid/form-group-valid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidModule } from '../../../dist/form-valid';
import { FormValidOnlyComponent } from './form-valid-only/form-valid-only.component';
import { FormGroupDirectiveValidComponent } from './form-group-directive-valid/form-group-directive-valid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidModule
  ],
  exports: [
    FormGroupValidComponent
  ],
  declarations: [FormGroupValidComponent, FormValidOnlyComponent, FormGroupDirectiveValidComponent]
})
export class FormGroupValidModule { }
