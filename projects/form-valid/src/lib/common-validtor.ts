import { Validator, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';

export const VALID_ERROR_MSG = {
    float: '请输入浮点数',
    price: '价格为两位小数！',
};

export class FloatValidtor implements Validator {
    public validate(c: AbstractControl) {
        const floatVal = parseFloat('' + c.value);
        if (isNaN(floatVal)) {
            return { float: true };
        }
        return null;
    }
}

export class PriceValidtor implements Validator {
    public validate(c: AbstractControl) {
        const price = '' + c.value;
        if (/^\d+(.\d{0,2})?$/.test(price)) {
            return null;
        }
        return { price: true };
    }
}
