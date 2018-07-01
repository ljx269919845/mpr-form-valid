import { Validator, AbstractControl } from '@angular/forms';

import { globalValidMsgServ } from '../services/global-valid-msg.service';

/**
 * 验证formControl的输入组为float
 */
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
