/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
export class GlobalValidService {
    constructor() {
        this.validForms = [];
    }
    /**
     * @param {?} form
     * @param {?} errorHook
     * @return {?}
     */
    registerValidForm(form, errorHook) {
        let /** @type {?} */ index = this.validForms.findIndex((elem) => {
            return elem.form == form;
        });
        if (index >= 0) {
            this.validForms[index].count += 1;
        }
        else {
            index = this.validForms.length;
            this.validForms.push({ form: form, count: 1, errorHooks: [] });
        }
        if (errorHook) {
            this.validForms[index].errorHooks.push(errorHook);
        }
    }
    /**
     * @return {?}
     */
    resetNull() {
        this.validForms.forEach((elemForm) => {
            if (elemForm.form instanceof FormControl) {
                elemForm.form.reset(null, { emitEvent: false, onlySelf: true });
                elemForm.form.setErrors(null, { emitEvent: true });
                elemForm.form.markAsPristine();
            }
            else {
                elemForm.form.reset({}, { emitEvent: false, onlySelf: true });
                elemForm.form.setErrors(null, { emitEvent: false });
                this.resetGroup(elemForm.form);
            }
            if (elemForm['sub']) {
                elemForm['sub'].unsubscribe();
            }
            elemForm.form['_reset'] = true;
            const /** @type {?} */ sub = elemForm.form.valueChanges.subscribe(() => {
                elemForm.form['_reset'] = false;
                elemForm['sub'].unsubscribe();
                elemForm['sub'] = null;
            });
            elemForm['sub'] = sub;
        });
    }
    /**
     * @return {?}
     */
    validAll() {
        let /** @type {?} */ result = true;
        this.validForms.forEach((elemForm) => {
            if (elemForm.form.disabled) {
                return;
            }
            if (!elemForm.form.valid || elemForm.form['_reset']) {
                //  if (elemForm.form['_reset']) {
                //   elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
                //  }
                //  elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
                elemForm.form.markAsDirty();
                if (elemForm.form instanceof FormControl) {
                    console.log(elemForm.form.status, elemForm.form);
                    if (elemForm.form['_reset']) {
                        elemForm.form['_reset'] = false;
                        elemForm.form.setValue(elemForm.form.value, {
                            emitModelToViewChange: false,
                            emitViewToModelChange: false,
                            onlySelf: true,
                            emitEvent: false
                        });
                    }
                    elemForm.form.statusChanges.emit(elemForm.form.status);
                }
                else {
                    this.validFormGroup(elemForm.form);
                }
                if (!elemForm.form.valid) {
                    elemForm.errorHooks.forEach((errorHook) => {
                        errorHook(elemForm.form);
                    });
                }
            }
            result = elemForm.form.valid && result;
        });
        return result;
    }
    /**
     * @param {?} form
     * @param {?} errorHook
     * @return {?}
     */
    unregisterValidForm(form, errorHook) {
        const /** @type {?} */ index = this.validForms.findIndex((elem) => {
            return elem.form == form;
        });
        if (index >= 0 && this.validForms[index].count > 1) {
            this.validForms[index].count -= 1;
            if (errorHook) {
                const /** @type {?} */ fIndex = this.validForms[index].errorHooks.indexOf(errorHook);
                if (fIndex != -1) {
                    this.validForms[index].errorHooks.splice(fIndex, 1);
                }
            }
        }
        else {
            this.validForms.splice(index, 1);
        }
    }
    /**
     * @param {?} formGroup
     * @return {?}
     */
    validFormGroup(formGroup) {
        if (formGroup.disabled) {
            return;
        }
        const /** @type {?} */ formControls = formGroup.controls;
        for (const /** @type {?} */ name in formControls) {
            if (!formControls.hasOwnProperty(name)) {
                continue;
            }
            if (formControls[name].disabled) {
                continue;
            }
            if (formControls[name] instanceof FormGroup) {
                this.validFormGroup(/** @type {?} */ (formControls[name]));
            }
            if (!formControls[name].valid || formControls[name]['_reset']) {
                formControls[name].markAsDirty();
                console.log(formControls[name].status, formControls[name]);
                if (formControls[name]['_reset']) {
                    formControls[name]['_reset'] = false;
                    formControls[name].setValue(formControls[name].value, {
                        emitModelToViewChange: false,
                        emitViewToModelChange: false,
                        onlySelf: true,
                        emitEvent: false
                    });
                }
                (/** @type {?} */ (formControls[name].statusChanges)).emit(formControls[name].status);
            }
            if (!formGroup.valid || formGroup['_reset']) {
                formGroup.markAsDirty();
                if (formGroup['_reset']) {
                    formGroup['_reset'] = false;
                    formGroup.setValue(formGroup.value, { onlySelf: true, emitEvent: false });
                }
                (/** @type {?} */ (formGroup.statusChanges)).emit(formControls[name].status);
            }
        }
    }
    /**
     * @param {?} formGroup
     * @return {?}
     */
    resetGroup(formGroup) {
        const /** @type {?} */ formControls = formGroup.controls;
        for (const /** @type {?} */ name in formControls) {
            if (!formControls.hasOwnProperty(name)) {
                continue;
            }
            if (formControls[name] instanceof FormGroup) {
                formControls[name].setErrors(null, { emitEvent: false });
                this.resetGroup(/** @type {?} */ (formControls[name]));
            }
            else {
                formControls[name].setErrors(null, { emitEvent: true });
            }
            formControls[name]['_reset'] = true;
            formControls[name].markAsPristine();
        }
    }
}
GlobalValidService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GlobalValidService.ctorParameters = () => [];
function GlobalValidService_tsickle_Closure_declarations() {
    /** @type {?} */
    GlobalValidService.prototype.validForms;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsTUFBTTtJQUdKOzBCQUZpQyxFQUFFO0tBRW5COzs7Ozs7SUFFVCxpQkFBaUIsQ0FBQyxJQUFxQixFQUFFLFNBQW1CO1FBQ2pFLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuRDs7Ozs7SUFHSSxTQUFTO1FBQ2Qs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QkFDRCxtQkFBQyxTQUFTLENBQUMsYUFBcUMsRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkY7U0FDRjs7Ozs7O0lBR0ssVUFBVSxDQUFDLFNBQW9CO1FBQ3JDLHVCQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLElBQUksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLFFBQVEsQ0FBQzthQUNWO1lBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxVQUFVLG1CQUFZLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO2FBQ2hEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN6RDtZQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDcEMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3JDOzs7O1lBMUpKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJWYWxpZEZvcm0oZm9ybTogQWJzdHJhY3RDb250cm9sLCBlcnJvckhvb2s6IEZ1bmN0aW9uKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KChlbGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMucHVzaCh7IGZvcm06IGZvcm0sIGNvdW50OiAxLCBlcnJvckhvb2tzOiBbXSB9KTtcclxuICAgIH1cclxuICAgIGlmIChlcnJvckhvb2spIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLnB1c2goZXJyb3JIb29rKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE51bGwoKSB7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLm1hcmtBc1ByaXN0aW5lKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5yZXNldCh7fSwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbGVtRm9ybVsnc3ViJ10pIHtcclxuICAgICAgICBlbGVtRm9ybVsnc3ViJ10udW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgICBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSA9IHRydWU7XHJcbiAgICAgIGNvbnN0IHN1YiA9IGVsZW1Gb3JtLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICBlbGVtRm9ybVsnc3ViJ10udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICBlbGVtRm9ybVsnc3ViJ10gPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgICAgZWxlbUZvcm1bJ3N1YiddID0gc3ViO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRBbGwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKChlbGVtRm9ybSkgPT4ge1xyXG4gICAgICBpZiAoZWxlbUZvcm0uZm9ybS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQgfHwgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAvLyAgaWYgKGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgLy8gICBlbGVtRm9ybS5mb3JtLnBhdGNoVmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICAvLyAgfVxyXG4gICAgICAgIC8vICBlbGVtRm9ybS5mb3JtLnBhdGNoVmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLm1hcmtBc0RpcnR5KCk7XHJcbiAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZWxlbUZvcm0uZm9ybS5zdGF0dXMsIGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0VmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwge1xyXG4gICAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcclxuICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzLmVtaXQoZWxlbUZvcm0uZm9ybS5zdGF0dXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQpIHtcclxuICAgICAgICAgIGVsZW1Gb3JtLmVycm9ySG9va3MuZm9yRWFjaCgoZXJyb3JIb29rKSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ySG9vayhlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0sIGVycm9ySG9vazogRnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgICAgaWYgKGVycm9ySG9vaykge1xyXG4gICAgICAgIGNvbnN0IGZJbmRleCA9IHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5pbmRleE9mKGVycm9ySG9vayk7XHJcbiAgICAgICAgaWYgKGZJbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLnNwbGljZShmSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybUdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICBpZiAoZm9ybUdyb3VwLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdLmRpc2FibGVkKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUNvbnRyb2xzW25hbWVdLnZhbGlkIHx8IGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzRGlydHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzLCBmb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0VmFsdWUoZm9ybUNvbnRyb2xzW25hbWVdLnZhbHVlLCB7XHJcbiAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUdyb3VwLnZhbGlkIHx8IGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtR3JvdXAubWFya0FzRGlydHkoKTtcclxuICAgICAgICBpZiAoZm9ybUdyb3VwWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZm9ybUdyb3VwWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgZm9ybUdyb3VwLnNldFZhbHVlKGZvcm1Hcm91cC52YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0R3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzUHJpc3RpbmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19