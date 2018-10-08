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
     * @return {?}
     */
    GlobalValidService.prototype.registerValidForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var /** @type {?} */ index = this.validForms.findIndex(function (elem) {
            return elem.form == form;
        });
        if (index >= 0) {
            this.validForms[index].count += 1;
        }
        else {
            this.validForms.push({ form: form, count: 1 });
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
            elemForm.form['_reset'] = true;
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
                elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
                //  }
                elemForm.form['_reset'] = false;
                //  elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
                if (elemForm.form instanceof FormControl) {
                    console.log(elemForm.form.status, elemForm.form);
                    elemForm.form.statusChanges.emit(elemForm.form.status);
                }
                else {
                    _this.validFormGroup(elemForm.form);
                }
            }
            result = elemForm.form.valid && result;
        });
        return result;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    GlobalValidService.prototype.unregisterValidForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var /** @type {?} */ index = this.validForms.findIndex(function (elem) {
            return elem.form == form;
        });
        if (index >= 0 && this.validForms[index].count > 1) {
            this.validForms[index].count -= 1;
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
                formControls[name_1]['_reset'] = false;
                console.log(formControls[name_1].status, formControls[name_1]);
                (/** @type {?} */ (formControls[name_1].statusChanges)).emit(formControls[name_1].status);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7O0lBTXZFOzBCQUZpQyxFQUFFO0tBRWxCOzs7OztJQUVWLDhDQUFpQjs7OztjQUFDLElBQXFCO1FBQzVDLHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1NBQzFCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEQ7Ozs7O0lBR0ksc0NBQVM7Ozs7O1FBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDaEUs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U0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxVQUFVLG1CQUFZLFlBQVksQ0FBQyxNQUFJLENBQUMsRUFBQyxDQUFDO2FBQ2hEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sWUFBWSxDQUFDLE1BQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN6RDtZQUNELFlBQVksQ0FBQyxNQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDckM7OztnQkE5RkosVUFBVTs7Ozs2QkFIWDs7U0FJYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KChlbGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE51bGwoKSB7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KHt9LCB7IGVtaXRFdmVudDogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoZWxlbUZvcm0uZm9ybSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRBbGwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKChlbGVtRm9ybSkgPT4ge1xyXG4gICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQgfHwgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgLy8gIGlmIChlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgIC8vICB9XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAvLyAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZWxlbUZvcm0uZm9ybS5zdGF0dXMsIGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzLmVtaXQoZWxlbUZvcm0uZm9ybS5zdGF0dXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1Hcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZvcm1Db250cm9sc1tuYW1lXS52YWxpZCB8fCBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMsIGZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgICAgKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXNldEdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbHMgPSBmb3JtR3JvdXAuY29udHJvbHM7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZm9ybUNvbnRyb2xzKSB7XHJcbiAgICAgIGlmICghZm9ybUNvbnRyb2xzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucmVzZXRHcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgfVxyXG4gICAgICBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19