/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import scrollIntoView from 'dom-scroll-into-view';
/**
 * @param {?} el
 * @param {?} prop
 * @return {?}
 */
function computedStyle(el, prop) {
    var /** @type {?} */ getComputedStyle = window.getComputedStyle;
    var /** @type {?} */ style = 
    // If we have getComputedStyle
    getComputedStyle
        ? // Query it
            // TODO: From CSS-Query notes, we might need (node, null) for FF
            getComputedStyle(el)
        : // Otherwise, we are in IE and use currentStyle
            el.currentStyle;
    if (style) {
        return style[
        // Switch to camelCase for CSSOM
        // DEV: Grabbed from jQuery
        // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
        // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
        prop.replace(/-(\w)/gi, function (word, letter) {
            return letter.toUpperCase();
        })];
    }
    return undefined;
}
/**
 * @param {?} n
 * @return {?}
 */
function getScrollableContainer(n) {
    var /** @type {?} */ node = n;
    var /** @type {?} */ nodeName;
    /* eslint no-cond-assign:0 */
    while (node && (nodeName = node.nodeName.toLowerCase()) !== 'body') {
        var /** @type {?} */ overflowY = computedStyle(node, 'overflowY');
        // https://stackoverflow.com/a/36900407/3040605
        if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
            return node;
        }
        node = node.parentNode;
    }
    return nodeName === 'body' ? node.ownerDocument : node;
}
var GlobalValidService = /** @class */ (function () {
    function GlobalValidService() {
        var _this = this;
        this.validForms = [];
        this.needScroll = false;
        this.scrollElem = [];
        this.doScrollObserv = Observable.create(function (observer) {
            _this.scrollObserver = observer;
        });
        this.scrollOptions = null;
        this.doScrollObserv.pipe(debounceTime(500)).subscribe(function () {
            if (!_this.needScroll || !_this.scrollElem.length) {
                return;
            }
            _this.needScroll = false;
            var /** @type {?} */ minScrollTop = Number.MAX_VALUE;
            var /** @type {?} */ scrollElem;
            _this.scrollElem.forEach(function (elem) {
                var /** @type {?} */ top = elem.getBoundingClientRect().top;
                if (minScrollTop > top) {
                    minScrollTop = top;
                    scrollElem = elem;
                }
            });
            if (!scrollElem) {
                return;
            }
            var /** @type {?} */ c = getScrollableContainer(scrollElem);
            if (!c) {
                return;
            }
            scrollIntoView(scrollElem, c, Object.assign({}, {
                onlyScrollIfNeeded: true,
                offsetTop: 200
            }, _this.scrollOptions || {}));
        });
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
                elemForm.form.markAsPristine();
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
     * @param {?} elem
     * @return {?}
     */
    GlobalValidService.prototype.scrollTo = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        if (!this.needScroll) {
            return;
        }
        this.scrollElem.push(elem);
        this.scrollObserver.next(elem);
    };
    /**
     * @param {?=} needScroll
     * @param {?=} scrollOptions
     * @return {?}
     */
    GlobalValidService.prototype.validAll = /**
     * @param {?=} needScroll
     * @param {?=} scrollOptions
     * @return {?}
     */
    function (needScroll, scrollOptions) {
        var _this = this;
        if (needScroll === void 0) { needScroll = false; }
        if (scrollOptions === void 0) { scrollOptions = null; }
        this.needScroll = needScroll;
        this.scrollOptions = scrollOptions;
        this.scrollElem = [];
        var /** @type {?} */ result = true;
        this.validForms.forEach(function (elemForm) {
            if (elemForm.form.disabled) {
                return;
            }
            if (!elemForm.form.valid || elemForm.form['_reset']) {
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
        if (formGroup.disabled) {
            return;
        }
        var /** @type {?} */ formControls = formGroup.controls;
        for (var /** @type {?} */ name_1 in formControls) {
            if (!formControls.hasOwnProperty(name_1)) {
                continue;
            }
            if (formControls[name_1].disabled) {
                continue;
            }
            if (formControls[name_1] instanceof FormGroup) {
                this.validFormGroup(/** @type {?} */ (formControls[name_1]));
            }
            if (!formControls[name_1].valid || formControls[name_1]['_reset']) {
                formControls[name_1].markAsDirty();
                console.log(formControls[name_1].status, formControls[name_1]);
                if (formControls[name_1]['_reset']) {
                    formControls[name_1]['_reset'] = false;
                    formControls[name_1].setValue(formControls[name_1].value, {
                        emitModelToViewChange: false,
                        emitViewToModelChange: false,
                        onlySelf: true,
                        emitEvent: false
                    });
                }
                (/** @type {?} */ (formControls[name_1].statusChanges)).emit(formControls[name_1].status);
            }
            if (!formGroup.valid || formGroup['_reset']) {
                formGroup.markAsDirty();
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
            formControls[name_2].markAsPristine();
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
    /** @type {?} */
    GlobalValidService.prototype.needScroll;
    /** @type {?} */
    GlobalValidService.prototype.scrollElem;
    /** @type {?} */
    GlobalValidService.prototype.doScrollObserv;
    /** @type {?} */
    GlobalValidService.prototype.scrollObserver;
    /** @type {?} */
    GlobalValidService.prototype.scrollOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQUVsRCx1QkFBdUIsRUFBRSxFQUFFLElBQUk7SUFDN0IscUJBQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pELHFCQUFNLEtBQUs7O0lBRVQsZ0JBQWdCO1FBQ2QsQ0FBQzs7WUFFQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7UUFDdEIsQ0FBQztZQUNDLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sQ0FBQyxLQUFLOzs7OztRQUtWLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQUMsSUFBSSxFQUFFLE1BQU07WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QixDQUFDLENBQ0gsQ0FBQztLQUNIO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztDQUNsQjs7Ozs7QUFFRCxnQ0FBZ0MsQ0FBQztJQUMvQixxQkFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2IscUJBQUksUUFBUSxDQUFDOztJQUViLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENB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USxDQUFDO2FBQ1Y7WUFDRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBSSxDQUFDLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsWUFBWSxDQUFDLE1BQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFVBQVUsbUJBQVksWUFBWSxDQUFDLE1BQUksQ0FBQyxFQUFDLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixZQUFZLENBQUMsTUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsWUFBWSxDQUFDLE1BQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNwQyxZQUFZLENBQUMsTUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDckM7OztnQkEzTUosVUFBVTs7Ozs2QkE3Q1g7O1NBOENhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHNjcm9sbEludG9WaWV3IGZyb20gJ2RvbS1zY3JvbGwtaW50by12aWV3JztcclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVkU3R5bGUoZWwsIHByb3ApIHtcclxuICBjb25zdCBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XHJcbiAgY29uc3Qgc3R5bGUgPVxyXG4gICAgLy8gSWYgd2UgaGF2ZSBnZXRDb21wdXRlZFN0eWxlXHJcbiAgICBnZXRDb21wdXRlZFN0eWxlXHJcbiAgICAgID8gLy8gUXVlcnkgaXRcclxuICAgICAgICAvLyBUT0RPOiBGcm9tIENTUy1RdWVyeSBub3Rlcywgd2UgbWlnaHQgbmVlZCAobm9kZSwgbnVsbCkgZm9yIEZGXHJcbiAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShlbClcclxuICAgICAgOiAvLyBPdGhlcndpc2UsIHdlIGFyZSBpbiBJRSBhbmQgdXNlIGN1cnJlbnRTdHlsZVxyXG4gICAgICAgIGVsLmN1cnJlbnRTdHlsZTtcclxuICBpZiAoc3R5bGUpIHtcclxuICAgIHJldHVybiBzdHlsZVtcclxuICAgICAgLy8gU3dpdGNoIHRvIGNhbWVsQ2FzZSBmb3IgQ1NTT01cclxuICAgICAgLy8gREVWOiBHcmFiYmVkIGZyb20galF1ZXJ5XHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMS45LXN0YWJsZS9zcmMvY3NzLmpzI0wxOTEtTDE5NFxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzEuOS1zdGFibGUvc3JjL2NvcmUuanMjTDU5My1MNTk3XHJcbiAgICAgIHByb3AucmVwbGFjZSgvLShcXHcpL2dpLCAod29yZCwgbGV0dGVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICB9KVxyXG4gICAgXTtcclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2Nyb2xsYWJsZUNvbnRhaW5lcihuKSB7XHJcbiAgbGV0IG5vZGUgPSBuO1xyXG4gIGxldCBub2RlTmFtZTtcclxuICAvKiBlc2xpbnQgbm8tY29uZC1hc3NpZ246MCAqL1xyXG4gIHdoaWxlIChub2RlICYmIChub2RlTmFtZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgIT09ICdib2R5Jykge1xyXG4gICAgY29uc3Qgb3ZlcmZsb3dZID0gY29tcHV0ZWRTdHlsZShub2RlLCAnb3ZlcmZsb3dZJyk7XHJcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzY5MDA0MDcvMzA0MDYwNVxyXG4gICAgaWYgKG5vZGUgIT09IG4gJiYgKG92ZXJmbG93WSA9PT0gJ2F1dG8nIHx8IG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcpICYmIG5vZGUuc2Nyb2xsSGVpZ2h0ID4gbm9kZS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdib2R5JyA/IG5vZGUub3duZXJEb2N1bWVudCA6IG5vZGU7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1zOiBBcnJheTxhbnk+ID0gW107XHJcbiAgcHJpdmF0ZSBuZWVkU2Nyb2xsID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzY3JvbGxFbGVtOiBBcnJheTxFbGVtZW50PiA9IFtdO1xyXG4gIHByaXZhdGUgZG9TY3JvbGxPYnNlcnY6IE9ic2VydmFibGU8YW55PiA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xyXG4gICAgdGhpcy5zY3JvbGxPYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gIH0pO1xyXG4gIHByaXZhdGUgc2Nyb2xsT2JzZXJ2ZXI6IE9ic2VydmVyPGFueT47XHJcbiAgcHJpdmF0ZSBzY3JvbGxPcHRpb25zID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmRvU2Nyb2xsT2JzZXJ2LnBpcGUoZGVib3VuY2VUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5uZWVkU2Nyb2xsIHx8ICF0aGlzLnNjcm9sbEVsZW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubmVlZFNjcm9sbCA9IGZhbHNlO1xyXG4gICAgICBsZXQgbWluU2Nyb2xsVG9wID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgbGV0IHNjcm9sbEVsZW06IEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuc2Nyb2xsRWxlbS5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9wID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgaWYgKG1pblNjcm9sbFRvcCA+IHRvcCkge1xyXG4gICAgICAgICAgbWluU2Nyb2xsVG9wID0gdG9wO1xyXG4gICAgICAgICAgc2Nyb2xsRWxlbSA9IGVsZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFzY3JvbGxFbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGMgPSBnZXRTY3JvbGxhYmxlQ29udGFpbmVyKHNjcm9sbEVsZW0pO1xyXG4gICAgICBpZiAoIWMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2Nyb2xsSW50b1ZpZXcoXHJcbiAgICAgICAgc2Nyb2xsRWxlbSxcclxuICAgICAgICBjLFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb25seVNjcm9sbElmTmVlZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXRUb3A6IDIwMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsT3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmxlbmd0aDtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSwgZXJyb3JIb29rczogW10gfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXJyb3JIb29rKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5wdXNoKGVycm9ySG9vayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXROdWxsKCkge1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5tYXJrQXNQcmlzdGluZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQoe30sIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucmVzZXRHcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbUZvcm1bJ3N1YiddKSB7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBjb25zdCBzdWIgPSBlbGVtRm9ybS5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICAgIGVsZW1Gb3JtWydzdWInXSA9IHN1YjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvKGVsZW06IEVsZW1lbnQpIHtcclxuICAgIGlmICghdGhpcy5uZWVkU2Nyb2xsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2Nyb2xsRWxlbS5wdXNoKGVsZW0pO1xyXG4gICAgdGhpcy5zY3JvbGxPYnNlcnZlci5uZXh0KGVsZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKG5lZWRTY3JvbGwgPSBmYWxzZSwgc2Nyb2xsT3B0aW9ucyA9IG51bGwpIHtcclxuICAgIHRoaXMubmVlZFNjcm9sbCA9IG5lZWRTY3JvbGw7XHJcbiAgICB0aGlzLnNjcm9sbE9wdGlvbnMgPSBzY3JvbGxPcHRpb25zO1xyXG4gICAgdGhpcy5zY3JvbGxFbGVtID0gW107XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKChlbGVtRm9ybSkgPT4ge1xyXG4gICAgICBpZiAoZWxlbUZvcm0uZm9ybS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQgfHwgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLm1hcmtBc0RpcnR5KCk7XHJcbiAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZWxlbUZvcm0uZm9ybS5zdGF0dXMsIGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0VmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwge1xyXG4gICAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcclxuICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzLmVtaXQoZWxlbUZvcm0uZm9ybS5zdGF0dXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQpIHtcclxuICAgICAgICAgIGVsZW1Gb3JtLmVycm9ySG9va3MuZm9yRWFjaCgoZXJyb3JIb29rKSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ySG9vayhlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0sIGVycm9ySG9vazogRnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgICAgaWYgKGVycm9ySG9vaykge1xyXG4gICAgICAgIGNvbnN0IGZJbmRleCA9IHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5pbmRleE9mKGVycm9ySG9vayk7XHJcbiAgICAgICAgaWYgKGZJbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLnNwbGljZShmSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybUdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICBpZiAoZm9ybUdyb3VwLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdLmRpc2FibGVkKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUNvbnRyb2xzW25hbWVdLnZhbGlkIHx8IGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzRGlydHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzLCBmb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0VmFsdWUoZm9ybUNvbnRyb2xzW25hbWVdLnZhbHVlLCB7XHJcbiAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUdyb3VwLnZhbGlkIHx8IGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtR3JvdXAubWFya0FzRGlydHkoKTtcclxuICAgICAgICBpZiAoZm9ybUdyb3VwWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZm9ybUdyb3VwWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgZm9ybUdyb3VwLnNldFZhbHVlKGZvcm1Hcm91cC52YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0R3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzUHJpc3RpbmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19