import { Validator, AbstractControl } from '@angular/forms';
export declare class FloatOnlyValidtorDirective implements Validator {
    constructor();
    validate(c: AbstractControl): {
        float: boolean;
    };
}
