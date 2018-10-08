import { AbstractControl } from '@angular/forms';
export declare class GlobalValidService {
    private validForms;
    constructor();
    registerValidForm(form: AbstractControl): void;
    resetNull(): void;
    validAll(): boolean;
    unregisterValidForm(form: any): void;
    private validFormGroup(formGroup);
    private resetGroup(formGroup);
}
