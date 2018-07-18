import { Validator, AbstractControl } from '@angular/forms';
export interface ISBN {
    isbn1: string;
    isbn2: string;
    isbn3: string;
    isbn4: string;
    isbn5: string;
}
export declare class IsbnValidtorDirective implements Validator {
    constructor();
    validate(c: AbstractControl): {
        isbn: boolean;
    };
    private validISBNCode(s);
    private isBarCode(s);
}
