import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { globalValidMsgServ } from '../services/global-valid-msg.service';

const ISBN_HEADER_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IsbnHeaderValidDirective),
    multi: true
};

@Directive({
  selector: '[mprIsbnHeaderValid]',
  providers: [ISBN_HEADER_VALIDTOR]
})
export class IsbnHeaderValidDirective implements Validator {

  constructor() {
    globalValidMsgServ.registerMsg('isbnHeader', '第一组必须为978或979');
  }

  validate(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    if (['999', '978', '979', '000'].indexOf(c.value) < 0) {
      return { isbnHeader: true};
    }
    return null;
  }

}
