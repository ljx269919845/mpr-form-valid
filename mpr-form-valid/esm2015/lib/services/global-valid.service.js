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
    const /** @type {?} */ getComputedStyle = window.getComputedStyle;
    const /** @type {?} */ style = 
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
        prop.replace(/-(\w)/gi, (word, letter) => {
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
    let /** @type {?} */ node = n;
    let /** @type {?} */ nodeName;
    /* eslint no-cond-assign:0 */
    while (node && (nodeName = node.nodeName.toLowerCase()) !== 'body') {
        const /** @type {?} */ overflowY = computedStyle(node, 'overflowY');
        // https://stackoverflow.com/a/36900407/3040605
        if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
            return node;
        }
        node = node.parentNode;
    }
    return nodeName === 'body' ? node.ownerDocument : node;
}
export class GlobalValidService {
    constructor() {
        this.validForms = [];
        this.needScroll = false;
        this.scrollElem = [];
        this.doScrollObserv = Observable.create((observer) => {
            this.scrollObserver = observer;
        });
        this.scrollOptions = null;
        this.doScrollObserv.pipe(debounceTime(500)).subscribe(() => {
            if (!this.needScroll || !this.scrollElem.length) {
                return;
            }
            this.needScroll = false;
            let /** @type {?} */ minScrollTop = Number.MAX_VALUE;
            let /** @type {?} */ scrollElem;
            this.scrollElem.forEach((elem) => {
                const /** @type {?} */ top = elem.getBoundingClientRect().top;
                if (minScrollTop > top) {
                    minScrollTop = top;
                    scrollElem = elem;
                }
            });
            if (!scrollElem) {
                return;
            }
            const /** @type {?} */ c = getScrollableContainer(scrollElem);
            if (!c) {
                return;
            }
            scrollIntoView(scrollElem, c, Object.assign({}, {
                onlyScrollIfNeeded: true,
                offsetTop: 200
            }, this.scrollOptions || {}));
        });
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
     * @param {?} elem
     * @return {?}
     */
    scrollTo(elem) {
        if (!this.needScroll) {
            return;
        }
        this.scrollElem.push(elem);
        this.scrollObserver.next(elem);
    }
    /**
     * @param {?=} needScroll
     * @param {?=} scrollOptions
     * @return {?}
     */
    validAll(needScroll = false, scrollOptions = null) {
        this.needScroll = needScroll;
        this.scrollOptions = scrollOptions;
        this.scrollElem = [];
        let /** @type {?} */ result = true;
        this.validForms.forEach((elemForm) => {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQUVsRCx1QkFBdUIsRUFBRSxFQUFFLElBQUk7SUFDN0IsdUJBQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pELHVCQUFNLEtBQUs7O0lBRVQsZ0JBQWdCO1FBQ2QsQ0FBQzs7WUFFQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7UUFDdEIsQ0FBQztZQUNDLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sQ0FBQyxLQUFLOzs7OztRQUtWLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDN0IsQ0FBQyxDQUNILENBQUM7S0FDSDtJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7Q0FDbEI7Ozs7O0FBRUQsZ0NBQWdDLENBQUM7SUFDL0IscUJBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLHFCQUFJLFFBQVEsQ0FBQzs7SUFFYixPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENB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LElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsUUFBUSxDQUFDO2FBQ1Y7WUFDRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFVBQVUsbUJBQVksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDckM7Ozs7WUEzTUosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHNjcm9sbEludG9WaWV3IGZyb20gJ2RvbS1zY3JvbGwtaW50by12aWV3JztcclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVkU3R5bGUoZWwsIHByb3ApIHtcclxuICBjb25zdCBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XHJcbiAgY29uc3Qgc3R5bGUgPVxyXG4gICAgLy8gSWYgd2UgaGF2ZSBnZXRDb21wdXRlZFN0eWxlXHJcbiAgICBnZXRDb21wdXRlZFN0eWxlXHJcbiAgICAgID8gLy8gUXVlcnkgaXRcclxuICAgICAgICAvLyBUT0RPOiBGcm9tIENTUy1RdWVyeSBub3Rlcywgd2UgbWlnaHQgbmVlZCAobm9kZSwgbnVsbCkgZm9yIEZGXHJcbiAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShlbClcclxuICAgICAgOiAvLyBPdGhlcndpc2UsIHdlIGFyZSBpbiBJRSBhbmQgdXNlIGN1cnJlbnRTdHlsZVxyXG4gICAgICAgIGVsLmN1cnJlbnRTdHlsZTtcclxuICBpZiAoc3R5bGUpIHtcclxuICAgIHJldHVybiBzdHlsZVtcclxuICAgICAgLy8gU3dpdGNoIHRvIGNhbWVsQ2FzZSBmb3IgQ1NTT01cclxuICAgICAgLy8gREVWOiBHcmFiYmVkIGZyb20galF1ZXJ5XHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMS45LXN0YWJsZS9zcmMvY3NzLmpzI0wxOTEtTDE5NFxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzEuOS1zdGFibGUvc3JjL2NvcmUuanMjTDU5My1MNTk3XHJcbiAgICAgIHByb3AucmVwbGFjZSgvLShcXHcpL2dpLCAod29yZCwgbGV0dGVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICB9KVxyXG4gICAgXTtcclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2Nyb2xsYWJsZUNvbnRhaW5lcihuKSB7XHJcbiAgbGV0IG5vZGUgPSBuO1xyXG4gIGxldCBub2RlTmFtZTtcclxuICAvKiBlc2xpbnQgbm8tY29uZC1hc3NpZ246MCAqL1xyXG4gIHdoaWxlIChub2RlICYmIChub2RlTmFtZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgIT09ICdib2R5Jykge1xyXG4gICAgY29uc3Qgb3ZlcmZsb3dZID0gY29tcHV0ZWRTdHlsZShub2RlLCAnb3ZlcmZsb3dZJyk7XHJcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzY5MDA0MDcvMzA0MDYwNVxyXG4gICAgaWYgKG5vZGUgIT09IG4gJiYgKG92ZXJmbG93WSA9PT0gJ2F1dG8nIHx8IG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcpICYmIG5vZGUuc2Nyb2xsSGVpZ2h0ID4gbm9kZS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdib2R5JyA/IG5vZGUub3duZXJEb2N1bWVudCA6IG5vZGU7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1zOiBBcnJheTxhbnk+ID0gW107XHJcbiAgcHJpdmF0ZSBuZWVkU2Nyb2xsID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzY3JvbGxFbGVtOiBBcnJheTxFbGVtZW50PiA9IFtdO1xyXG4gIHByaXZhdGUgZG9TY3JvbGxPYnNlcnY6IE9ic2VydmFibGU8YW55PiA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xyXG4gICAgdGhpcy5zY3JvbGxPYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gIH0pO1xyXG4gIHByaXZhdGUgc2Nyb2xsT2JzZXJ2ZXI6IE9ic2VydmVyPGFueT47XHJcbiAgcHJpdmF0ZSBzY3JvbGxPcHRpb25zID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmRvU2Nyb2xsT2JzZXJ2LnBpcGUoZGVib3VuY2VUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5uZWVkU2Nyb2xsIHx8ICF0aGlzLnNjcm9sbEVsZW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubmVlZFNjcm9sbCA9IGZhbHNlO1xyXG4gICAgICBsZXQgbWluU2Nyb2xsVG9wID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgbGV0IHNjcm9sbEVsZW06IEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuc2Nyb2xsRWxlbS5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9wID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgaWYgKG1pblNjcm9sbFRvcCA+IHRvcCkge1xyXG4gICAgICAgICAgbWluU2Nyb2xsVG9wID0gdG9wO1xyXG4gICAgICAgICAgc2Nyb2xsRWxlbSA9IGVsZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFzY3JvbGxFbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGMgPSBnZXRTY3JvbGxhYmxlQ29udGFpbmVyKHNjcm9sbEVsZW0pO1xyXG4gICAgICBpZiAoIWMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2Nyb2xsSW50b1ZpZXcoXHJcbiAgICAgICAgc2Nyb2xsRWxlbSxcclxuICAgICAgICBjLFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb25seVNjcm9sbElmTmVlZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXRUb3A6IDIwMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsT3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmxlbmd0aDtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSwgZXJyb3JIb29rczogW10gfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXJyb3JIb29rKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5wdXNoKGVycm9ySG9vayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXROdWxsKCkge1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5tYXJrQXNQcmlzdGluZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQoe30sIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucmVzZXRHcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbUZvcm1bJ3N1YiddKSB7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBjb25zdCBzdWIgPSBlbGVtRm9ybS5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICAgIGVsZW1Gb3JtWydzdWInXSA9IHN1YjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvKGVsZW06IEVsZW1lbnQpIHtcclxuICAgIGlmICghdGhpcy5uZWVkU2Nyb2xsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2Nyb2xsRWxlbS5wdXNoKGVsZW0pO1xyXG4gICAgdGhpcy5zY3JvbGxPYnNlcnZlci5uZXh0KGVsZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKG5lZWRTY3JvbGwgPSBmYWxzZSwgc2Nyb2xsT3B0aW9ucyA9IG51bGwpIHtcclxuICAgIHRoaXMubmVlZFNjcm9sbCA9IG5lZWRTY3JvbGw7XHJcbiAgICB0aGlzLnNjcm9sbE9wdGlvbnMgPSBzY3JvbGxPcHRpb25zO1xyXG4gICAgdGhpcy5zY3JvbGxFbGVtID0gW107XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKChlbGVtRm9ybSkgPT4ge1xyXG4gICAgICBpZiAoZWxlbUZvcm0uZm9ybS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQgfHwgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLm1hcmtBc0RpcnR5KCk7XHJcbiAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZWxlbUZvcm0uZm9ybS5zdGF0dXMsIGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0VmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwge1xyXG4gICAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcclxuICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzLmVtaXQoZWxlbUZvcm0uZm9ybS5zdGF0dXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQpIHtcclxuICAgICAgICAgIGVsZW1Gb3JtLmVycm9ySG9va3MuZm9yRWFjaCgoZXJyb3JIb29rKSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ySG9vayhlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0sIGVycm9ySG9vazogRnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgICAgaWYgKGVycm9ySG9vaykge1xyXG4gICAgICAgIGNvbnN0IGZJbmRleCA9IHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5pbmRleE9mKGVycm9ySG9vayk7XHJcbiAgICAgICAgaWYgKGZJbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLnNwbGljZShmSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybUdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICBpZiAoZm9ybUdyb3VwLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdLmRpc2FibGVkKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUNvbnRyb2xzW25hbWVdLnZhbGlkIHx8IGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzRGlydHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzLCBmb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0VmFsdWUoZm9ybUNvbnRyb2xzW25hbWVdLnZhbHVlLCB7XHJcbiAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUdyb3VwLnZhbGlkIHx8IGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtR3JvdXAubWFya0FzRGlydHkoKTtcclxuICAgICAgICBpZiAoZm9ybUdyb3VwWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZm9ybUdyb3VwWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgZm9ybUdyb3VwLnNldFZhbHVlKGZvcm1Hcm91cC52YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0R3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzUHJpc3RpbmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19