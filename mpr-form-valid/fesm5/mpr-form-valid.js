import { Injectable, Component, ContentChild, TemplateRef, Input, ElementRef, Attribute, Optional, Directive, forwardRef, Renderer2, NgModule } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormGroupName, FormGroupDirective, NgModelGroup, NG_VALIDATORS, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import scrollIntoView from 'dom-scroll-into-view';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 全局验证消息， 存储默认消息
 */
var  /**
 * 全局验证消息， 存储默认消息
 */
GlobalValidMsgService = /** @class */ (function () {
    function GlobalValidMsgService() {
        this.validMsg = new Map();
    }
    /**
     * 设置错误key的默认消息
     * @param {?} msgKey 错误key
     * @param {?} msgValue 错误消息
     * @return {?}
     */
    GlobalValidMsgService.prototype.registerMsg = /**
     * 设置错误key的默认消息
     * @param {?} msgKey 错误key
     * @param {?} msgValue 错误消息
     * @return {?}
     */
    function (msgKey, msgValue) {
        if (!msgKey || !msgValue) {
            throw new Error('msg key and value must not empty');
        }
        this.validMsg.set(msgKey.toLowerCase(), msgValue);
    };
    /**
     * @param {?} msgKey
     * @return {?}
     */
    GlobalValidMsgService.prototype.getMsg = /**
     * @param {?} msgKey
     * @return {?}
     */
    function (msgKey) {
        if (!msgKey) {
            return null;
        }
        return this.validMsg.get(msgKey.toLowerCase());
    };
    return GlobalValidMsgService;
}());
var /** @type {?} */ globalValidMsgServ = new GlobalValidMsgService();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormValidMsgService = /** @class */ (function () {
    function FormValidMsgService() {
        this.validMsg = {};
    }
    /**
     * @param {?} msgKey
     * @param {?} msgValue
     * @return {?}
     */
    FormValidMsgService.prototype.setValidMsg = /**
     * @param {?} msgKey
     * @param {?} msgValue
     * @return {?}
     */
    function (msgKey, msgValue) {
        if (!msgValue) {
            return;
        }
        this.validMsg[msgKey.toLowerCase()] = msgValue;
    };
    /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    FormValidMsgService.prototype.getValidMsg = /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    function (msgPath, error) {
        var /** @type {?} */ minWeight = Number.MAX_VALUE;
        var /** @type {?} */ errorMsg = '';
        var /** @type {?} */ tmpMsg;
        var /** @type {?} */ tmpWeight;
        msgPath = (msgPath || '').toLowerCase();
        if (!error || !msgPath) {
            return { errorMsg: errorMsg, minWeight: minWeight };
        }
        for (var /** @type {?} */ name_1 in error) {
            if (!error.hasOwnProperty(name_1)) {
                continue;
            }
            var /** @type {?} */ orgName = name_1;
            name_1 = name_1.toLowerCase();
            tmpMsg = this.formartMsg(this.validMsg[msgPath + '.' + name_1] || globalValidMsgServ.getMsg(name_1), error[orgName]);
            if (!tmpMsg) {
                continue;
            }
            if (Number.isNaN(Number(error[name_1]))) {
                tmpWeight = 1000;
            }
            else {
                tmpWeight = Number(error[name_1]);
            }
            if (tmpWeight < minWeight) {
                minWeight = tmpWeight;
                errorMsg = tmpMsg;
            }
        }
        return { errorMsg: errorMsg, minWeight: minWeight };
    };
    /**
     * @param {?} msg
     * @param {?} value
     * @return {?}
     */
    FormValidMsgService.prototype.formartMsg = /**
     * @param {?} msg
     * @param {?} value
     * @return {?}
     */
    function (msg, value) {
        if (typeof value !== 'object' || !value) {
            return msg;
        }
        return msg.replace(/\{(.+)\}/g, function (match, p1) {
            return value[p1] || '';
        });
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    FormValidMsgService.prototype.resetMsg = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        if (typeof msg !== 'object') {
            throw Error('form valid msg must be a object');
        }
        //this.validMsg = {};
        for (var /** @type {?} */ name_2 in msg) {
            if (typeof msg[name_2] !== 'object') {
                this.validMsg[name_2.toLowerCase()] = msg[name_2];
            }
            else {
                this.formatMsg(msg[name_2], name_2.toLowerCase(), this.validMsg);
            }
        }
    };
    /**
     * @param {?} msg
     * @param {?} path
     * @param {?} result
     * @return {?}
     */
    FormValidMsgService.prototype.formatMsg = /**
     * @param {?} msg
     * @param {?} path
     * @param {?} result
     * @return {?}
     */
    function (msg, path, result) {
        for (var /** @type {?} */ name_3 in msg) {
            if (typeof msg[name_3] !== 'object') {
                result[path + '.' + name_3.toLowerCase()] = msg[name_3];
            }
            else {
                this.formatMsg(msg[name_3], path + '.' + name_3.toLowerCase(), result);
            }
        }
    };
    FormValidMsgService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormValidMsgService.ctorParameters = function () { return []; };
    return FormValidMsgService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ VALID_COMPONENT_NAME = 'mpr-form-control-valid';
var FormControlValidComponent = /** @class */ (function () {
    function FormControlValidComponent(controlName, container, errMsgServ, globalValidServ, elemRef) {
        this.container = container;
        this.errMsgServ = errMsgServ;
        this.globalValidServ = globalValidServ;
        this.elemRef = elemRef;
        //只显示formgroup本身的错误，不显示group下control的错误
        this.onlyGroup = false;
        this.groupValidControlLength = 1;
        this.delete = false;
        if (controlName) {
            this.controlName = controlName.replace(/'/g, '');
        }
    }
    /**
     * @return {?}
     */
    FormControlValidComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    FormControlValidComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        //  兼容ngFrom
        // Promise.resolve(null).then(() => {
        //   this.bindControlErrorMsg();
        // });
        setTimeout(function () {
            if (!_this.delete) {
                _this.bindControlErrorMsg();
            }
        }, 500);
    };
    /**
     * @return {?}
     */
    FormControlValidComponent.prototype.bindControlErrorMsg = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.controlName = this.getFormControlName();
        if (!this.controlName) {
            throw new Error("can't find controlName");
        }
        console.log(this.controlName);
        var /** @type {?} */ path = '';
        var /** @type {?} */ isFormControl = this.container.control.get(this.controlName) &&
            this.container.control.get(this.controlName) instanceof FormControl;
        if (!isFormControl) {
            // from root or from formGroupName
            this.formControl = this.container.control;
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(function () {
                // if (this.formControl.pristine) {
                //   return;
                // }
                if (_this.onlyGroup) {
                    _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors)['errorMsg'];
                }
                else {
                    _this.errorMsg = _this.getGroupControlValidMsg(/** @type {?} */ (_this.formControl), path || _this.controlName, {
                        minWeight: Number.MAX_VALUE,
                        errorMsg: ''
                    })['errorMsg'];
                }
            });
        }
        else {
            this.formControl = this.container.control.get(this.controlName);
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(function () {
                // if (this.formControl.pristine) {
                //   return;
                // }
                // if (this.formControl.pristine) {
                //   return;
                // }
                _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors)['errorMsg'];
                if (_this.errorMsg) {
                    Promise.resolve(null).then(function () {
                        _this.globalValidServ.scrollTo(_this.elemRef.nativeElement);
                    });
                }
            });
        }
        if (!this.formControl) {
            throw new Error('formControl instance not find');
        }
        this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl, this.errorHook);
    };
    /**
     * @return {?}
     */
    FormControlValidComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        if (this.formControl) {
            this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
        }
        this.delete = true;
    };
    /**
     * @param {?} control
     * @param {?} path
     * @return {?}
     */
    FormControlValidComponent.prototype.setFormControlMsgListener = /**
     * @param {?} control
     * @param {?} path
     * @return {?}
     */
    function (control, path) {
        var _this = this;
        control.valueChanges.subscribe(function () {
            var /** @type {?} */ errorInfo = _this.errMsgServ.getValidMsg(path || _this.controlName, control.errors);
        });
        if (control instanceof FormGroup) {
            for (var /** @type {?} */ name_1 in control.controls) {
                this.setFormControlMsgListener(/** @type {?} */ (control.get(name_1)), path + '.' + name_1);
            }
        }
    };
    /**
     * 获取group下面的所有验证错误消息
     * @param {?} control
     * @param {?} path
     * @param {?} errorInfo
     * @return {?}
     */
    FormControlValidComponent.prototype.getGroupControlValidMsg = /**
     * 获取group下面的所有验证错误消息
     * @param {?} control
     * @param {?} path
     * @param {?} errorInfo
     * @return {?}
     */
    function (control, path, errorInfo) {
        if (control instanceof FormControl && !control.pristine) {
            return this.errMsgServ.getValidMsg(path, control.errors);
        }
        else if (control instanceof FormControl && control.pristine) {
            return '';
        }
        var /** @type {?} */ tmpErrorInfo;
        for (var /** @type {?} */ name_2 in control.controls) {
            tmpErrorInfo = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name_2)), path + '.' + name_2, errorInfo);
            if (tmpErrorInfo && tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
                errorInfo = tmpErrorInfo;
            }
        }
        if (!control.pristine) {
            tmpErrorInfo = this.errMsgServ.getValidMsg(path, control.errors);
        }
        if (tmpErrorInfo && tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
            errorInfo = tmpErrorInfo;
        }
        return errorInfo;
    };
    /**
     * @return {?}
     */
    FormControlValidComponent.prototype.getParentGroupELem = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ parentElement = this.elemRef.nativeElement.parentElement;
        // const arrtributeNames: Array<string> = parentElement.getAttributeNames();
        // console.log(parentElement.getAttribute('ng-reflect-form'));
        while (parentElement &&
            !parentElement.getAttribute('formgroupname') &&
            !parentElement.getAttribute('formGroupName') &&
            !parentElement.getAttribute('formgroup')) {
            if (parentElement.nodeName.toLocaleLowerCase() === 'form' ||
                parentElement.nodeName.toLocaleLowerCase() === 'ngform') {
                break;
            }
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            console.log(this.elemRef.nativeElement);
            throw new Error('can not find parentElement');
        }
        return parentElement;
    };
    /**
     * @param {?} searchElem
     * @return {?}
     */
    FormControlValidComponent.prototype.getSlibingFormContrlElem = /**
     * @param {?} searchElem
     * @return {?}
     */
    function (searchElem) {
        var /** @type {?} */ previousSibling = searchElem.previousElementSibling;
        while (previousSibling &&
            !previousSibling.hasAttribute('formcontrolname') &&
            !previousSibling.hasAttribute('formControlName') &&
            !previousSibling.hasAttribute('name')) {
            // if(previousSibling.hasAttribute("formGroupName") || previousSibling.hasAttribute("[formGroup]")){
            //   throw new Error("have search to root");
            // }
            previousSibling = previousSibling.previousElementSibling;
        }
        if (!previousSibling) {
            throw new Error('mpr-form-control-valid must have a formcontrol sibiling');
        }
        return previousSibling;
    };
    /**
     * 自动查找当前验证对应的formControlName或者formGroupName
     * @return {?}
     */
    FormControlValidComponent.prototype.getFormControlName = /**
     * 自动查找当前验证对应的formControlName或者formGroupName
     * @return {?}
     */
    function () {
        if (this.controlName) {
            // 手动设定了controlName
            return this.controlName;
        }
        var /** @type {?} */ controlName;
        if (!this.container) {
            throw new Error('only one [formControl] not support, There must be a formGroupName or [formGroup]');
        }
        else {
            var /** @type {?} */ parentElement = this.getParentGroupELem();
            var /** @type {?} */ groupValidControlLength = parentElement.querySelectorAll(VALID_COMPONENT_NAME).length;
            this.groupValidControlLength = groupValidControlLength;
            if (this.container instanceof FormGroupDirective && groupValidControlLength <= 1) {
                // 直接是根节点对应整个from [formGroup]="formGroup"
                // 整个form表单只有一个mpr-form-control-valid，则以当前formGroup对应的变量名为controlName
                throw new Error('you should set controlName by yourself');
            }
            else if (this.container instanceof FormGroupName && groupValidControlLength <= 1) {
                // 父节点是form表单中某个group
                // 整个group只有一个mpr-form-control-valid
                // 优先取fromGroup的验证
                controlName = parentElement.getAttribute('formgroupname') || parentElement.getAttribute('fromGroupName');
            }
            else if (this.container instanceof NgModelGroup && groupValidControlLength <= 1) {
                // 父节点是form表单中某个group
                // 整个group只有一个mpr-form-control-valid
                // 优先取fromGroup的验证
                controlName = this.container.name;
            }
            else {
                // mpr-form-control-valid 对应一个 formControlName
                // 向前查找兄弟节点
                var /** @type {?} */ siblingElem = this.getSlibingFormContrlElem(this.elemRef.nativeElement);
                controlName =
                    siblingElem.getAttribute('formcontrolname') ||
                        siblingElem.getAttribute('formControlName') ||
                        siblingElem.getAttribute('name');
            }
        }
        // if(this.controlName && this.controlName != controlName){
        //   throw new Error(`you may set a error controlName, you set is: ${this.controlName}, but need is: ${controlName}`);
        // }
        return controlName;
    };
    /**
     * 获取当前formControl相对于formGroup的path
     * @param {?} formControl
     * @param {?} root
     * @param {?} controlName
     * @return {?}
     */
    FormControlValidComponent.prototype.getPath = /**
     * 获取当前formControl相对于formGroup的path
     * @param {?} formControl
     * @param {?} root
     * @param {?} controlName
     * @return {?}
     */
    function (formControl, root, controlName) {
        if (!(root instanceof FormGroup)) {
            if (formControl === root) {
                return controlName;
            }
            return '';
        }
        var /** @type {?} */ path = [];
        for (var /** @type {?} */ ctrlName in root['controls']) {
            if (root['controls'][ctrlName] === formControl) {
                return ctrlName;
            }
            if (root['controls'][ctrlName] instanceof FormGroup) {
                var /** @type {?} */ tmpPath = this.getPath(formControl, root['controls'][ctrlName], controlName);
                if (tmpPath) {
                    path.push(ctrlName);
                    path.push(tmpPath);
                    return path.join('.');
                }
            }
        }
        return path.join('.');
    };
    FormControlValidComponent.decorators = [
        { type: Component, args: [{
                    selector: VALID_COMPONENT_NAME,
                    template: "<span\n    class=\"error\"\n    [ngClass]=\"errorPrompt\"\n    [hidden]=\"!errorMsg\"\n>\n    <ng-container\n        [ngTemplateOutlet]=\"template\"\n        [ngTemplateOutletContext]=\"{errorMsg:errorMsg}\"\n    ></ng-container>\n    <p *ngIf=\"!template\">{{errorMsg}}</p>\n</span>\n",
                    styles: ["p{width:100%;height:17px;line-height:17px;color:#e06a2f;float:left}"]
                },] },
    ];
    /** @nocollapse */
    FormControlValidComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['controlName',] }] },
        { type: ControlContainer, decorators: [{ type: Optional }] },
        { type: FormValidMsgService },
        { type: GlobalValidService },
        { type: ElementRef }
    ]; };
    FormControlValidComponent.propDecorators = {
        onlyGroup: [{ type: Input }],
        errorPrompt: [{ type: Input }],
        controlName: [{ type: Input }],
        errorHook: [{ type: Input }],
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return FormControlValidComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormValidMsgDirective = /** @class */ (function () {
    function FormValidMsgDirective(msgServ) {
        this.msgServ = msgServ;
    }
    Object.defineProperty(FormValidMsgDirective.prototype, "validMsg", {
        set: /**
         * @param {?} msg
         * @return {?}
         */
        function (msg) {
            if (msg) {
                this.msgServ.resetMsg(msg);
            }
        },
        enumerable: true,
        configurable: true
    });
    FormValidMsgDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[isliFormValidMsg]',
                    providers: [FormValidMsgService]
                },] },
    ];
    /** @nocollapse */
    FormValidMsgDirective.ctorParameters = function () { return [
        { type: FormValidMsgService }
    ]; };
    FormValidMsgDirective.propDecorators = {
        validMsg: [{ type: Input, args: ['isliFormValidMsg',] }]
    };
    return FormValidMsgDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ ISBN_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return IsbnValidtorDirective; }),
    multi: true
};
var IsbnValidtorDirective = /** @class */ (function () {
    function IsbnValidtorDirective() {
        globalValidMsgServ.registerMsg('isbn', '请输入正确的ISBN号');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    IsbnValidtorDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if (!(c instanceof FormGroup)) {
            throw new Error('isbn must be a group control');
        }
        var /** @type {?} */ isbn = c.value;
        // 不验证非空
        if (!isbn.isbn1 || !isbn.isbn2 || !isbn.isbn3 || !isbn.isbn4 || !isbn.isbn5) {
            return null;
        }
        if (this.validISBNCode([isbn.isbn1, isbn.isbn2, isbn.isbn3, isbn.isbn4, isbn.isbn5].join(''))) {
            return { isbn: true };
        }
        return null;
    };
    /**
     * @param {?} s
     * @return {?}
     */
    IsbnValidtorDirective.prototype.validISBNCode = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        if (s === '9999999999999') {
            return true;
        }
        if (!this.isBarCode(s)) {
            return false;
        }
        var /** @type {?} */ a = 0, /** @type {?} */ b = 0, /** @type {?} */ c = 0, /** @type {?} */ d = 0, /** @type {?} */ e;
        for (var /** @type {?} */ i = 1; i <= 12; i++) {
            var /** @type {?} */ sc = parseInt(s[i - 1], 10);
            if (i <= 12 && i % 2 === 0) {
                a += sc;
            }
            else if (i <= 11 && i % 2 === 1) {
                b += sc;
            }
        }
        c = a * 3;
        d = b + c;
        if (d % 10 === 0) {
            e = d - d;
        }
        else {
            e = d + (10 - d % 10) - d;
        }
        return e === parseInt(s[12], 10);
    };
    /**
     * @param {?} s
     * @return {?}
     */
    IsbnValidtorDirective.prototype.isBarCode = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        if (s.length !== 13) {
            return false;
        }
        var /** @type {?} */ reg = new RegExp(/^[0-9]{12}$/);
        return reg.exec(s.substring(0, 12)) != null;
    };
    IsbnValidtorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprIsbnValid]',
                    providers: [ISBN_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    IsbnValidtorDirective.ctorParameters = function () { return []; };
    return IsbnValidtorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ ISBN_PART_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return IsbnPartValidDirective; }),
    multi: true
};
var IsbnPartValidDirective = /** @class */ (function () {
    function IsbnPartValidDirective() {
        globalValidMsgServ.registerMsg('isbnPart34', '第三组和第四组一共为8位数字');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    IsbnPartValidDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if (!(c instanceof FormGroup)) {
            throw new Error('isbn must be a group control');
        }
        var /** @type {?} */ isbn = c.value;
        if (!isbn.isbn3 || !isbn.isbn4) {
            return null;
        }
        // 验证第三组和第四组一共为8位数字
        if (isbn.isbn3.length + isbn.isbn4.length !== 8) {
            return { isbnPart34: true };
        }
        return null;
    };
    IsbnPartValidDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprIsbnPartValid]',
                    providers: [ISBN_PART_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    IsbnPartValidDirective.ctorParameters = function () { return []; };
    return IsbnPartValidDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ ISBN_HEADER_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return IsbnHeaderValidDirective; }),
    multi: true
};
var IsbnHeaderValidDirective = /** @class */ (function () {
    function IsbnHeaderValidDirective() {
        globalValidMsgServ.registerMsg('isbnHeader', '第一组必须为978或979');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    IsbnHeaderValidDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if (!c.value) {
            return null;
        }
        if (['999', '978', '979', '000'].indexOf(c.value) < 0) {
            return { isbnHeader: true };
        }
        return null;
    };
    IsbnHeaderValidDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprIsbnHeaderValid]',
                    providers: [ISBN_HEADER_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    IsbnHeaderValidDirective.ctorParameters = function () { return []; };
    return IsbnHeaderValidDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ FLOAT_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return FloatOnlyValidtorDirective; }),
    multi: true
};
var FloatOnlyValidtorDirective = /** @class */ (function () {
    function FloatOnlyValidtorDirective() {
        globalValidMsgServ.registerMsg('float', '请输入浮点数');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    FloatOnlyValidtorDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        var /** @type {?} */ floatVal = parseFloat('' + c.value);
        if (isNaN(floatVal)) {
            return { float: true };
        }
        return null;
    };
    FloatOnlyValidtorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprFloatOnlyValidtor]',
                    providers: [FLOAT_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    FloatOnlyValidtorDirective.ctorParameters = function () { return []; };
    return FloatOnlyValidtorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MprFormGroupDirective = /** @class */ (function () {
    function MprFormGroupDirective(elem, render) {
        this.elem = elem;
        this.render = render;
    }
    /**
     * @return {?}
     */
    MprFormGroupDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        if (this.elem.nativeElement && this.elem.nativeElement.setAttribute) {
            this.render.setAttribute(this.elem.nativeElement, 'formgroup', 'formgroup');
        }
        else if (this.elem.nativeElement && this.elem.nativeElement.parentElement) {
            this.render.setAttribute(this.elem.nativeElement.parentElement, 'formgroup', 'formgroup');
        }
    };
    MprFormGroupDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[formGroup]'
                },] },
    ];
    /** @nocollapse */
    MprFormGroupDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MprFormGroupDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MprFormDirective = /** @class */ (function () {
    function MprFormDirective(elem, render) {
        this.elem = elem;
        this.render = render;
    }
    /**
     * @return {?}
     */
    MprFormDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        if (this.elem.nativeElement && this.elem.nativeElement.setAttribute) {
            this.render.setAttribute(this.elem.nativeElement, 'formgroup', 'formgroup');
        }
        else if (this.elem.nativeElement && this.elem.nativeElement.parentElement) {
            this.render.setAttribute(this.elem.nativeElement.parentElement, 'formgroup', 'formgroup');
        }
    };
    MprFormDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'form,ngForm,[ngForm]'
                },] },
    ];
    /** @nocollapse */
    MprFormDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MprFormDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormValidModule = /** @class */ (function () {
    function FormValidModule() {
    }
    FormValidModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule
                    ],
                    declarations: [
                        FormControlValidComponent,
                        FormValidMsgDirective,
                        IsbnValidtorDirective,
                        IsbnPartValidDirective,
                        IsbnHeaderValidDirective,
                        FloatOnlyValidtorDirective,
                        MprFormGroupDirective,
                        MprFormDirective
                    ],
                    exports: [
                        FormControlValidComponent,
                        FormValidMsgDirective,
                        IsbnValidtorDirective,
                        IsbnPartValidDirective,
                        IsbnHeaderValidDirective,
                        ReactiveFormsModule,
                        FormsModule,
                        FloatOnlyValidtorDirective,
                        MprFormGroupDirective,
                        MprFormDirective
                    ],
                    providers: [
                        GlobalValidService,
                        FormValidMsgService
                    ]
                },] },
    ];
    return FormValidModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//export { FormValidMsgDirective } from './lib/directives/form-valid-msg.directive';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { FormValidModule, GlobalValidService, globalValidMsgServ, FormValidMsgService, FormControlValidComponent, FloatOnlyValidtorDirective, IsbnHeaderValidDirective, IsbnPartValidDirective, IsbnValidtorDirective, MprFormGroupDirective as ɵc, FormValidMsgDirective as ɵb, MprFormDirective as ɵd, GlobalValidMsgService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZGlyZWN0aXZlcy9mb3JtLWdyb3VwLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9mb3JtLXZhbGlkLm1vZHVsZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvcHVibGljX2FwaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogw6XChcKow6XCscKAw6nCqsKMw6jCr8KBw6bCtsKIw6bCgcKvw6/CvMKMIMOlwq3CmMOlwoLCqMOpwrvCmMOowq7CpMOmwrbCiMOmwoHCr1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkTXNnU2VydmljZSB7XHJcblx0cHJpdmF0ZSB2YWxpZE1zZyA9IG5ldyBNYXA8U3RyaW5nLCBTdHJpbmc+KCk7XHJcblx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHQvKipcclxuICAgKiDDqMKuwr7Dp8K9wq7DqcKUwpnDqMKvwq9rZXnDp8KawoTDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gbXNnS2V5IMOpwpTCmcOowq/Cr2tleVxyXG4gICAqIEBwYXJhbSBtc2dWYWx1ZSDDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKi9cclxuXHRwdWJsaWMgcmVnaXN0ZXJNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdGlmICghbXNnS2V5IHx8ICFtc2dWYWx1ZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21zZyBrZXkgYW5kIHZhbHVlIG11c3Qgbm90IGVtcHR5Jyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnZhbGlkTXNnLnNldChtc2dLZXkudG9Mb3dlckNhc2UoKSwgbXNnVmFsdWUpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldE1zZyhtc2dLZXk6IHN0cmluZykge1xyXG5cdFx0aWYgKCFtc2dLZXkpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy52YWxpZE1zZy5nZXQobXNnS2V5LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbFZhbGlkTXNnU2VydiA9IG5ldyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2UoKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IHt9O1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5LnRvTG93ZXJDYXNlKCldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgbGV0IG1pbldlaWdodCA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBsZXQgZXJyb3JNc2cgPSAnJztcclxuICAgIGxldCB0bXBNc2c7XHJcbiAgICBsZXQgdG1wV2VpZ2h0O1xyXG4gICAgbXNnUGF0aCA9IChtc2dQYXRoIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4geyBlcnJvck1zZywgbWluV2VpZ2h0IH07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBlcnJvcikge1xyXG4gICAgICBpZiAoIWVycm9yLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgb3JnTmFtZSA9IG5hbWU7XHJcbiAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIHRtcE1zZyA9IHRoaXMuZm9ybWFydE1zZyh0aGlzLnZhbGlkTXNnW21zZ1BhdGggKyAnLicgKyBuYW1lXSB8fCBnbG9iYWxWYWxpZE1zZ1NlcnYuZ2V0TXNnKG5hbWUpLCBlcnJvcltvcmdOYW1lXSk7XHJcbiAgICAgIGlmICghdG1wTXNnKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKE51bWJlci5pc05hTihOdW1iZXIoZXJyb3JbbmFtZV0pKSkge1xyXG4gICAgICAgIHRtcFdlaWdodCA9IDEwMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG1wV2VpZ2h0ID0gTnVtYmVyKGVycm9yW25hbWVdKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodG1wV2VpZ2h0IDwgbWluV2VpZ2h0KSB7XHJcbiAgICAgICAgbWluV2VpZ2h0ID0gdG1wV2VpZ2h0O1xyXG4gICAgICAgIGVycm9yTXNnID0gdG1wTXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBlcnJvck1zZywgbWluV2VpZ2h0IH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9ybWFydE1zZyhtc2c6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgIXZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbXNnLnJlcGxhY2UoL1xceyguKylcXH0vZywgZnVuY3Rpb24obWF0Y2gsIHAxKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZVtwMV0gfHwgJyc7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE1zZyhtc2c6IE9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBtc2cgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdmb3JtIHZhbGlkIG1zZyBtdXN0IGJlIGEgb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICAvL3RoaXMudmFsaWRNc2cgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRoaXMudmFsaWRNc2dbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIG5hbWUudG9Mb3dlckNhc2UoKSwgdGhpcy52YWxpZE1zZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0TXNnKG1zZzogT2JqZWN0LCBwYXRoOiBzdHJpbmcsIHJlc3VsdDogT2JqZWN0KSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJlc3VsdFtwYXRoICsgJy4nICsgbmFtZS50b0xvd2VyQ2FzZSgpXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIHBhdGggKyAnLicgKyBuYW1lLnRvTG93ZXJDYXNlKCksIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgc2Nyb2xsSW50b1ZpZXcgZnJvbSAnZG9tLXNjcm9sbC1pbnRvLXZpZXcnO1xyXG5cclxuZnVuY3Rpb24gY29tcHV0ZWRTdHlsZShlbCwgcHJvcCkge1xyXG4gIGNvbnN0IGdldENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZTtcclxuICBjb25zdCBzdHlsZSA9XHJcbiAgICAvLyBJZiB3ZSBoYXZlIGdldENvbXB1dGVkU3R5bGVcclxuICAgIGdldENvbXB1dGVkU3R5bGVcclxuICAgICAgPyAvLyBRdWVyeSBpdFxyXG4gICAgICAgIC8vIFRPRE86IEZyb20gQ1NTLVF1ZXJ5IG5vdGVzLCB3ZSBtaWdodCBuZWVkIChub2RlLCBudWxsKSBmb3IgRkZcclxuICAgICAgICBnZXRDb21wdXRlZFN0eWxlKGVsKVxyXG4gICAgICA6IC8vIE90aGVyd2lzZSwgd2UgYXJlIGluIElFIGFuZCB1c2UgY3VycmVudFN0eWxlXHJcbiAgICAgICAgZWwuY3VycmVudFN0eWxlO1xyXG4gIGlmIChzdHlsZSkge1xyXG4gICAgcmV0dXJuIHN0eWxlW1xyXG4gICAgICAvLyBTd2l0Y2ggdG8gY2FtZWxDYXNlIGZvciBDU1NPTVxyXG4gICAgICAvLyBERVY6IEdyYWJiZWQgZnJvbSBqUXVlcnlcclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi8xLjktc3RhYmxlL3NyYy9jc3MuanMjTDE5MS1MMTk0XHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMS45LXN0YWJsZS9zcmMvY29yZS5qcyNMNTkzLUw1OTdcclxuICAgICAgcHJvcC5yZXBsYWNlKC8tKFxcdykvZ2ksICh3b3JkLCBsZXR0ZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICBdO1xyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTY3JvbGxhYmxlQ29udGFpbmVyKG4pIHtcclxuICBsZXQgbm9kZSA9IG47XHJcbiAgbGV0IG5vZGVOYW1lO1xyXG4gIC8qIGVzbGludCBuby1jb25kLWFzc2lnbjowICovXHJcbiAgd2hpbGUgKG5vZGUgJiYgKG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSAhPT0gJ2JvZHknKSB7XHJcbiAgICBjb25zdCBvdmVyZmxvd1kgPSBjb21wdXRlZFN0eWxlKG5vZGUsICdvdmVyZmxvd1knKTtcclxuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNjkwMDQwNy8zMDQwNjA1XHJcbiAgICBpZiAobm9kZSAhPT0gbiAmJiAob3ZlcmZsb3dZID09PSAnYXV0bycgfHwgb3ZlcmZsb3dZID09PSAnc2Nyb2xsJykgJiYgbm9kZS5zY3JvbGxIZWlnaHQgPiBub2RlLmNsaWVudEhlaWdodCkge1xyXG4gICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlTmFtZSA9PT0gJ2JvZHknID8gbm9kZS5vd25lckRvY3VtZW50IDogbm9kZTtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuICBwcml2YXRlIG5lZWRTY3JvbGwgPSBmYWxzZTtcclxuICBwcml2YXRlIHNjcm9sbEVsZW06IEFycmF5PEVsZW1lbnQ+ID0gW107XHJcbiAgcHJpdmF0ZSBkb1Njcm9sbE9ic2VydjogT2JzZXJ2YWJsZTxhbnk+ID0gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyKSA9PiB7XHJcbiAgICB0aGlzLnNjcm9sbE9ic2VydmVyID0gb2JzZXJ2ZXI7XHJcbiAgfSk7XHJcbiAgcHJpdmF0ZSBzY3JvbGxPYnNlcnZlcjogT2JzZXJ2ZXI8YW55PjtcclxuICBwcml2YXRlIHNjcm9sbE9wdGlvbnMgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZG9TY3JvbGxPYnNlcnYucGlwZShkZWJvdW5jZVRpbWUoNTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLm5lZWRTY3JvbGwgfHwgIXRoaXMuc2Nyb2xsRWxlbS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5uZWVkU2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgIGxldCBtaW5TY3JvbGxUb3AgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgICBsZXQgc2Nyb2xsRWxlbTogRWxlbWVudDtcclxuICAgICAgdGhpcy5zY3JvbGxFbGVtLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgICBjb25zdCB0b3AgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICBpZiAobWluU2Nyb2xsVG9wID4gdG9wKSB7XHJcbiAgICAgICAgICBtaW5TY3JvbGxUb3AgPSB0b3A7XHJcbiAgICAgICAgICBzY3JvbGxFbGVtID0gZWxlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIXNjcm9sbEVsZW0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYyA9IGdldFNjcm9sbGFibGVDb250YWluZXIoc2Nyb2xsRWxlbSk7XHJcbiAgICAgIGlmICghYykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBzY3JvbGxJbnRvVmlldyhcclxuICAgICAgICBzY3JvbGxFbGVtLFxyXG4gICAgICAgIGMsXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBvbmx5U2Nyb2xsSWZOZWVkZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldFRvcDogMjAwXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGhpcy5zY3JvbGxPcHRpb25zIHx8IHt9XHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJWYWxpZEZvcm0oZm9ybTogQWJzdHJhY3RDb250cm9sLCBlcnJvckhvb2s6IEZ1bmN0aW9uKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KChlbGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMucHVzaCh7IGZvcm06IGZvcm0sIGNvdW50OiAxLCBlcnJvckhvb2tzOiBbXSB9KTtcclxuICAgIH1cclxuICAgIGlmIChlcnJvckhvb2spIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLnB1c2goZXJyb3JIb29rKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE51bGwoKSB7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLm1hcmtBc1ByaXN0aW5lKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5yZXNldCh7fSwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbGVtRm9ybVsnc3ViJ10pIHtcclxuICAgICAgICBlbGVtRm9ybVsnc3ViJ10udW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgICBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSA9IHRydWU7XHJcbiAgICAgIGNvbnN0IHN1YiA9IGVsZW1Gb3JtLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICBlbGVtRm9ybVsnc3ViJ10udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICBlbGVtRm9ybVsnc3ViJ10gPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgICAgZWxlbUZvcm1bJ3N1YiddID0gc3ViO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2Nyb2xsVG8oZWxlbTogRWxlbWVudCkge1xyXG4gICAgaWYgKCF0aGlzLm5lZWRTY3JvbGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zY3JvbGxFbGVtLnB1c2goZWxlbSk7XHJcbiAgICB0aGlzLnNjcm9sbE9ic2VydmVyLm5leHQoZWxlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRBbGwobmVlZFNjcm9sbCA9IGZhbHNlLCBzY3JvbGxPcHRpb25zID0gbnVsbCkge1xyXG4gICAgdGhpcy5uZWVkU2Nyb2xsID0gbmVlZFNjcm9sbDtcclxuICAgIHRoaXMuc2Nyb2xsT3B0aW9ucyA9IHNjcm9sbE9wdGlvbnM7XHJcbiAgICB0aGlzLnNjcm9sbEVsZW0gPSBbXTtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmIChlbGVtRm9ybS5mb3JtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZWxlbUZvcm0uZm9ybS52YWxpZCB8fCBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ubWFya0FzRGlydHkoKTtcclxuICAgICAgICBpZiAoZWxlbUZvcm0uZm9ybSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtRm9ybS5mb3JtLnN0YXR1cywgZWxlbUZvcm0uZm9ybSk7XHJcbiAgICAgICAgICBpZiAoZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbGVtRm9ybS5mb3JtLnN0YXR1c0NoYW5nZXMuZW1pdChlbGVtRm9ybS5mb3JtLnN0YXR1cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoZWxlbUZvcm0uZm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZWxlbUZvcm0uZm9ybS52YWxpZCkge1xyXG4gICAgICAgICAgZWxlbUZvcm0uZXJyb3JIb29rcy5mb3JFYWNoKChlcnJvckhvb2spID0+IHtcclxuICAgICAgICAgICAgZXJyb3JIb29rKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCA9IGVsZW1Gb3JtLmZvcm0udmFsaWQgJiYgcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVucmVnaXN0ZXJWYWxpZEZvcm0oZm9ybSwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KChlbGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCA+IDEpIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCAtPSAxO1xyXG4gICAgICBpZiAoZXJyb3JIb29rKSB7XHJcbiAgICAgICAgY29uc3QgZkluZGV4ID0gdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLmluZGV4T2YoZXJyb3JIb29rKTtcclxuICAgICAgICBpZiAoZkluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3Muc3BsaWNlKGZJbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGlmIChmb3JtR3JvdXAuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0uZGlzYWJsZWQpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHNbbmFtZV0udmFsaWQgfHwgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSkge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5tYXJrQXNEaXJ0eSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMsIGZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRWYWx1ZShmb3JtQ29udHJvbHNbbmFtZV0udmFsdWUsIHtcclxuICAgICAgICAgICAgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgb25seVNlbGY6IHRydWUsXHJcbiAgICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoZm9ybUNvbnRyb2xzW25hbWVdLnN0YXR1c0NoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPHN0cmluZz4pLmVtaXQoZm9ybUNvbnRyb2xzW25hbWVdLnN0YXR1cyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3JtR3JvdXAudmFsaWQgfHwgZm9ybUdyb3VwWydfcmVzZXQnXSkge1xyXG4gICAgICAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSgpO1xyXG4gICAgICAgIGlmIChmb3JtR3JvdXBbJ19yZXNldCddKSB7XHJcbiAgICAgICAgICBmb3JtR3JvdXBbJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3JtR3JvdXAuc2V0VmFsdWUoZm9ybUdyb3VwLnZhbHVlLCB7IG9ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoZm9ybUdyb3VwLnN0YXR1c0NoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPHN0cmluZz4pLmVtaXQoZm9ybUNvbnRyb2xzW25hbWVdLnN0YXR1cyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRHcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSA9IHRydWU7XHJcbiAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5tYXJrQXNQcmlzdGluZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIElucHV0LFxyXG4gIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQXR0cmlidXRlLFxyXG4gIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lcixcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIEZvcm1Hcm91cCxcclxuICBGb3JtR3JvdXBOYW1lLFxyXG4gIEZvcm1Hcm91cERpcmVjdGl2ZSxcclxuICBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cclxuICAgIGNsYXNzPVwiZXJyb3JcIlxyXG4gICAgW25nQ2xhc3NdPVwiZXJyb3JQcm9tcHRcIlxyXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxyXG4+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcclxuICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxyXG48L3NwYW4+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYHB7d2lkdGg6MTAwJTtoZWlnaHQ6MTdweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiNlMDZhMmY7ZmxvYXQ6bGVmdH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLy/DpcKPwqrDpsKYwr7Dp8Kkwrpmb3JtZ3JvdXDDpsKcwqzDqMK6wqvDp8KawoTDqcKUwpnDqMKvwq/Dr8K8wozDpMK4wo3DpsKYwr7Dp8Kkwrpncm91cMOkwrjCi2NvbnRyb2zDp8KawoTDqcKUwpnDqMKvwq9cclxuICBASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlcnJvclByb21wdDtcclxuICBASW5wdXQoKSBjb250cm9sTmFtZTtcclxuICBASW5wdXQoKSBlcnJvckhvb2s6IEZ1bmN0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8vw6nCqsKMw6jCr8KBw6XCpMKxw6jCtMKlw6bCmMK+w6fCpMK6w6fCmsKEw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcblxyXG4gIHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICBwcml2YXRlIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gMTtcclxuICBwcml2YXRlIGRlbGV0ZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZlxyXG4gICkge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gIMOlwoXCvMOlwq7CuW5nRnJvbVxyXG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIC8vIH0pO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5kZWxldGUpIHtcclxuICAgICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgICAgfVxyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIGJpbmRDb250cm9sRXJyb3JNc2coKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoKTtcclxuICAgIGlmICghdGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBmaW5kIGNvbnRyb2xOYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgY29uc3QgaXNGb3JtQ29udHJvbCA9XHJcbiAgICAgIHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpICYmXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2w7XHJcbiAgICBpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuICAgICAgLy8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAvLyBpZiAodGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSkge1xyXG4gICAgICAgIC8vICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB7XHJcbiAgICAgICAgICAgIG1pbldlaWdodDogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgZXJyb3JNc2c6ICcnXHJcbiAgICAgICAgICB9KVsnZXJyb3JNc2cnXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmZvcm1Db250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgICAgLy8gICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JNc2cpIHtcclxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYuc2Nyb2xsVG8odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWxldGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoKSB7XHJcbiAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBsZXQgZXJyb3JJbmZvID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgICB0aGlzLnNldEZvcm1Db250cm9sTXNnTGlzdGVuZXIoPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpZncm91cMOkwrjCi8Opwp3CosOnwprChMOmwonCgMOmwpzCicOpwqrCjMOowq/CgcOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICogQHBhcmFtIHBhdGhcclxuICAgKi9cclxuICBwcml2YXRlIGdldEdyb3VwQ29udHJvbFZhbGlkTXNnKGNvbnRyb2w6IGFueSwgcGF0aDogc3RyaW5nLCBlcnJvckluZm8pIHtcclxuICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wgJiYgIWNvbnRyb2wucHJpc3RpbmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCAmJiBjb250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGxldCB0bXBFcnJvckluZm87XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgdG1wRXJyb3JJbmZvID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSwgZXJyb3JJbmZvKTtcclxuICAgICAgaWYgKHRtcEVycm9ySW5mbyAmJiB0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSkge1xyXG4gICAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFjb250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9XHJcbiAgICBpZiAodG1wRXJyb3JJbmZvICYmIHRtcEVycm9ySW5mb1snbWluV2VpZ2h0J10gPCBlcnJvckluZm9bJ21pbldlaWdodCddKSB7XHJcbiAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvckluZm87XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhcmVudEdyb3VwRUxlbSgpOiBFbGVtZW50IHtcclxuICAgIGxldCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIC8vIGNvbnN0IGFycnRyaWJ1dGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKSk7XHJcbiAgICB3aGlsZSAoXHJcbiAgICAgIHBhcmVudEVsZW1lbnQgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtR3JvdXBOYW1lJykgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXAnKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJyB8fFxyXG4gICAgICAgIHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ25nZm9ybSdcclxuICAgICAgKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCBmaW5kIHBhcmVudEVsZW1lbnQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIHdoaWxlIChcclxuICAgICAgcHJldmlvdXNTaWJsaW5nICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ25hbWUnKVxyXG4gICAgKSB7XHJcbiAgICAgIC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIH1cclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowofCqsOlworCqMOmwp/CpcOmwonCvsOlwr3Ck8OlwonCjcOpwqrCjMOowq/CgcOlwq/CucOlwrrClMOnwprChGZvcm1Db250cm9sTmFtZcOmwojClsOowoDChWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgLy8gw6bCicKLw6XCisKow6jCrsK+w6XCrsKaw6TCusKGY29udHJvbE5hbWVcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xOYW1lO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuICAgICAgY29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuICAgICAgdGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwpvCtMOmwo7CpcOmwpjCr8OmwqDCucOoworCgsOnwoLCucOlwq/CucOlwrrClMOmwpXCtMOkwrjCqmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmZvcm3DqMKhwqjDpcKNwpXDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkw6/CvMKMw6XCiMKZw6TCu8Klw6XCvcKTw6XCicKNZm9ybUdyb3Vww6XCr8K5w6XCusKUw6fCmsKEw6XCj8KYw6nCh8KPw6XCkMKNw6TCuMK6Y29udHJvbE5hbWVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgfHwgcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zyb21Hcm91cE5hbWUnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSB0aGlzLmNvbnRhaW5lci5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1wci1mb3JtLWNvbnRyb2wtdmFsaWQgw6XCr8K5w6XCusKUw6TCuMKAw6TCuMKqIGZvcm1Db250cm9sTmFtZVxyXG4gICAgICAgIC8vIMOlwpDCkcOlwonCjcOmwp/CpcOmwonCvsOlwoXChMOlwrzCn8OoworCgsOnwoLCuVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmdFbGVtID0gdGhpcy5nZXRTbGliaW5nRm9ybUNvbnRybEVsZW0odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnRyb2xOYW1lID1cclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpZih0aGlzLmNvbnRyb2xOYW1lICYmIHRoaXMuY29udHJvbE5hbWUgIT0gY29udHJvbE5hbWUpe1xyXG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYHlvdSBtYXkgc2V0IGEgZXJyb3IgY29udHJvbE5hbWUsIHlvdSBzZXQgaXM6ICR7dGhpcy5jb250cm9sTmFtZX0sIGJ1dCBuZWVkIGlzOiAke2NvbnRyb2xOYW1lfWApO1xyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWw6XCvcKTw6XCicKNZm9ybUNvbnRyb2zDp8KbwrjDpcKvwrnDpMK6wo5mb3JtR3JvdXDDp8KawoRwYXRoXHJcbiAgICogQHBhcmFtIGZvcm1Db250cm9sXHJcbiAgICogQHBhcmFtIHJvb3RcclxuICAgKiBAcGFyYW0gY29udHJvbE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhdGgoZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcm9vdCwgY29udHJvbE5hbWUpIHtcclxuICAgIGlmICghKHJvb3QgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbCA9PT0gcm9vdCkge1xyXG4gICAgICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGN0cmxOYW1lIGluIHJvb3RbJ2NvbnRyb2xzJ10pIHtcclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdID09PSBmb3JtQ29udHJvbCkge1xyXG4gICAgICAgIHJldHVybiBjdHJsTmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBjb25zdCB0bXBQYXRoID0gdGhpcy5nZXRQYXRoKGZvcm1Db250cm9sLCByb290Wydjb250cm9scyddW2N0cmxOYW1lXSwgY29udHJvbE5hbWUpO1xyXG4gICAgICAgIGlmICh0bXBQYXRoKSB7XHJcbiAgICAgICAgICBwYXRoLnB1c2goY3RybE5hbWUpO1xyXG4gICAgICAgICAgcGF0aC5wdXNoKHRtcFBhdGgpO1xyXG4gICAgICAgICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpc2xpRm9ybVZhbGlkTXNnXScsXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVZhbGlkTXNnU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgnaXNsaUZvcm1WYWxpZE1zZycpIHNldCB2YWxpZE1zZyhtc2cpIHtcclxuICAgIGlmIChtc2cpIHtcclxuICAgICAgdGhpcy5tc2dTZXJ2LnJlc2V0TXNnKG1zZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UpIHtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU0JOIHtcclxuICBpc2JuMTogc3RyaW5nO1xyXG4gIGlzYm4yOiBzdHJpbmc7XHJcbiAgaXNibjM6IHN0cmluZztcclxuICBpc2JuNDogc3RyaW5nO1xyXG4gIGlzYm41OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IElTQk5fVkFMSURUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuVmFsaWR0b3JEaXJlY3RpdmUpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuVmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXNiblZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm4nLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCrcKjw6fCocKuw6fCmsKESVNCTsOlwo/CtycpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcclxuICAgIC8vIMOkwrjCjcOpwqrCjMOowq/CgcOpwp3CnsOnwqnCulxyXG4gICAgaWYgKCFpc2JuLmlzYm4xIHx8ICFpc2JuLmlzYm4yIHx8ICFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40IHx8ICFpc2JuLmlzYm41KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkSVNCTkNvZGUoW2lzYm4uaXNibjEsIGlzYm4uaXNibjIsIGlzYm4uaXNibjMsIGlzYm4uaXNibjQsIGlzYm4uaXNibjVdLmpvaW4oJycpKSkge1xyXG4gICAgICByZXR1cm4geyBpc2JuOiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRJU0JOQ29kZShzKSB7XHJcbiAgICBpZiAocyA9PT0gJzk5OTk5OTk5OTk5OTknKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmlzQmFyQ29kZShzKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgYSA9IDAsIGIgPSAwLCBjID0gMCwgZCA9IDAsIGU7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHNjID0gcGFyc2VJbnQoc1tpIC0gMV0sIDEwKTtcclxuICAgICAgaWYgKGkgPD0gMTIgJiYgaSAlIDIgPT09IDApIHtcclxuICAgICAgICBhICs9IHNjO1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMTEgJiYgaSAlIDIgPT09IDEpIHtcclxuICAgICAgICBiICs9IHNjO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjID0gYSAqIDM7XHJcbiAgICBkID0gYiArIGM7XHJcbiAgICBpZiAoZCAlIDEwID09PSAwKSB7XHJcbiAgICAgIGUgPSBkIC0gZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGUgPSBkICsgKDEwIC0gZCAlIDEwKSAtIGQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZSA9PT0gcGFyc2VJbnQoc1sxMl0sIDEwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNCYXJDb2RlKHMpOiBib29sZWFuIHtcclxuICAgIGlmIChzLmxlbmd0aCAhPT0gMTMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgvXlswLTldezEyfSQvKTtcclxuICAgIHJldHVybiByZWcuZXhlYyhzLnN1YnN0cmluZygwLCAxMikpICE9IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJU0JOIH0gZnJvbSAnLi9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBJU0JOX1BBUlRfVkFMSURUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuUGFydFZhbGlkRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNiblBhcnRWYWxpZF0nLFxyXG4gIHByb3ZpZGVyczogW0lTQk5fUEFSVF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNiblBhcnQzNCcsICfDp8KswqzDpMK4wonDp8K7woTDpcKSwozDp8KswqzDpcKbwpvDp8K7woTDpMK4woDDpcKFwrHDpMK4wro4w6TCvcKNw6bClcKww6XCrcKXJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xyXG4gICAgaWYgKCFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgLy8gw6nCqsKMw6jCr8KBw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3Cl1xyXG4gICAgaWYgKGlzYm4uaXNibjMubGVuZ3RoICsgaXNibi5pc2JuNC5sZW5ndGggIT09IDgpIHtcclxuICAgICAgcmV0dXJuIHsgaXNiblBhcnQzNDogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9IRUFERVJfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX0hFQURFUl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ8OnwqzCrMOkwrjCgMOnwrvChMOlwr/ChcOpwqHCu8OkwrjCujk3OMOmwojCljk3OScpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIWMudmFsdWUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoWyc5OTknLCAnOTc4JywgJzk3OScsICcwMDAnXS5pbmRleE9mKGMudmFsdWUpIDwgMCkge1xyXG4gICAgICByZXR1cm4geyBpc2JuSGVhZGVyOiB0cnVlfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEZMT0FUX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJGbG9hdE9ubHlWYWxpZHRvcl0nLFxyXG4gIHByb3ZpZGVyczogW0ZMT0FUX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnZmxvYXQnLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCtcKuw6fCgsK5w6bClcKwJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBjb25zdCBmbG9hdFZhbCA9IHBhcnNlRmxvYXQoJycgKyBjLnZhbHVlKTtcclxuICAgIGlmIChpc05hTihmbG9hdFZhbCkpIHtcclxuICAgICAgcmV0dXJuIHsgZmxvYXQ6IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZm9ybUdyb3VwXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1wckZvcm1Hcm91cERpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcjogUmVuZGVyZXIyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBDYWxsZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yLCBpbml0aWFsaXppbmcgaW5wdXQgcHJvcGVydGllcywgYW5kIHRoZSBmaXJzdCBjYWxsIHRvIG5nT25DaGFuZ2VzLlxyXG4gICAgLy8gQWRkICdpbXBsZW1lbnRzIE9uSW5pdCcgdG8gdGhlIGNsYXNzLlxyXG4gICAgaWYgKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQsICdmb3JtZ3JvdXAnLCAnZm9ybWdyb3VwJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQsICdmb3JtZ3JvdXAnLCAnZm9ybWdyb3VwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2Zvcm0sbmdGb3JtLFtuZ0Zvcm1dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXByRm9ybURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcjogUmVuZGVyZXIyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBDYWxsZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yLCBpbml0aWFsaXppbmcgaW5wdXQgcHJvcGVydGllcywgYW5kIHRoZSBmaXJzdCBjYWxsIHRvIG5nT25DaGFuZ2VzLlxyXG4gICAgLy8gQWRkICdpbXBsZW1lbnRzIE9uSW5pdCcgdG8gdGhlIGNsYXNzLlxyXG4gICAgaWYgKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQsICdmb3JtZ3JvdXAnLCAnZm9ybWdyb3VwJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQsICdmb3JtZ3JvdXAnLCAnZm9ybWdyb3VwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNcHJGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS1ncm91cC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNcHJGb3JtRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0uZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBNcHJGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgICBNcHJGb3JtRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgTXByRm9ybUdyb3VwRGlyZWN0aXZlLFxyXG4gICAgTXByRm9ybURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBGb3JtVmFsaWRNc2dTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTW9kdWxlIHsgfVxyXG4iLCJleHBvcnQgeyBGb3JtVmFsaWRNb2R1bGUgfSBmcm9tICcuL2xpYi9mb3JtLXZhbGlkLm1vZHVsZSc7XHJcbmV4cG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuZXhwb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuZXhwb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQnO1xyXG5leHBvcnQgeyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9pc2JuLWhlYWRlci12YWxpZC5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsIElTQk4gfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG4vL2V4cG9ydCB7IEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlJztcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0E7OztBQUFBO0lBRUM7d0JBRG1CLElBQUksR0FBRyxFQUFrQjtLQUM1Qjs7Ozs7OztJQU9ULDJDQUFXOzs7Ozs7Y0FBQyxNQUFjLEVBQUUsUUFBZ0I7UUFDbEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7Ozs7OztJQUc1QyxzQ0FBTTs7OztjQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztnQ0F2QmpEO0lBeUJDLENBQUE7cUJBRVksa0JBQWtCLEdBQUcsSUFBSSxxQkFBcUIsRUFBRTs7Ozs7O0FDM0I3RDtJQU9FO3dCQURtQixFQUFFO0tBQ0w7Ozs7OztJQUVULHlDQUFXOzs7OztjQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNqRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUM7Ozs7Ozs7SUFHMUMseUNBQVc7Ozs7O2NBQUMsT0FBZSxFQUFFLEtBQUs7UUFDdkMscUJBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDakMscUJBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixxQkFBSSxNQUFN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