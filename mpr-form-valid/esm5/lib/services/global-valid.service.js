/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
var GlobalValidService = /** @class */ (function () {
    function GlobalValidService() {
        this.validForms = [];
    }
    /**
     * @param {?} form
     * @param {?} errorHook
     * @return {?}
     */
    GlobalValidService.prototype.registerValidForm = /**
     * @param {?} form
     * @param {?} errorHook
     * @return {?}
     */
    function (form, errorHook) {
        var /** @type {?} */ index = this.validForms.findIndex(function (elem) {
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
    };
    /**
     * @return {?}
     */
    GlobalValidService.prototype.resetNull = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.validForms.forEach(function (elemForm) {
            if (elemForm.form instanceof FormControl) {
                elemForm.form.reset(null, { emitEvent: false, onlySelf: true });
                elemForm.form.setErrors(null, { emitEvent: true });
            }
            else {
                elemForm.form.reset({}, { emitEvent: false, onlySelf: true });
                elemForm.form.setErrors(null, { emitEvent: false });
                _this.resetGroup(elemForm.form);
            }
            if (elemForm['sub']) {
                elemForm['sub'].unsubscribe();
            }
            elemForm.form['_reset'] = true;
            var /** @type {?} */ sub = elemForm.form.valueChanges.subscribe(function () {
                elemForm.form['_reset'] = false;
                elemForm['sub'].unsubscribe();
                elemForm['sub'] = null;
            });
            elemForm['sub'] = sub;
        });
    };
    /**
     * @return {?}
     */
    GlobalValidService.prototype.validAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ result = true;
        this.validForms.forEach(function (elemForm) {
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
                    _this.validFormGroup(elemForm.form);
                }
                if (!elemForm.form.valid) {
                    elemForm.errorHooks.forEach(function (errorHook) {
                        errorHook(elemForm.form);
                    });
                }
            }
            result = elemForm.form.valid && result;
        });
        return result;
    };
    /**
     * @param {?} form
     * @param {?} errorHook
     * @return {?}
     */
    GlobalValidService.prototype.unregisterValidForm = /**
     * @param {?} form
     * @param {?} errorHook
     * @return {?}
     */
    function (form, errorHook) {
        var /** @type {?} */ index = this.validForms.findIndex(function (elem) {
            return elem.form == form;
        });
        if (index >= 0 && this.validForms[index].count > 1) {
            this.validForms[index].count -= 1;
            if (errorHook) {
                var /** @type {?} */ fIndex = this.validForms[index].errorHooks.indexOf(errorHook);
                if (fIndex != -1) {
                    this.validForms[index].errorHooks.splice(fIndex, 1);
                }
            }
        }
        else {
            this.validForms.splice(index, 1);
        }
    };
    /**
     * @param {?} formGroup
     * @return {?}
     */
    GlobalValidService.prototype.validFormGroup = /**
     * @param {?} formGroup
     * @return {?}
     */
    function (formGroup) {
        var /** @type {?} */ formControls = formGroup.controls;
        for (var /** @type {?} */ name_1 in formControls) {
            if (!formControls.hasOwnProperty(name_1)) {
                continue;
            }
            if (formControls[name_1] instanceof FormGroup) {
                this.validFormGroup(/** @type {?} */ (formControls[name_1]));
            }
            if (!formControls[name_1].valid || formControls[name_1]['_reset']) {
                console.log(formControls[name_1].status, formControls[name_1]);
                if (formControls[name_1]['_reset']) {
                    formControls[name_1]['_reset'] = false;
                    formControls[name_1].setValue(formControls[name_1].value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true, emitEvent: false });
                }
                (/** @type {?} */ (formControls[name_1].statusChanges)).emit(formControls[name_1].status);
            }
            if (!formGroup.valid || formGroup['_reset']) {
                if (formGroup['_reset']) {
                    formGroup['_reset'] = false;
                    formGroup.setValue(formGroup.value, { onlySelf: true, emitEvent: false });
                }
                (/** @type {?} */ (formGroup.statusChanges)).emit(formControls[name_1].status);
            }
        }
    };
    /**
     * @param {?} formGroup
     * @return {?}
     */
    GlobalValidService.prototype.resetGroup = /**
     * @param {?} formGroup
     * @return {?}
     */
    function (formGroup) {
        var /** @type {?} */ formControls = formGroup.controls;
        for (var /** @type {?} */ name_2 in formControls) {
            if (!formControls.hasOwnProperty(name_2)) {
                continue;
            }
            if (formControls[name_2] instanceof FormGroup) {
                formControls[name_2].setErrors(null, { emitEvent: false });
                this.resetGroup(/** @type {?} */ (formControls[name_2]));
            }
            else {
                formControls[name_2].setErrors(null, { emitEvent: true });
            }
            formControls[name_2]['_reset'] = true;
        }
    };
    GlobalValidService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GlobalValidService.ctorParameters = function () { return []; };
    return GlobalValidService;
}());
export { GlobalValidService };
function GlobalValidService_tsickle_Closure_declarations() {
    /** @type {?} */
    GlobalValidService.prototype.validForms;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7O0lBTXZFOzBCQUZpQyxFQUFFO0tBRWxCOzs7Ozs7SUFFViw4Q0FBaUI7Ozs7O2NBQUMsSUFBcUIsRUFBRSxTQUFtQjtRQUNqRSxxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuRDs7Ozs7SUFJSSxzQ0FBUzs7Ozs7UUFDZCxJQUFJLENBQUMs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QUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFVBQVUsbUJBQVksWUFBWSxDQUFDLE1BQUksQ0FBQyxFQUFDLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixZQUFZLENBQUMsTUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsWUFBWSxDQUFDLE1BQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNyQzs7O2dCQXZJSixVQUFVOzs7OzZCQUhYOztTQUlhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgdmFsaWRGb3JtczogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJWYWxpZEZvcm0oZm9ybTogQWJzdHJhY3RDb250cm9sLCBlcnJvckhvb2s6IEZ1bmN0aW9uKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KChlbGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMucHVzaCh7IGZvcm06IGZvcm0sIGNvdW50OiAxLCBlcnJvckhvb2tzOiBbXSB9KTtcclxuICAgIH1cclxuICAgIGlmKGVycm9ySG9vayl7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5wdXNoKGVycm9ySG9vayk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0TnVsbCgpIHtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKChlbGVtRm9ybSkgPT4ge1xyXG4gICAgICBpZiAoZWxlbUZvcm0uZm9ybSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5yZXNldChudWxsLCB7IGVtaXRFdmVudDogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQoe30sIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucmVzZXRHcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbUZvcm1bJ3N1YiddKSB7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBjb25zdCBzdWIgPSBlbGVtRm9ybS5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICAgIGVsZW1Gb3JtWydzdWInXSA9IHN1YjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKCFlbGVtRm9ybS5mb3JtLnZhbGlkIHx8IGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgLy8gIGlmIChlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgIC8vICAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgLy8gIH1cclxuICAgICAgICAvLyAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZWxlbUZvcm0uZm9ybS5zdGF0dXMsIGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0VmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSxcclxuICAgICAgICAgICAgICB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzLmVtaXQoZWxlbUZvcm0uZm9ybS5zdGF0dXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighZWxlbUZvcm0uZm9ybS52YWxpZCl7XHJcbiAgICAgICAgICBlbGVtRm9ybS5lcnJvckhvb2tzLmZvckVhY2goZXJyb3JIb29rID0+IHtcclxuICAgICAgICAgICAgZXJyb3JIb29rKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCA9IGVsZW1Gb3JtLmZvcm0udmFsaWQgJiYgcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVucmVnaXN0ZXJWYWxpZEZvcm0oZm9ybSwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KChlbGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCA+IDEpIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCAtPSAxO1xyXG4gICAgICBpZihlcnJvckhvb2spe1xyXG4gICAgICAgIGNvbnN0IGZJbmRleCA9IHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5pbmRleE9mKGVycm9ySG9vayk7XHJcbiAgICAgICAgaWYoZkluZGV4ICE9IC0xKXtcclxuICAgICAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5zcGxpY2UoZkluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1Hcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZvcm1Db250cm9sc1tuYW1lXS52YWxpZCB8fCBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybUNvbnRyb2xzW25hbWVdLnN0YXR1cywgZm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldFZhbHVlKGZvcm1Db250cm9sc1tuYW1lXS52YWx1ZSxcclxuICAgICAgICAgICAgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUdyb3VwLnZhbGlkIHx8IGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICBpZiAoZm9ybUdyb3VwWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZm9ybUdyb3VwWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgZm9ybUdyb3VwLnNldFZhbHVlKGZvcm1Hcm91cC52YWx1ZSxcclxuICAgICAgICAgICAgeyBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXNldEdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbHMgPSBmb3JtR3JvdXAuY29udHJvbHM7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZm9ybUNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICghZm9ybUNvbnRyb2xzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucmVzZXRHcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgfVxyXG4gICAgICBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19