import { Validator, AbstractControl } from '@angular/forms';
export declare class FloatValidtor implements Validator {
    constructor();
    validate(c: AbstractControl): {
        float: boolean;
    };
}
