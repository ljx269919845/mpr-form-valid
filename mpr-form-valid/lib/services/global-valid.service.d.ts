import { AbstractControl } from '@angular/forms';
export declare class GlobalValidService {
    private validForms;
    constructor();
    registerValidForm(form: AbstractControl, errorHook: Function): void;
    resetNull(): void;
    validAll(): boolean;
    unregisterValidForm(form: any, errorHook: Function): void;
    private validFormGroup(formGroup);
    private resetGroup(formGroup);
}
