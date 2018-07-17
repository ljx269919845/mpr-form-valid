import { Validator, AbstractControl } from '@angular/forms';
export declare class IsbnHeaderValidDirective implements Validator {
    constructor();
    validate(c: AbstractControl): {
        isbnHeader: boolean;
    };
}
