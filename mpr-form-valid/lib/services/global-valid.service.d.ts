import { AbstractControl } from '@angular/forms';
export declare class GlobalValidService {
    private validForms;
    private needScroll;
    private scrollElem;
    private doScrollObserv;
    private scrollObserver;
    private scrollOptions;
    constructor();
    registerValidForm(form: AbstractControl, errorHook: Function): void;
    resetNull(): void;
    scrollTo(elem: Element): void;
    validAll(needScroll?: boolean, scrollOptions?: any): boolean;
    unregisterValidForm(form: any, errorHook: Function): void;
    private validFormGroup(formGroup);
    private resetGroup(formGroup);
}
