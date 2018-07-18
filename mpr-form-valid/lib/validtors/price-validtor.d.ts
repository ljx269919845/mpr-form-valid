import { Validator, AbstractControl } from '@angular/forms';
export declare class PriceValidtor implements Validator {
    constructor();
    validate(c: AbstractControl): {
        price: boolean;
    };
}
