import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlValidComponent } from './form-control-valid/form-control-valid.component';
import { FormValidMsgDirective } from './form-valid-msg.directive';
import { GlobalValidService } from './global-valid.service';
import { FormValidMsgService } from './form-valid-msg.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormControlValidComponent,
    FormValidMsgDirective
  ],
  exports: [
    FormControlValidComponent,
    FormValidMsgDirective
  ],
  providers: [
    GlobalValidService,
    FormValidMsgService
  ]
})
export class FormValidModule { }
