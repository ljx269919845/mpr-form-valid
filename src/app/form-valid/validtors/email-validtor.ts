import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { globalValidMsgServ } from '../services/global-valid-msg.service';

const EMAIL_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailValidtor),
    multi: true
};

@Directive({
    selector: '[mprEmailValid]',
    providers: [EMAIL_VALIDTOR]
})
export class EmailValidtor implements Validator {

    constructor() {
        globalValidMsgServ.registerMsg('emailError', '请输入合法的邮箱');
    }

    validate(contorl: AbstractControl) {
        const email = contorl.value;
        if (!email) { // 允许为空
            return null;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email)) {
            return { emailError: true };
        }
        return null;
    }
}
