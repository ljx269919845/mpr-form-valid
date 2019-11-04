(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('dom-scroll-into-view'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('mpr-form-valid', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', 'dom-scroll-into-view', '@angular/common'], factory) :
    (factory((global['mpr-form-valid'] = {}),global.ng.core,global.ng.forms,global.rxjs,global.rxjs.operators,null,global.ng.common));
}(this, (function (exports,core,forms,rxjs,operators,scrollIntoView,common) { 'use strict';

    scrollIntoView = scrollIntoView && scrollIntoView.hasOwnProperty('default') ? scrollIntoView['default'] : scrollIntoView;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * 全局验证消息， 存储默认消息
     */
    var /**
     * 全局验证消息， 存储默认消息
     */ GlobalValidMsgService = (function () {
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
    var FormValidMsgService = (function () {
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
            { type: core.Injectable },
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
    var GlobalValidService = (function () {
        function GlobalValidService() {
            var _this = this;
            this.validForms = [];
            this.needScroll = false;
            this.scrollElem = [];
            this.doScrollObserv = rxjs.Observable.create(function (observer) {
                _this.scrollObserver = observer;
            });
            this.scrollOptions = null;
            this.doScrollObserv.pipe(operators.debounceTime(500)).subscribe(function () {
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
                    if (elemForm.form instanceof forms.FormControl) {
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
                if (needScroll === void 0) {
                    needScroll = false;
                }
                if (scrollOptions === void 0) {
                    scrollOptions = null;
                }
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
                        if (elemForm.form instanceof forms.FormControl) {
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
                    if (formControls[name_1] instanceof forms.FormGroup) {
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
                        ((formControls[name_1].statusChanges)).emit(formControls[name_1].status);
                    }
                    if (!formGroup.valid || formGroup['_reset']) {
                        formGroup.markAsDirty();
                        if (formGroup['_reset']) {
                            formGroup['_reset'] = false;
                            formGroup.setValue(formGroup.value, { onlySelf: true, emitEvent: false });
                        }
                        ((formGroup.statusChanges)).emit(formControls[name_1].status);
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
                    if (formControls[name_2] instanceof forms.FormGroup) {
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
            { type: core.Injectable },
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
    var FormControlValidComponent = (function () {
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
                    this.container.control.get(this.controlName) instanceof forms.FormControl;
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
                if (control instanceof forms.FormGroup) {
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
                if (control instanceof forms.FormControl && !control.pristine) {
                    return this.errMsgServ.getValidMsg(path, control.errors);
                }
                else if (control instanceof forms.FormControl && control.pristine) {
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
                    if (this.container instanceof forms.FormGroupDirective && groupValidControlLength <= 1) {
                        // 直接是根节点对应整个from [formGroup]="formGroup"
                        // 整个form表单只有一个mpr-form-control-valid，则以当前formGroup对应的变量名为controlName
                        throw new Error('you should set controlName by yourself');
                    }
                    else if (this.container instanceof forms.FormGroupName && groupValidControlLength <= 1) {
                        // 父节点是form表单中某个group
                        // 整个group只有一个mpr-form-control-valid
                        // 优先取fromGroup的验证
                        controlName = parentElement.getAttribute('formgroupname') || parentElement.getAttribute('fromGroupName');
                    }
                    else if (this.container instanceof forms.NgModelGroup && groupValidControlLength <= 1) {
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
                if (!(root instanceof forms.FormGroup)) {
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
                    if (root['controls'][ctrlName] instanceof forms.FormGroup) {
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
            { type: core.Component, args: [{
                        selector: VALID_COMPONENT_NAME,
                        template: "<span\n    class=\"error\"\n    [ngClass]=\"errorPrompt\"\n    [hidden]=\"!errorMsg\"\n>\n    <ng-container\n        [ngTemplateOutlet]=\"template\"\n        [ngTemplateOutletContext]=\"{errorMsg:errorMsg}\"\n    ></ng-container>\n    <p *ngIf=\"!template\">{{errorMsg}}</p>\n</span>\n",
                        styles: ["p{width:100%;height:17px;line-height:17px;color:#e06a2f;float:left}"]
                    },] },
        ];
        /** @nocollapse */
        FormControlValidComponent.ctorParameters = function () {
            return [
                { type: String, decorators: [{ type: core.Attribute, args: ['controlName',] }] },
                { type: forms.ControlContainer, decorators: [{ type: core.Optional }] },
                { type: FormValidMsgService },
                { type: GlobalValidService },
                { type: core.ElementRef }
            ];
        };
        FormControlValidComponent.propDecorators = {
            onlyGroup: [{ type: core.Input }],
            errorPrompt: [{ type: core.Input }],
            controlName: [{ type: core.Input }],
            errorHook: [{ type: core.Input }],
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }]
        };
        return FormControlValidComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var FormValidMsgDirective = (function () {
        function FormValidMsgDirective(msgServ) {
            this.msgServ = msgServ;
        }
        Object.defineProperty(FormValidMsgDirective.prototype, "validMsg", {
            set: /**
             * @param {?} msg
             * @return {?}
             */ function (msg) {
                if (msg) {
                    this.msgServ.resetMsg(msg);
                }
            },
            enumerable: true,
            configurable: true
        });
        FormValidMsgDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[isliFormValidMsg]',
                        providers: [FormValidMsgService]
                    },] },
        ];
        /** @nocollapse */
        FormValidMsgDirective.ctorParameters = function () {
            return [
                { type: FormValidMsgService }
            ];
        };
        FormValidMsgDirective.propDecorators = {
            validMsg: [{ type: core.Input, args: ['isliFormValidMsg',] }]
        };
        return FormValidMsgDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ ISBN_VALIDTOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return IsbnValidtorDirective; }),
        multi: true
    };
    var IsbnValidtorDirective = (function () {
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
                if (!(c instanceof forms.FormGroup)) {
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
            { type: core.Directive, args: [{
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
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return IsbnPartValidDirective; }),
        multi: true
    };
    var IsbnPartValidDirective = (function () {
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
                if (!(c instanceof forms.FormGroup)) {
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
            { type: core.Directive, args: [{
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
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return IsbnHeaderValidDirective; }),
        multi: true
    };
    var IsbnHeaderValidDirective = (function () {
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
            { type: core.Directive, args: [{
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
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return FloatOnlyValidtorDirective; }),
        multi: true
    };
    var FloatOnlyValidtorDirective = (function () {
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
            { type: core.Directive, args: [{
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
    var MprFormGroupDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: '[formGroup]'
                    },] },
        ];
        /** @nocollapse */
        MprFormGroupDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        return MprFormGroupDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MprFormDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: 'form,ngForm,[ngForm]'
                    },] },
        ];
        /** @nocollapse */
        MprFormDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        return MprFormDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var FormValidModule = (function () {
        function FormValidModule() {
        }
        FormValidModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule,
                            forms.FormsModule
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
                            forms.ReactiveFormsModule,
                            forms.FormsModule,
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

    exports.FormValidModule = FormValidModule;
    exports.GlobalValidService = GlobalValidService;
    exports.globalValidMsgServ = globalValidMsgServ;
    exports.FormValidMsgService = FormValidMsgService;
    exports.FormControlValidComponent = FormControlValidComponent;
    exports.FloatOnlyValidtorDirective = FloatOnlyValidtorDirective;
    exports.IsbnHeaderValidDirective = IsbnHeaderValidDirective;
    exports.IsbnPartValidDirective = IsbnPartValidDirective;
    exports.IsbnValidtorDirective = IsbnValidtorDirective;
    exports.ɵc = MprFormGroupDirective;
    exports.ɵb = FormValidMsgDirective;
    exports.ɵd = MprFormDirective;
    exports.ɵa = GlobalValidMsgService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS1ncm91cC5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0uZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS12YWxpZC5tb2R1bGUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL3B1YmxpY19hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIMOlwoXCqMOlwrHCgMOpwqrCjMOowq/CgcOmwrbCiMOmwoHCr8OvwrzCjCDDpcKtwpjDpcKCwqjDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2Uge1xyXG5cdHByaXZhdGUgdmFsaWRNc2cgPSBuZXcgTWFwPFN0cmluZywgU3RyaW5nPigpO1xyXG5cdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0LyoqXHJcbiAgICogw6jCrsK+w6fCvcKuw6nClMKZw6jCr8Kva2V5w6fCmsKEw6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDDqcKUwpnDqMKvwq9rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUgw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICovXHJcblx0cHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcblx0XHRpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LnRvTG93ZXJDYXNlKCksIG1zZ1ZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRNc2cobXNnS2V5OiBzdHJpbmcpIHtcclxuXHRcdGlmICghbXNnS2V5KSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMudmFsaWRNc2cuZ2V0KG1zZ0tleS50b0xvd2VyQ2FzZSgpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBzZXRWYWxpZE1zZyhtc2dLZXk6IHN0cmluZywgbXNnVmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dWYWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnW21zZ0tleS50b0xvd2VyQ2FzZSgpXSA9IG1zZ1ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZhbGlkTXNnKG1zZ1BhdGg6IHN0cmluZywgZXJyb3IpIHtcclxuICAgIGxldCBtaW5XZWlnaHQgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgbGV0IGVycm9yTXNnID0gJyc7XHJcbiAgICBsZXQgdG1wTXNnO1xyXG4gICAgbGV0IHRtcFdlaWdodDtcclxuICAgIG1zZ1BhdGggPSAobXNnUGF0aCB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghZXJyb3IgfHwgIW1zZ1BhdGgpIHtcclxuICAgICAgcmV0dXJuIHsgZXJyb3JNc2csIG1pbldlaWdodCB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgaWYgKCFlcnJvci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9yZ05hbWUgPSBuYW1lO1xyXG4gICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0bXBNc2cgPSB0aGlzLmZvcm1hcnRNc2codGhpcy52YWxpZE1zZ1ttc2dQYXRoICsgJy4nICsgbmFtZV0gfHwgZ2xvYmFsVmFsaWRNc2dTZXJ2LmdldE1zZyhuYW1lKSwgZXJyb3Jbb3JnTmFtZV0pO1xyXG4gICAgICBpZiAoIXRtcE1zZykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChOdW1iZXIuaXNOYU4oTnVtYmVyKGVycm9yW25hbWVdKSkpIHtcclxuICAgICAgICB0bXBXZWlnaHQgPSAxMDAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRtcFdlaWdodCA9IE51bWJlcihlcnJvcltuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRtcFdlaWdodCA8IG1pbldlaWdodCkge1xyXG4gICAgICAgIG1pbldlaWdodCA9IHRtcFdlaWdodDtcclxuICAgICAgICBlcnJvck1zZyA9IHRtcE1zZztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgZXJyb3JNc2csIG1pbldlaWdodCB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hcnRNc2cobXNnOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8ICF2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gbXNnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1zZy5yZXBsYWNlKC9cXHsoLispXFx9L2csIGZ1bmN0aW9uKG1hdGNoLCBwMSkge1xyXG4gICAgICByZXR1cm4gdmFsdWVbcDFdIHx8ICcnO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRNc2cobXNnOiBPYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgbXNnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcignZm9ybSB2YWxpZCBtc2cgbXVzdCBiZSBhIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgLy90aGlzLnZhbGlkTXNnID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnZhbGlkTXNnW25hbWUudG9Mb3dlckNhc2UoKV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBuYW1lLnRvTG93ZXJDYXNlKCksIHRoaXMudmFsaWRNc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdE1zZyhtc2c6IE9iamVjdCwgcGF0aDogc3RyaW5nLCByZXN1bHQ6IE9iamVjdCkge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXN1bHRbcGF0aCArICcuJyArIG5hbWUudG9Mb3dlckNhc2UoKV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBwYXRoICsgJy4nICsgbmFtZS50b0xvd2VyQ2FzZSgpLCByZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHNjcm9sbEludG9WaWV3IGZyb20gJ2RvbS1zY3JvbGwtaW50by12aWV3JztcclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVkU3R5bGUoZWwsIHByb3ApIHtcclxuICBjb25zdCBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XHJcbiAgY29uc3Qgc3R5bGUgPVxyXG4gICAgLy8gSWYgd2UgaGF2ZSBnZXRDb21wdXRlZFN0eWxlXHJcbiAgICBnZXRDb21wdXRlZFN0eWxlXHJcbiAgICAgID8gLy8gUXVlcnkgaXRcclxuICAgICAgICAvLyBUT0RPOiBGcm9tIENTUy1RdWVyeSBub3Rlcywgd2UgbWlnaHQgbmVlZCAobm9kZSwgbnVsbCkgZm9yIEZGXHJcbiAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShlbClcclxuICAgICAgOiAvLyBPdGhlcndpc2UsIHdlIGFyZSBpbiBJRSBhbmQgdXNlIGN1cnJlbnRTdHlsZVxyXG4gICAgICAgIGVsLmN1cnJlbnRTdHlsZTtcclxuICBpZiAoc3R5bGUpIHtcclxuICAgIHJldHVybiBzdHlsZVtcclxuICAgICAgLy8gU3dpdGNoIHRvIGNhbWVsQ2FzZSBmb3IgQ1NTT01cclxuICAgICAgLy8gREVWOiBHcmFiYmVkIGZyb20galF1ZXJ5XHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMS45LXN0YWJsZS9zcmMvY3NzLmpzI0wxOTEtTDE5NFxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzEuOS1zdGFibGUvc3JjL2NvcmUuanMjTDU5My1MNTk3XHJcbiAgICAgIHByb3AucmVwbGFjZSgvLShcXHcpL2dpLCAod29yZCwgbGV0dGVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICB9KVxyXG4gICAgXTtcclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2Nyb2xsYWJsZUNvbnRhaW5lcihuKSB7XHJcbiAgbGV0IG5vZGUgPSBuO1xyXG4gIGxldCBub2RlTmFtZTtcclxuICAvKiBlc2xpbnQgbm8tY29uZC1hc3NpZ246MCAqL1xyXG4gIHdoaWxlIChub2RlICYmIChub2RlTmFtZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgIT09ICdib2R5Jykge1xyXG4gICAgY29uc3Qgb3ZlcmZsb3dZID0gY29tcHV0ZWRTdHlsZShub2RlLCAnb3ZlcmZsb3dZJyk7XHJcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzY5MDA0MDcvMzA0MDYwNVxyXG4gICAgaWYgKG5vZGUgIT09IG4gJiYgKG92ZXJmbG93WSA9PT0gJ2F1dG8nIHx8IG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcpICYmIG5vZGUuc2Nyb2xsSGVpZ2h0ID4gbm9kZS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdib2R5JyA/IG5vZGUub3duZXJEb2N1bWVudCA6IG5vZGU7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1zOiBBcnJheTxhbnk+ID0gW107XHJcbiAgcHJpdmF0ZSBuZWVkU2Nyb2xsID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzY3JvbGxFbGVtOiBBcnJheTxFbGVtZW50PiA9IFtdO1xyXG4gIHByaXZhdGUgZG9TY3JvbGxPYnNlcnY6IE9ic2VydmFibGU8YW55PiA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xyXG4gICAgdGhpcy5zY3JvbGxPYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gIH0pO1xyXG4gIHByaXZhdGUgc2Nyb2xsT2JzZXJ2ZXI6IE9ic2VydmVyPGFueT47XHJcbiAgcHJpdmF0ZSBzY3JvbGxPcHRpb25zID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmRvU2Nyb2xsT2JzZXJ2LnBpcGUoZGVib3VuY2VUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5uZWVkU2Nyb2xsIHx8ICF0aGlzLnNjcm9sbEVsZW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubmVlZFNjcm9sbCA9IGZhbHNlO1xyXG4gICAgICBsZXQgbWluU2Nyb2xsVG9wID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgICAgbGV0IHNjcm9sbEVsZW06IEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuc2Nyb2xsRWxlbS5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9wID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgaWYgKG1pblNjcm9sbFRvcCA+IHRvcCkge1xyXG4gICAgICAgICAgbWluU2Nyb2xsVG9wID0gdG9wO1xyXG4gICAgICAgICAgc2Nyb2xsRWxlbSA9IGVsZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFzY3JvbGxFbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGMgPSBnZXRTY3JvbGxhYmxlQ29udGFpbmVyKHNjcm9sbEVsZW0pO1xyXG4gICAgICBpZiAoIWMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2Nyb2xsSW50b1ZpZXcoXHJcbiAgICAgICAgc2Nyb2xsRWxlbSxcclxuICAgICAgICBjLFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb25seVNjcm9sbElmTmVlZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXRUb3A6IDIwMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsT3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmxlbmd0aDtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSwgZXJyb3JIb29rczogW10gfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXJyb3JIb29rKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5wdXNoKGVycm9ySG9vayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXROdWxsKCkge1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5tYXJrQXNQcmlzdGluZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQoe30sIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucmVzZXRHcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbUZvcm1bJ3N1YiddKSB7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBjb25zdCBzdWIgPSBlbGVtRm9ybS5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgZWxlbUZvcm1bJ3N1YiddID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICAgIGVsZW1Gb3JtWydzdWInXSA9IHN1YjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvKGVsZW06IEVsZW1lbnQpIHtcclxuICAgIGlmICghdGhpcy5uZWVkU2Nyb2xsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2Nyb2xsRWxlbS5wdXNoKGVsZW0pO1xyXG4gICAgdGhpcy5zY3JvbGxPYnNlcnZlci5uZXh0KGVsZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKG5lZWRTY3JvbGwgPSBmYWxzZSwgc2Nyb2xsT3B0aW9ucyA9IG51bGwpIHtcclxuICAgIHRoaXMubmVlZFNjcm9sbCA9IG5lZWRTY3JvbGw7XHJcbiAgICB0aGlzLnNjcm9sbE9wdGlvbnMgPSBzY3JvbGxPcHRpb25zO1xyXG4gICAgdGhpcy5zY3JvbGxFbGVtID0gW107XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKChlbGVtRm9ybSkgPT4ge1xyXG4gICAgICBpZiAoZWxlbUZvcm0uZm9ybS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQgfHwgZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLm1hcmtBc0RpcnR5KCk7XHJcbiAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZWxlbUZvcm0uZm9ybS5zdGF0dXMsIGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgICAgaWYgKGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0VmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwge1xyXG4gICAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcclxuICAgICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxlbUZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzLmVtaXQoZWxlbUZvcm0uZm9ybS5zdGF0dXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVsZW1Gb3JtLmZvcm0udmFsaWQpIHtcclxuICAgICAgICAgIGVsZW1Gb3JtLmVycm9ySG9va3MuZm9yRWFjaCgoZXJyb3JIb29rKSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ySG9vayhlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0sIGVycm9ySG9vazogRnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgICAgaWYgKGVycm9ySG9vaykge1xyXG4gICAgICAgIGNvbnN0IGZJbmRleCA9IHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uZXJyb3JIb29rcy5pbmRleE9mKGVycm9ySG9vayk7XHJcbiAgICAgICAgaWYgKGZJbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5lcnJvckhvb2tzLnNwbGljZShmSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybUdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgICBpZiAoZm9ybUdyb3VwLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdLmRpc2FibGVkKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUNvbnRyb2xzW25hbWVdLnZhbGlkIHx8IGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzRGlydHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzLCBmb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddKSB7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0VmFsdWUoZm9ybUNvbnRyb2xzW25hbWVdLnZhbHVlLCB7XHJcbiAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsXHJcbiAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm9ybUdyb3VwLnZhbGlkIHx8IGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICBmb3JtR3JvdXAubWFya0FzRGlydHkoKTtcclxuICAgICAgICBpZiAoZm9ybUdyb3VwWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgZm9ybUdyb3VwWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgZm9ybUdyb3VwLnNldFZhbHVlKGZvcm1Hcm91cC52YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxzdHJpbmc+KS5lbWl0KGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0R3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSB0cnVlO1xyXG4gICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzUHJpc3RpbmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBJbnB1dCxcclxuICBJbmplY3QsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEF0dHJpYnV0ZSxcclxuICBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xDb250YWluZXIsXHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSxcclxuICBGb3JtQ29udHJvbCxcclxuICBGb3JtR3JvdXAsXHJcbiAgRm9ybUdyb3VwTmFtZSxcclxuICBGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgTmdNb2RlbEdyb3VwXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcblxyXG5jb25zdCBWQUxJRF9DT01QT05FTlRfTkFNRSA9ICdtcHItZm9ybS1jb250cm9sLXZhbGlkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBWQUxJRF9DT01QT05FTlRfTkFNRSxcclxuICB0ZW1wbGF0ZTogYDxzcGFuXHJcbiAgICBjbGFzcz1cImVycm9yXCJcclxuICAgIFtuZ0NsYXNzXT1cImVycm9yUHJvbXB0XCJcclxuICAgIFtoaWRkZW5dPVwiIWVycm9yTXNnXCJcclxuPlxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXHJcbiAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICA8cCAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7ZXJyb3JNc2d9fTwvcD5cclxuPC9zcGFuPlxyXG5gLFxyXG4gIHN0eWxlczogW2Bwe3dpZHRoOjEwMCU7aGVpZ2h0OjE3cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojZTA2YTJmO2Zsb2F0OmxlZnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8vw6XCj8Kqw6bCmMK+w6fCpMK6Zm9ybWdyb3Vww6bCnMKsw6jCusKrw6fCmsKEw6nClMKZw6jCr8Kvw6/CvMKMw6TCuMKNw6bCmMK+w6fCpMK6Z3JvdXDDpMK4wotjb250cm9sw6fCmsKEw6nClMKZw6jCr8KvXHJcbiAgQElucHV0KCkgb25seUdyb3VwID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZXJyb3JQcm9tcHQ7XHJcbiAgQElucHV0KCkgY29udHJvbE5hbWU7XHJcbiAgQElucHV0KCkgZXJyb3JIb29rOiBGdW5jdGlvbjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBlcnJvck1zZzogc3RyaW5nOyAvL8OpwqrCjMOowq/CgcOlwqTCscOowrTCpcOmwpjCvsOnwqTCusOnwprChMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG5cclxuICBwcml2YXRlIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgcHJpdmF0ZSBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IDE7XHJcbiAgcHJpdmF0ZSBkZWxldGUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAQXR0cmlidXRlKCdjb250cm9sTmFtZScpIGNvbnRyb2xOYW1lOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcixcclxuICAgIHByaXZhdGUgZXJyTXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSxcclxuICAgIHByaXZhdGUgZ2xvYmFsVmFsaWRTZXJ2OiBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWZcclxuICApIHtcclxuICAgIGlmIChjb250cm9sTmFtZSkge1xyXG4gICAgICB0aGlzLmNvbnRyb2xOYW1lID0gY29udHJvbE5hbWUucmVwbGFjZSgvJy9nLCAnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIC8vICDDpcKFwrzDpcKuwrluZ0Zyb21cclxuICAgIC8vIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5iaW5kQ29udHJvbEVycm9yTXNnKCk7XHJcbiAgICAvLyB9KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuZGVsZXRlKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kQ29udHJvbEVycm9yTXNnKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG5cclxuICBiaW5kQ29udHJvbEVycm9yTXNnKCkge1xyXG4gICAgdGhpcy5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKCk7XHJcbiAgICBpZiAoIXRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgZmluZCBjb250cm9sTmFtZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgbGV0IHBhdGggPSAnJztcclxuICAgIGNvbnN0IGlzRm9ybUNvbnRyb2wgPVxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKSAmJlxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKSBpbnN0YW5jZW9mIEZvcm1Db250cm9sO1xyXG4gICAgaWYgKCFpc0Zvcm1Db250cm9sKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuZm9ybUNvbnRyb2wucHJpc3RpbmUpIHtcclxuICAgICAgICAvLyAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHRoaXMub25seUdyb3VwKSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpWydlcnJvck1zZyddO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PnRoaXMuZm9ybUNvbnRyb2wsIHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwge1xyXG4gICAgICAgICAgICBtaW5XZWlnaHQ6IE51bWJlci5NQVhfVkFMVUUsXHJcbiAgICAgICAgICAgIGVycm9yTXNnOiAnJ1xyXG4gICAgICAgICAgfSlbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAvLyBpZiAodGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSkge1xyXG4gICAgICAgIC8vICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpWydlcnJvck1zZyddO1xyXG4gICAgICAgIGlmICh0aGlzLmVycm9yTXNnKSB7XHJcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnNjcm9sbFRvKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JIb29rKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgLy9DYWxsZWQgb25jZSwgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXHJcbiAgICAvL0FkZCAnaW1wbGVtZW50cyBPbkRlc3Ryb3knIHRvIHRoZSBjbGFzcy5cclxuICAgIGlmICh0aGlzLmZvcm1Db250cm9sKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnVucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JIb29rKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGVsZXRlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0Rm9ybUNvbnRyb2xNc2dMaXN0ZW5lcihjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aCkge1xyXG4gICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgbGV0IGVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIGNvbnRyb2wuZXJyb3JzKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgZm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWZ3JvdXDDpMK4wovDqcKdwqLDp8KawoTDpsKJwoDDpsKcwonDqcKqwozDqMKvwoHDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRHcm91cENvbnRyb2xWYWxpZE1zZyhjb250cm9sOiBhbnksIHBhdGg6IHN0cmluZywgZXJyb3JJbmZvKSB7XHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sICYmICFjb250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfSBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wgJiYgY29udHJvbC5wcmlzdGluZSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBsZXQgdG1wRXJyb3JJbmZvO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUsIGVycm9ySW5mbyk7XHJcbiAgICAgIGlmICh0bXBFcnJvckluZm8gJiYgdG1wRXJyb3JJbmZvWydtaW5XZWlnaHQnXSA8IGVycm9ySW5mb1snbWluV2VpZ2h0J10pIHtcclxuICAgICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghY29udHJvbC5wcmlzdGluZSkge1xyXG4gICAgICB0bXBFcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRtcEVycm9ySW5mbyAmJiB0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSkge1xyXG4gICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JJbmZvO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcbiAgICBsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG4gICAgd2hpbGUgKFxyXG4gICAgICBwYXJlbnRFbGVtZW50ICYmXHJcbiAgICAgICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpICYmXHJcbiAgICAgICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpICYmXHJcbiAgICAgICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwJylcclxuICAgICkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgcGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScgfHxcclxuICAgICAgICBwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICduZ2Zvcm0nXHJcbiAgICAgICkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHNlYXJjaEVsZW06IEVsZW1lbnQpIHtcclxuICAgIGxldCBwcmV2aW91c1NpYmxpbmc6IEVsZW1lbnQgPSBzZWFyY2hFbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB3aGlsZSAoXHJcbiAgICAgIHByZXZpb3VzU2libGluZyAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJylcclxuICAgICkge1xyXG4gICAgICAvLyBpZihwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiZm9ybUdyb3VwTmFtZVwiKSB8fCBwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiW2Zvcm1Hcm91cF1cIikpe1xyXG4gICAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcImhhdmUgc2VhcmNoIHRvIHJvb3RcIik7XHJcbiAgICAgIC8vIH1cclxuICAgICAgcHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgICBpZiAoIXByZXZpb3VzU2libGluZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQgbXVzdCBoYXZlIGEgZm9ybWNvbnRyb2wgc2liaWxpbmcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKHwqrDpcKKwqjDpsKfwqXDpsKJwr7DpcK9wpPDpcKJwo3DqcKqwozDqMKvwoHDpcKvwrnDpcK6wpTDp8KawoRmb3JtQ29udHJvbE5hbWXDpsKIwpbDqMKAwoVmb3JtR3JvdXBOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRGb3JtQ29udHJvbE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIC8vIMOmwonCi8OlworCqMOowq7CvsOlwq7CmsOkwrrChmNvbnRyb2xOYW1lXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sTmFtZTtcclxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IG9uZSBbZm9ybUNvbnRyb2xdIG5vdCBzdXBwb3J0LCBUaGVyZSBtdXN0IGJlIGEgZm9ybUdyb3VwTmFtZSBvciBbZm9ybUdyb3VwXScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50R3JvdXBFTGVtKCk7XHJcbiAgICAgIGNvbnN0IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFZBTElEX0NPTVBPTkVOVF9OQU1FKS5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBncm91cFZhbGlkQ29udHJvbExlbmd0aDtcclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwRGlyZWN0aXZlICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KbwrTDpsKOwqXDpsKYwq/DpsKgwrnDqMKKwoLDp8KCwrnDpcKvwrnDpcK6wpTDpsKVwrTDpMK4wqpmcm9tIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCJcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpmb3Jtw6jCocKow6XCjcKVw6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZMOvwrzCjMOlwojCmcOkwrvCpcOlwr3Ck8OlwonCjWZvcm1Hcm91cMOlwq/CucOlwrrClMOnwprChMOlwo/CmMOpwofCj8OlwpDCjcOkwrjCumNvbnRyb2xOYW1lXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHNldCBjb250cm9sTmFtZSBieSB5b3Vyc2VsZicpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwTmFtZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpIHx8IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmcm9tR3JvdXBOYW1lJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXAgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gdGhpcy5jb250YWluZXIubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtcHItZm9ybS1jb250cm9sLXZhbGlkIMOlwq/CucOlwrrClMOkwrjCgMOkwrjCqiBmb3JtQ29udHJvbE5hbWVcclxuICAgICAgICAvLyDDpcKQwpHDpcKJwo3DpsKfwqXDpsKJwr7DpcKFwoTDpcK8wp/DqMKKwoLDp8KCwrlcclxuICAgICAgICBjb25zdCBzaWJsaW5nRWxlbSA9IHRoaXMuZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBjb250cm9sTmFtZSA9XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/ClsOlwr3Ck8OlwonCjWZvcm1Db250cm9sw6fCm8K4w6XCr8K5w6TCusKOZm9ybUdyb3Vww6fCmsKEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbFxyXG4gICAqIEBwYXJhbSByb290XHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICBpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuICAgICAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuICAgICAgICByZXR1cm4gY3RybE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuICAgICAgICBpZiAodG1wUGF0aCkge1xyXG4gICAgICAgICAgcGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuICAgICAgICAgIHBhdGgucHVzaCh0bXBQYXRoKTtcclxuICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaXNsaUZvcm1WYWxpZE1zZ10nLFxyXG4gIHByb3ZpZGVyczogW0Zvcm1WYWxpZE1zZ1NlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoJ2lzbGlGb3JtVmFsaWRNc2cnKSBzZXQgdmFsaWRNc2cobXNnKSB7XHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHRoaXMubXNnU2Vydi5yZXNldE1zZyhtc2cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNCTiB7XHJcbiAgaXNibjE6IHN0cmluZztcclxuICBpc2JuMjogc3RyaW5nO1xyXG4gIGlzYm4zOiBzdHJpbmc7XHJcbiAgaXNibjQ6IHN0cmluZztcclxuICBpc2JuNTogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBJU0JOX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNiblZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5WYWxpZHRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuJywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwq3Co8OnwqHCrsOnwprChElTQk7DpcKPwrcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XHJcbiAgICAvLyDDpMK4wo3DqcKqwozDqMKvwoHDqcKdwp7Dp8KpwrpcclxuICAgIGlmICghaXNibi5pc2JuMSB8fCAhaXNibi5pc2JuMiB8fCAhaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCB8fCAhaXNibi5pc2JuNSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcclxuICAgICAgcmV0dXJuIHsgaXNibjogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xyXG4gICAgaWYgKHMgPT09ICc5OTk5OTk5OTk5OTk5Jykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5pc0JhckNvZGUocykpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IGEgPSAwLCBiID0gMCwgYyA9IDAsIGQgPSAwLCBlO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xyXG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XHJcbiAgICAgIGlmIChpIDw9IDEyICYmIGkgJSAyID09PSAwKSB7XHJcbiAgICAgICAgYSArPSBzYztcclxuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XHJcbiAgICAgICAgYiArPSBzYztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYyA9IGEgKiAzO1xyXG4gICAgZCA9IGIgKyBjO1xyXG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xyXG4gICAgICBlID0gZCAtIGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGUgPT09IHBhcnNlSW50KHNbMTJdLCAxMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzQmFyQ29kZShzKTogYm9vbGVhbiB7XHJcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XHJcbiAgICByZXR1cm4gcmVnLmV4ZWMocy5zdWJzdHJpbmcoMCwgMTIpKSAhPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSVNCTiB9IGZyb20gJy4vaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9QQVJUX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblBhcnRWYWxpZERpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21wcklzYm5QYXJ0VmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX1BBUlRfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5QYXJ0MzQnLCAnw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3ClycpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcclxuICAgIGlmICghaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8vIMOpwqrCjMOowq/CgcOnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpdcclxuICAgIGlmIChpc2JuLmlzYm4zLmxlbmd0aCArIGlzYm4uaXNibjQubGVuZ3RoICE9PSA4KSB7XHJcbiAgICAgIHJldHVybiB7IGlzYm5QYXJ0MzQ6IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IElTQk5fSEVBREVSX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNibkhlYWRlclZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9IRUFERVJfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibkhlYWRlcicsICfDp8KswqzDpMK4woDDp8K7woTDpcK/woXDqcKhwrvDpMK4wro5NzjDpsKIwpY5NzknKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCFjLnZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKFsnOTk5JywgJzk3OCcsICc5NzknLCAnMDAwJ10uaW5kZXhPZihjLnZhbHVlKSA8IDApIHtcclxuICAgICAgcmV0dXJuIHsgaXNibkhlYWRlcjogdHJ1ZX07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBGTE9BVF9WQUxJRFRPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXByRmxvYXRPbmx5VmFsaWR0b3JdJyxcclxuICBwcm92aWRlcnM6IFtGTE9BVF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2Zsb2F0JywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwrXCrsOnwoLCucOmwpXCsCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgZmxvYXRWYWwgPSBwYXJzZUZsb2F0KCcnICsgYy52YWx1ZSk7XHJcbiAgICBpZiAoaXNOYU4oZmxvYXRWYWwpKSB7XHJcbiAgICAgIHJldHVybiB7IGZsb2F0OiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2Zvcm1Hcm91cF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNcHJGb3JtR3JvdXBEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gQ2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvciwgaW5pdGlhbGl6aW5nIGlucHV0IHByb3BlcnRpZXMsIGFuZCB0aGUgZmlyc3QgY2FsbCB0byBuZ09uQ2hhbmdlcy5cclxuICAgIC8vIEFkZCAnaW1wbGVtZW50cyBPbkluaXQnIHRvIHRoZSBjbGFzcy5cclxuICAgIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUpIHtcclxuICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdmb3JtLG5nRm9ybSxbbmdGb3JtXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1wckZvcm1EaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gQ2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvciwgaW5pdGlhbGl6aW5nIGlucHV0IHByb3BlcnRpZXMsIGFuZCB0aGUgZmlyc3QgY2FsbCB0byBuZ09uQ2hhbmdlcy5cclxuICAgIC8vIEFkZCAnaW1wbGVtZW50cyBPbkluaXQnIHRvIHRoZSBjbGFzcy5cclxuICAgIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUpIHtcclxuICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IElzYm5WYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLWhlYWRlci12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTXByRm9ybUdyb3VwRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tZ3JvdXAuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTXByRm9ybURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgTXByRm9ybUdyb3VwRGlyZWN0aXZlLFxyXG4gICAgTXByRm9ybURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIE1wckZvcm1Hcm91cERpcmVjdGl2ZSxcclxuICAgIE1wckZvcm1EaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgRm9ybVZhbGlkTXNnU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1vZHVsZSB7IH1cclxuIiwiZXhwb3J0IHsgRm9ybVZhbGlkTW9kdWxlIH0gZnJvbSAnLi9saWIvZm9ybS12YWxpZC5tb2R1bGUnO1xyXG5leHBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcbmV4cG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcbmV4cG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuZXhwb3J0IHsgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCB9IGZyb20gJy4vbGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuZXhwb3J0IHsgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlLCBJU0JOIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuLy9leHBvcnQgeyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiT2JzZXJ2YWJsZSIsImRlYm91bmNlVGltZSIsIkZvcm1Db250cm9sIiwiRm9ybUdyb3VwIiwiRm9ybUdyb3VwRGlyZWN0aXZlIiwiRm9ybUdyb3VwTmFtZSIsIk5nTW9kZWxHcm91cCIsIkNvbXBvbmVudCIsIkF0dHJpYnV0ZSIsIkNvbnRyb2xDb250YWluZXIiLCJPcHRpb25hbCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZCIsIlRlbXBsYXRlUmVmIiwiRGlyZWN0aXZlIiwiTkdfVkFMSURBVE9SUyIsImZvcndhcmRSZWYiLCJSZW5kZXJlcjIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O1FBQUE7UUFFQzs0QkFEbUIsSUFBSSxHQUFHLEVBQWtCO1NBQzVCOzs7Ozs7O1FBT1QsMkNBQVc7Ozs7OztzQkFBQyxNQUFjLEVBQUUsUUFBZ0I7Z0JBQ2xELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztpQkFDcEQ7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7UUFHNUMsc0NBQU07Ozs7c0JBQUMsTUFBYztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWixPQUFPLElBQUksQ0FBQztpQkFDWjtnQkFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztvQ0F2QmpEO1FBeUJDLENB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