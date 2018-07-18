import { Validator, AbstractControl } from '@angular/forms';
export declare class EmailValidtor implements Validator {
    constructor();
    validate(contorl: AbstractControl): {
        emailError: boolean;
    };
}
