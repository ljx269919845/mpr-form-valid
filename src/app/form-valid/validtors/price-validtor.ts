import { Validator, AbstractControl } from '@angular/forms';

import { globalValidMsgServ } from '../services/global-valid-msg.service';


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
