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
            if (!elemForm.form.valid || elemForm.form['_reset']) {
                //  if (elemForm.form['_reset']) {
                //   elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
                //  }
                //  elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
                if (elemForm.form instanceof FormControl) {
                    console.log(elemForm.form.status, elemForm.form);
                    if (elemForm.form['_reset']) {
                        elemForm.form['_reset'] = false;
                        elemForm.form.setValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true, emitEvent: false });
                    }
                    elemForm.form.statusChanges.emit(elemForm.form.status);
                }
                else {
                    this.validFormGroup(elemForm.form);
                }
                if (!elemForm.form.valid) {
                    elemForm.errorHooks.forEach(errorHook => {
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
        const /** @type {?} */ formControls = formGroup.controls;
        for (const /** @type {?} */ name in formControls) {
            if (!formControls.hasOwnProperty(name)) {
                continue;
            }
            if (formControls[name] instanceof FormGroup) {
                this.validFormGroup(/** @type {?} */ (formControls[name]));
            }
            if (!formControls[name].valid || formControls[name]['_reset']) {
                console.log(formControls[name].status, formControls[name]);
                if (formControls[name]['_reset']) {
                    formControls[name]['_reset'] = false;
                    formControls[name].setValue(formControls[name].value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true, emitEvent: false });
                }
                (/** @type {?} */ (formControls[name].statusChanges)).emit(formControls[name].status);
            }
            if (!formGroup.valid || formGroup['_reset']) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsTUFBTTtJQUdKOzBCQUZpQyxFQUFFO0tBRWxCOzs7Ozs7SUFFVixpQkFBaUIsQ0FBQyxJQUFxQixFQUFFLFNBQW1CO1FBQ2pFLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuRDs7Ozs7SUFJSSxTQUFTO1FBQ2Qs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LElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsVUFBVSxtQkFBWSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQzthQUNoRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDekQ7WUFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3JDOzs7O1lBdklKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmxlbmd0aDtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSwgZXJyb3JIb29rczogW10gfSk7XHJcbiAgICB9XHJcbiAgICBpZihlcnJvckhvb2spe1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3MucHVzaChlcnJvckhvb2spO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE51bGwoKSB7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KHt9LCB7IGVtaXRFdmVudDogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoZWxlbUZvcm0uZm9ybSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVsZW1Gb3JtWydzdWInXSkge1xyXG4gICAgICAgIGVsZW1Gb3JtWydzdWInXS51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gdHJ1ZTtcclxuICAgICAgY29uc3Qgc3ViID0gZWxlbUZvcm0uZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgIGVsZW1Gb3JtWydzdWInXS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIGVsZW1Gb3JtWydzdWInXSA9IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgICBlbGVtRm9ybVsnc3ViJ10gPSBzdWI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZEFsbCgpIHtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmICghZWxlbUZvcm0uZm9ybS52YWxpZCB8fCBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgIC8vICBpZiAoZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAvLyAgIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIC8vICB9XHJcbiAgICAgICAgLy8gIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1Gb3JtLmZvcm0uc3RhdHVzLCBlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIGlmIChlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgICBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbGVtRm9ybS5mb3JtLnNldFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsXHJcbiAgICAgICAgICAgICAgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc3RhdHVzQ2hhbmdlcy5lbWl0KGVsZW1Gb3JtLmZvcm0uc3RhdHVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWVsZW1Gb3JtLmZvcm0udmFsaWQpe1xyXG4gICAgICAgICAgZWxlbUZvcm0uZXJyb3JIb29rcy5mb3JFYWNoKGVycm9ySG9vayA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ySG9vayhlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0sIGVycm9ySG9vazogRnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgICAgaWYoZXJyb3JIb29rKXtcclxuICAgICAgICBjb25zdCBmSW5kZXggPSB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3MuaW5kZXhPZihlcnJvckhvb2spO1xyXG4gICAgICAgIGlmKGZJbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3Muc3BsaWNlKGZJbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHNbbmFtZV0udmFsaWQgfHwgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMsIGZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRWYWx1ZShmb3JtQ29udHJvbHNbbmFtZV0udmFsdWUsXHJcbiAgICAgICAgICAgIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZvcm1Hcm91cC52YWxpZCB8fCBmb3JtR3JvdXBbJ19yZXNldCddKSB7XHJcbiAgICAgICAgaWYgKGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgIGZvcm1Hcm91cFsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAgIGZvcm1Hcm91cC5zZXRWYWx1ZShmb3JtR3JvdXAudmFsdWUsXHJcbiAgICAgICAgICAgIHsgb25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIChmb3JtR3JvdXAuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRHcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==