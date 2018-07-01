import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlValidComponent } from './form-control-valid/form-control-valid.component';
import { FormValidMsgDirective } from './directives/form-valid-msg.directive';
import { GlobalValidService } from './services/global-valid.service';
import { FormValidMsgService } from './services/form-valid-msg.service';

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
