import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { globalValidMsgServ } from '../services/global-valid-msg.service';

const FLOAT_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FloatValidtor),
    multi: true
};

@Directive({
    selector: '[mprFloatOnly]',
    providers: [FLOAT_VALIDTOR]
})
export class FloatValidtor implements Validator {
    constructor() {
        globalValidMsgServ.registerMsg('float', '请输入浮点数');
    }

    public validate(c: AbstractControl) {
        const floatVal = parseFloat('' + c.value);
        if (isNaN(floatVal)) {
            return { float: true };
        }
        return null;
    }
}
