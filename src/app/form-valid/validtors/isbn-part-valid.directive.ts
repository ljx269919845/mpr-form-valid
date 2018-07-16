import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { ISBN } from './isbn-validtor.directive';
import { globalValidMsgServ } from '../services/global-valid-msg.service';

const ISBN_PART_VALIDTOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IsbnPartValidDirective),
  multi: true
};

@Directive({
  selector: '[mprIsbnPartValid]',
  providers: [ISBN_PART_VALIDTOR]
})
export class IsbnPartValidDirective implements Validator {

  constructor() {
    globalValidMsgServ.registerMsg('isbnPart34', '第三组和第四组一共为8位数字');
  }

  public validate(c: AbstractControl) {
    if (!(c instanceof FormGroup)) {
      throw new Error('isbn must be a group control');
    }
    const isbn: ISBN = c.value;
    if (!isbn.isbn3 || !isbn.isbn4) {
      return null;
    }
    // 验证第三组和第四组一共为8位数字
    if (isbn.isbn3.length + isbn.isbn4.length !== 8) {
      return { isbnPart34: true };
    }
    return null;
  }

}
