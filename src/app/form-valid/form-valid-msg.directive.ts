import { Directive, Input } from '@angular/core';

import { FormValidMsgService } from './form-valid-msg.service';

@Directive({
  selector: '[isliFormValidMsg]',
  providers: [FormValidMsgService]
})
export class FormValidMsgDirective {

  @Input('isliFormValidMsg') set validMsg(msg) {
    if (msg) {
      this.msgServ.resetMsg(msg);
    }
  }

  constructor(private msgServ: FormValidMsgService) {
  }

}
