import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { globalValidMsgServ } from '../services/global-valid-msg.service';

const PRICE_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PriceValidtor),
    multi: true
};

@Directive({
    selector: '[mprPriceValid]',
    providers: [PRICE_VALIDTOR]
})
export class PriceValidtor implements Validator {

    constructor() {
        globalValidMsgServ.registerMsg('price', '价格为两位小数');
    }

    public validate(c: AbstractControl) {
        const price = '' + c.value;
        if (/^\d+(.\d{0,2})?$/.test(price)) {
            return null;
        }
        return { price: true };
    }
}
