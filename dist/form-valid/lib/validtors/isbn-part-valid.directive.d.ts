import { Validator, AbstractControl } from '@angular/forms';
export declare class IsbnPartValidDirective implements Validator {
    constructor();
    validate(c: AbstractControl): {
        isbnPart34: boolean;
    };
}
