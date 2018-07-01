import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupValidComponent } from './form-group-valid/form-group-valid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidModule } from '../form-valid';

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
  declarations: [FormGroupValidComponent]
})
export class FormGroupValidModule { }
