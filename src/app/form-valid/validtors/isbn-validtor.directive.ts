import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';

export interface ISBN {
  isbn1: string;
  isbn2: string;
  isbn3: string;
  isbn4: string;
  isbn5: string;
}

const ISBN_VALIDTOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IsbnValidtorDirective),
  multi: true
};

@Directive({
  selector: '[mprIsbnValid]',
  providers: [ISBN_VALIDTOR]
})
export class IsbnValidtorDirective implements Validator {

  constructor() {
    globalValidMsgServ.registerMsg('isbn', '请输入正确的ISBN号');
  }

  public validate(c: AbstractControl) {
    if (!(c instanceof FormGroup)) {
      throw new Error('isbn must be a group control');
    }
    const isbn: ISBN = c.value;
    // 不验证非空
    if (!isbn.isbn1 || !isbn.isbn2 || !isbn.isbn3 || !isbn.isbn4 || !isbn.isbn5) {
      return null;
    }

    if (this.validISBNCode([isbn.isbn1, isbn.isbn2, isbn.isbn3, isbn.isbn4, isbn.isbn5].join(''))) {
      return { isbn: true };
    }
    return null;
  }

  private validISBNCode(s) {
    if (s === '9999999999999') {
      return true;
    }
    if (!this.isBarCode(s)) {
      return false;
    }
    let a = 0, b = 0, c = 0, d = 0, e;
    for (let i = 1; i <= 12; i++) {
      const sc = parseInt(s[i - 1], 10);
      if (i <= 12 && i % 2 === 0) {
        a += sc;
      } else if (i <= 11 && i % 2 === 1) {
        b += sc;
      }
    }
    c = a * 3;
    d = b + c;
    if (d % 10 === 0) {
      e = d - d;
    } else {
      e = d + (10 - d % 10) - d;
    }
    return e === parseInt(s[12], 10);
  }

  private isBarCode(s): boolean {
    if (s.length !== 13) {
      return false;
    }
    const reg = new RegExp(/^[0-9]{12}$/);
    return reg.exec(s.substring(0, 12)) != null;
  }
}
