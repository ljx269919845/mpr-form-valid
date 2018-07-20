import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormControlValidComponent } from './form-control-valid/form-control-valid.component';
import { FormValidMsgDirective } from './directives/form-valid-msg.directive';
import { GlobalValidService } from './services/global-valid.service';
import { FormValidMsgService } from './services/form-valid-msg.service';
import { IsbnValidtorDirective } from './validtors/isbn-validtor.directive';
import { IsbnPartValidDirective } from './validtors/isbn-part-valid.directive';
import { IsbnHeaderValidDirective } from './validtors/isbn-header-valid.directive';
import { FloatOnlyValidtorDirective } from './validtors/float-only-validtor.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    FormControlValidComponent,
    FormValidMsgDirective,
    IsbnValidtorDirective,
    IsbnPartValidDirective,
    IsbnHeaderValidDirective,
    FloatOnlyValidtorDirective,
  ],
  exports: [
    FormControlValidComponent,
    FormValidMsgDirective,
    IsbnValidtorDirective,
    IsbnPartValidDirective,
    IsbnHeaderValidDirective,
    ReactiveFormsModule,
    FormsModule,
    FloatOnlyValidtorDirective
  ],
  providers: [
    GlobalValidService,
    FormValidMsgService
  ]
})
export class FormValidModule { }
