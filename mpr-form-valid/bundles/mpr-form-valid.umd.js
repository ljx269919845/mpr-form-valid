(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('mpr-form-valid', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['mpr-form-valid'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

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
                    name_1 = name_1.toLowerCase();
                    tmpMsg = this.validMsg[msgPath + '.' + name_1] || globalValidMsgServ.getMsg(name_1);
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
    var GlobalValidService = (function () {
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
                    if (elemForm.form instanceof forms.FormControl) {
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
                        if (elemForm.form instanceof forms.FormControl) {
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
                    if (formControls[name_1] instanceof forms.FormGroup) {
                        this.validFormGroup(/** @type {?} */ (formControls[name_1]));
                    }
                    if (!formControls[name_1].valid || formControls[name_1]['_reset']) {
                        console.log(formControls[name_1].status, formControls[name_1]);
                        if (formControls[name_1]['_reset']) {
                            formControls[name_1]['_reset'] = false;
                            formControls[name_1].setValue(formControls[name_1].value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true, emitEvent: false });
                        }
                        ((formControls[name_1].statusChanges)).emit(formControls[name_1].status);
                    }
                    if (!formGroup.valid || formGroup['_reset']) {
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
            function () {
            };
        /**
         * @return {?}
         */
        FormControlValidComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                //  兼容ngFrom
                Promise.resolve(null).then(function () {
                    _this.bindControlErrorMsg();
                });
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
                var /** @type {?} */ isFormControl = this.container.control.get(this.controlName)
                    && (this.container.control.get(this.controlName) instanceof forms.FormControl);
                if (!isFormControl) {
                    // from root or from formGroupName
                    this.formControl = this.container.control;
                    path = this.getPath(this.formControl, this.formControl.root, this.controlName);
                    this.formControl.statusChanges.subscribe(function () {
                        if (_this.onlyGroup) {
                            _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors)['errorMsg'];
                        }
                        else {
                            _this.errorMsg = _this.getGroupControlValidMsg(/** @type {?} */ (_this.formControl), path || _this.controlName, { minWeight: Number.MAX_VALUE, errorMsg: '' })['errorMsg'];
                        }
                    });
                }
                else {
                    this.formControl = this.container.control.get(this.controlName);
                    path = this.getPath(this.formControl, this.formControl.root, this.controlName);
                    this.formControl.statusChanges.subscribe(function () {
                        _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors)['errorMsg'];
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
                this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
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
                if (control instanceof forms.FormControl) {
                    return this.errMsgServ.getValidMsg(path, control.errors);
                }
                var /** @type {?} */ tmpErrorInfo;
                for (var /** @type {?} */ name_2 in control.controls) {
                    tmpErrorInfo = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name_2)), path + '.' + name_2, errorInfo);
                    if (tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
                        errorInfo = tmpErrorInfo;
                    }
                }
                tmpErrorInfo = this.errMsgServ.getValidMsg(path, control.errors);
                if (tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
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
                    !parentElement.getAttribute('formgroupname')
                    && !parentElement.getAttribute('formGroupName')
                    && !parentElement.getAttribute('formgroup')) {
                    if (parentElement.nodeName.toLocaleLowerCase() === 'form' || parentElement.nodeName.toLocaleLowerCase() === 'ngform') {
                        break;
                    }
                    parentElement = parentElement.parentElement;
                }
                if (!parentElement) {
                    console.log(this.elemRef.nativeElement);
                    throw new Error("can not find parentElement");
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
                        controlName = siblingElem.getAttribute('formcontrolname') ||
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS1ncm91cC5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0uZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS12YWxpZC5tb2R1bGUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL3B1YmxpY19hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIMOlwoXCqMOlwrHCgMOpwqrCjMOowq/CgcOmwrbCiMOmwoHCr8OvwrzCjCDDpcKtwpjDpcKCwqjDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2Uge1xyXG5cdHByaXZhdGUgdmFsaWRNc2cgPSBuZXcgTWFwPFN0cmluZywgU3RyaW5nPigpO1xyXG5cdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0LyoqXHJcbiAgICogw6jCrsK+w6fCvcKuw6nClMKZw6jCr8Kva2V5w6fCmsKEw6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDDqcKUwpnDqMKvwq9rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUgw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICovXHJcblx0cHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcblx0XHRpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LnRvTG93ZXJDYXNlKCksIG1zZ1ZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRNc2cobXNnS2V5OiBzdHJpbmcpIHtcclxuXHRcdGlmICghbXNnS2V5KSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMudmFsaWRNc2cuZ2V0KG1zZ0tleS50b0xvd2VyQ2FzZSgpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5LnRvTG93ZXJDYXNlKCldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgbGV0IG1pbldlaWdodCA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBsZXQgZXJyb3JNc2cgPSAnJztcclxuICAgIGxldCB0bXBNc2c7XHJcbiAgICBsZXQgdG1wV2VpZ2h0O1xyXG4gICAgbXNnUGF0aCA9IChtc2dQYXRoIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4ge2Vycm9yTXNnLCBtaW5XZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdG1wTXNnID0gdGhpcy52YWxpZE1zZ1ttc2dQYXRoICsgJy4nICsgbmFtZV0gfHwgZ2xvYmFsVmFsaWRNc2dTZXJ2LmdldE1zZyhuYW1lKTtcclxuICAgICAgaWYoIXRtcE1zZyl7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYoTnVtYmVyLmlzTmFOKE51bWJlcihlcnJvcltuYW1lXSkpKXtcclxuICAgICAgICB0bXBXZWlnaHQgPSAxMDAwO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0bXBXZWlnaHQgPSBOdW1iZXIoZXJyb3JbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRtcFdlaWdodCA8IG1pbldlaWdodCl7XHJcbiAgICAgICAgbWluV2VpZ2h0ID0gdG1wV2VpZ2h0O1xyXG4gICAgICAgIGVycm9yTXNnID0gdG1wTXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2Vycm9yTXNnLCBtaW5XZWlnaHR9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0TXNnKG1zZzogT2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ2Zvcm0gdmFsaWQgbXNnIG11c3QgYmUgYSBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIC8vdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lLnRvTG93ZXJDYXNlKCldID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZS50b0xvd2VyQ2FzZSgpLCB0aGlzLnZhbGlkTXNnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRNc2cobXNnOiBPYmplY3QsIHBhdGg6IHN0cmluZywgcmVzdWx0OiBPYmplY3QpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmVzdWx0W3BhdGggKyAnLicgKyBuYW1lLnRvTG93ZXJDYXNlKCldID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUudG9Mb3dlckNhc2UoKSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCwgZXJyb3JIb29rOiBGdW5jdGlvbikge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmxlbmd0aDtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSwgZXJyb3JIb29rczogW10gfSk7XHJcbiAgICB9XHJcbiAgICBpZihlcnJvckhvb2spe1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3MucHVzaChlcnJvckhvb2spO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE51bGwoKSB7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKGVsZW1Gb3JtLmZvcm0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0ucmVzZXQobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogdHJ1ZSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KHt9LCB7IGVtaXRFdmVudDogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoZWxlbUZvcm0uZm9ybSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVsZW1Gb3JtWydzdWInXSkge1xyXG4gICAgICAgIGVsZW1Gb3JtWydzdWInXS51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gdHJ1ZTtcclxuICAgICAgY29uc3Qgc3ViID0gZWxlbUZvcm0uZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgIGVsZW1Gb3JtWydzdWInXS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIGVsZW1Gb3JtWydzdWInXSA9IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgICBlbGVtRm9ybVsnc3ViJ10gPSBzdWI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZEFsbCgpIHtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmICghZWxlbUZvcm0uZm9ybS52YWxpZCB8fCBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgIC8vICBpZiAoZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAvLyAgIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIC8vICB9XHJcbiAgICAgICAgLy8gIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1Gb3JtLmZvcm0uc3RhdHVzLCBlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIGlmIChlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSkge1xyXG4gICAgICAgICAgICBlbGVtRm9ybS5mb3JtWydfcmVzZXQnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbGVtRm9ybS5mb3JtLnNldFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsXHJcbiAgICAgICAgICAgICAgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc3RhdHVzQ2hhbmdlcy5lbWl0KGVsZW1Gb3JtLmZvcm0uc3RhdHVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWVsZW1Gb3JtLmZvcm0udmFsaWQpe1xyXG4gICAgICAgICAgZWxlbUZvcm0uZXJyb3JIb29rcy5mb3JFYWNoKGVycm9ySG9vayA9PiB7XHJcbiAgICAgICAgICAgIGVycm9ySG9vayhlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0sIGVycm9ySG9vazogRnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgICAgaWYoZXJyb3JIb29rKXtcclxuICAgICAgICBjb25zdCBmSW5kZXggPSB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3MuaW5kZXhPZihlcnJvckhvb2spO1xyXG4gICAgICAgIGlmKGZJbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmVycm9ySG9va3Muc3BsaWNlKGZJbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHNbbmFtZV0udmFsaWQgfHwgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1Db250cm9sc1tuYW1lXS5zdGF0dXMsIGZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRWYWx1ZShmb3JtQ29udHJvbHNbbmFtZV0udmFsdWUsXHJcbiAgICAgICAgICAgIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZvcm1Hcm91cC52YWxpZCB8fCBmb3JtR3JvdXBbJ19yZXNldCddKSB7XHJcbiAgICAgICAgaWYgKGZvcm1Hcm91cFsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgIGZvcm1Hcm91cFsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICAgIGZvcm1Hcm91cC5zZXRWYWx1ZShmb3JtR3JvdXAudmFsdWUsXHJcbiAgICAgICAgICAgIHsgb25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIChmb3JtR3JvdXAuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRHcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIElucHV0LCBJbmplY3QsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgQXR0cmlidXRlLCBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xDb250YWluZXIsIEFic3RyYWN0Q29udHJvbCwgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG4gIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1Hcm91cE5hbWUsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdNb2RlbEdyb3VwXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcblxyXG5jb25zdCBWQUxJRF9DT01QT05FTlRfTkFNRSA9ICdtcHItZm9ybS1jb250cm9sLXZhbGlkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBWQUxJRF9DT01QT05FTlRfTkFNRSxcclxuICB0ZW1wbGF0ZTogYDxzcGFuXHJcbiAgICBjbGFzcz1cImVycm9yXCJcclxuICAgIFtuZ0NsYXNzXT1cImVycm9yUHJvbXB0XCJcclxuICAgIFtoaWRkZW5dPVwiIWVycm9yTXNnXCJcclxuPlxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXHJcbiAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICA8cCAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7ZXJyb3JNc2d9fTwvcD5cclxuPC9zcGFuPlxyXG5gLFxyXG4gIHN0eWxlczogW2Bwe3dpZHRoOjEwMCU7aGVpZ2h0OjE3cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojZTA2YTJmO2Zsb2F0OmxlZnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAvL8Olwo/CqsOmwpjCvsOnwqTCumZvcm1ncm91cMOmwpzCrMOowrrCq8OnwprChMOpwpTCmcOowq/Cr8OvwrzCjMOkwrjCjcOmwpjCvsOnwqTCumdyb3Vww6TCuMKLY29udHJvbMOnwprChMOpwpTCmcOowq/Cr1xyXG4gIEBJbnB1dCgpIG9ubHlHcm91cCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVycm9yUHJvbXB0O1xyXG4gIEBJbnB1dCgpIGNvbnRyb2xOYW1lO1xyXG4gIEBJbnB1dCgpIGVycm9ySG9vazogRnVuY3Rpb247XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwdWJsaWMgZXJyb3JNc2c6IHN0cmluZzsgLy/DqcKqwozDqMKvwoHDpcKkwrHDqMK0wqXDpsKYwr7Dp8KkwrrDp8KawoTDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuXHJcbiAgcHJpdmF0ZSBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xyXG4gIHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gIMOlwoXCvMOlwq7CuW5nRnJvbVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuICAgIHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBjb25zdCBpc0Zvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSlcclxuICAgICAgJiYgKHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpO1xyXG4gICAgaWYgKCFpc0Zvcm1Db250cm9sKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25seUdyb3VwKSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpWydlcnJvck1zZyddO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PnRoaXMuZm9ybUNvbnRyb2wsIHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSxcclxuICAgICAgICAgICAge21pbldlaWdodDogTnVtYmVyLk1BWF9WQUxVRSwgZXJyb3JNc2c6ICcnfSlbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpWydlcnJvck1zZyddO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoKXtcclxuICAgIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKT0+e1xyXG4gICAgICBsZXQgZXJyb3JJbmZvID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgY29udHJvbC5lcnJvcnMpXHJcbiAgICB9KTtcclxuICAgIGlmKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtR3JvdXApe1xyXG4gICAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpe1xyXG4gICAgICAgIHRoaXMuc2V0Rm9ybUNvbnRyb2xNc2dMaXN0ZW5lcig8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/Clmdyb3Vww6TCuMKLw6nCncKiw6fCmsKEw6bCicKAw6bCnMKJw6nCqsKMw6jCr8KBw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIGNvbnRyb2xcclxuICAgKiBAcGFyYW0gcGF0aFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGg6IHN0cmluZywgZXJyb3JJbmZvKSB7XHJcblxyXG4gICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICAgIH1cclxuICAgIGxldCB0bXBFcnJvckluZm87XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgdG1wRXJyb3JJbmZvID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSwgZXJyb3JJbmZvKTtcclxuICAgICAgaWYodG1wRXJyb3JJbmZvWydtaW5XZWlnaHQnXSA8IGVycm9ySW5mb1snbWluV2VpZ2h0J10pe1xyXG4gICAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG1wRXJyb3JJbmZvID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICAgIGlmKHRtcEVycm9ySW5mb1snbWluV2VpZ2h0J10gPCBlcnJvckluZm9bJ21pbldlaWdodCddKXtcclxuICAgICAgZXJyb3JJbmZvID0gdG1wRXJyb3JJbmZvO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVycm9ySW5mbztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyZW50R3JvdXBFTGVtKCk6IEVsZW1lbnQge1xyXG4gICAgbGV0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgLy8gY29uc3QgYXJydHJpYnV0ZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcygpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpKTtcclxuICAgIHdoaWxlIChcclxuICAgICAgcGFyZW50RWxlbWVudCAmJlxyXG4gICAgICAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1Hcm91cE5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cCcpKSB7XHJcbiAgICAgIGlmKHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ2Zvcm0nIHx8IHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ25nZm9ybScpe1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGZpbmQgcGFyZW50RWxlbWVudFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIHdoaWxlIChwcmV2aW91c1NpYmxpbmcgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XHJcbiAgICAgIC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIH1cclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowofCqsOlworCqMOmwp/CpcOmwonCvsOlwr3Ck8OlwonCjcOpwqrCjMOowq/CgcOlwq/CucOlwrrClMOnwprChGZvcm1Db250cm9sTmFtZcOmwojClsOowoDChWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgLy8gw6bCicKLw6XCisKow6jCrsK+w6XCrsKaw6TCusKGY29udHJvbE5hbWVcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xOYW1lO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuICAgICAgY29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuICAgICAgdGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwpvCtMOmwo7CpcOmwpjCr8OmwqDCucOoworCgsOnwoLCucOlwq/CucOlwrrClMOmwpXCtMOkwrjCqmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmZvcm3DqMKhwqjDpcKNwpXDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkw6/CvMKMw6XCiMKZw6TCu8Klw6XCvcKTw6XCicKNZm9ybUdyb3Vww6XCr8K5w6XCusKUw6fCmsKEw6XCj8KYw6nCh8KPw6XCkMKNw6TCuMK6Y29udHJvbE5hbWVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgfHwgcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zyb21Hcm91cE5hbWUnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSB0aGlzLmNvbnRhaW5lci5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1wci1mb3JtLWNvbnRyb2wtdmFsaWQgw6XCr8K5w6XCusKUw6TCuMKAw6TCuMKqIGZvcm1Db250cm9sTmFtZVxyXG4gICAgICAgIC8vIMOlwpDCkcOlwonCjcOmwp/CpcOmwonCvsOlwoXChMOlwrzCn8OoworCgsOnwoLCuVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmdFbGVtID0gdGhpcy5nZXRTbGliaW5nRm9ybUNvbnRybEVsZW0odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGlmKHRoaXMuY29udHJvbE5hbWUgJiYgdGhpcy5jb250cm9sTmFtZSAhPSBjb250cm9sTmFtZSl7XHJcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihgeW91IG1heSBzZXQgYSBlcnJvciBjb250cm9sTmFtZSwgeW91IHNldCBpczogJHt0aGlzLmNvbnRyb2xOYW1lfSwgYnV0IG5lZWQgaXM6ICR7Y29udHJvbE5hbWV9YCk7XHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpbDpcK9wpPDpcKJwo1mb3JtQ29udHJvbMOnwpvCuMOlwq/CucOkwrrCjmZvcm1Hcm91cMOnwprChHBhdGhcclxuICAgKiBAcGFyYW0gZm9ybUNvbnRyb2xcclxuICAgKiBAcGFyYW0gcm9vdFxyXG4gICAqIEBwYXJhbSBjb250cm9sTmFtZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UGF0aChmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sLCByb290LCBjb250cm9sTmFtZSkge1xyXG4gICAgaWYgKCEocm9vdCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgaWYgKGZvcm1Db250cm9sID09PSByb290KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGggPSBbXTtcclxuICAgIGZvciAoY29uc3QgY3RybE5hbWUgaW4gcm9vdFsnY29udHJvbHMnXSkge1xyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gPT09IGZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgcmV0dXJuIGN0cmxOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHRtcFBhdGggPSB0aGlzLmdldFBhdGgoZm9ybUNvbnRyb2wsIHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdLCBjb250cm9sTmFtZSk7XHJcbiAgICAgICAgaWYgKHRtcFBhdGgpIHtcclxuICAgICAgICAgIHBhdGgucHVzaChjdHJsTmFtZSk7XHJcbiAgICAgICAgICBwYXRoLnB1c2godG1wUGF0aCk7XHJcbiAgICAgICAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lzbGlGb3JtVmFsaWRNc2ddJyxcclxuICBwcm92aWRlcnM6IFtGb3JtVmFsaWRNc2dTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCdpc2xpRm9ybVZhbGlkTXNnJykgc2V0IHZhbGlkTXNnKG1zZykge1xyXG4gICAgaWYgKG1zZykge1xyXG4gICAgICB0aGlzLm1zZ1NlcnYucmVzZXRNc2cobXNnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTQk4ge1xyXG4gIGlzYm4xOiBzdHJpbmc7XHJcbiAgaXNibjI6IHN0cmluZztcclxuICBpc2JuMzogc3RyaW5nO1xyXG4gIGlzYm40OiBzdHJpbmc7XHJcbiAgaXNibjU6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgSVNCTl9WQUxJRFRPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5WYWxpZHRvckRpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21wcklzYm5WYWxpZF0nLFxyXG4gIHByb3ZpZGVyczogW0lTQk5fVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibicsICfDqMKvwrfDqMK+wpPDpcKFwqXDpsKtwqPDp8Khwq7Dp8KawoRJU0JOw6XCj8K3Jyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xyXG4gICAgLy8gw6TCuMKNw6nCqsKMw6jCr8KBw6nCncKew6fCqcK6XHJcbiAgICBpZiAoIWlzYm4uaXNibjEgfHwgIWlzYm4uaXNibjIgfHwgIWlzYm4uaXNibjMgfHwgIWlzYm4uaXNibjQgfHwgIWlzYm4uaXNibjUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRJU0JOQ29kZShbaXNibi5pc2JuMSwgaXNibi5pc2JuMiwgaXNibi5pc2JuMywgaXNibi5pc2JuNCwgaXNibi5pc2JuNV0uam9pbignJykpKSB7XHJcbiAgICAgIHJldHVybiB7IGlzYm46IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZElTQk5Db2RlKHMpIHtcclxuICAgIGlmIChzID09PSAnOTk5OTk5OTk5OTk5OScpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuaXNCYXJDb2RlKHMpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGxldCBhID0gMCwgYiA9IDAsIGMgPSAwLCBkID0gMCwgZTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpKyspIHtcclxuICAgICAgY29uc3Qgc2MgPSBwYXJzZUludChzW2kgLSAxXSwgMTApO1xyXG4gICAgICBpZiAoaSA8PSAxMiAmJiBpICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGEgKz0gc2M7XHJcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAxMSAmJiBpICUgMiA9PT0gMSkge1xyXG4gICAgICAgIGIgKz0gc2M7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGMgPSBhICogMztcclxuICAgIGQgPSBiICsgYztcclxuICAgIGlmIChkICUgMTAgPT09IDApIHtcclxuICAgICAgZSA9IGQgLSBkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZSA9IGQgKyAoMTAgLSBkICUgMTApIC0gZDtcclxuICAgIH1cclxuICAgIHJldHVybiBlID09PSBwYXJzZUludChzWzEyXSwgMTApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0JhckNvZGUocyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHMubGVuZ3RoICE9PSAxMykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKC9eWzAtOV17MTJ9JC8pO1xyXG4gICAgcmV0dXJuIHJlZy5leGVjKHMuc3Vic3RyaW5nKDAsIDEyKSkgIT0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IElTQk4gfSBmcm9tICcuL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IElTQk5fUEFSVF9WQUxJRFRPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuUGFydFZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9QQVJUX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuUGFydDM0JywgJ8OnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XHJcbiAgICBpZiAoIWlzYm4uaXNibjMgfHwgIWlzYm4uaXNibjQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvLyDDqcKqwozDqMKvwoHDp8KswqzDpMK4wonDp8K7woTDpcKSwozDp8KswqzDpcKbwpvDp8K7woTDpMK4woDDpcKFwrHDpMK4wro4w6TCvcKNw6bClcKww6XCrcKXXHJcbiAgICBpZiAoaXNibi5pc2JuMy5sZW5ndGggKyBpc2JuLmlzYm40Lmxlbmd0aCAhPT0gOCkge1xyXG4gICAgICByZXR1cm4geyBpc2JuUGFydDM0OiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBJU0JOX0hFQURFUl9WQUxJRFRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21wcklzYm5IZWFkZXJWYWxpZF0nLFxyXG4gIHByb3ZpZGVyczogW0lTQk5fSEVBREVSX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5IZWFkZXInLCAnw6fCrMKsw6TCuMKAw6fCu8KEw6XCv8KFw6nCocK7w6TCuMK6OTc4w6bCiMKWOTc5Jyk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGlmICghYy52YWx1ZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChbJzk5OScsICc5NzgnLCAnOTc5JywgJzAwMCddLmluZGV4T2YoYy52YWx1ZSkgPCAwKSB7XHJcbiAgICAgIHJldHVybiB7IGlzYm5IZWFkZXI6IHRydWV9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgRkxPQVRfVkFMSURUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21wckZsb2F0T25seVZhbGlkdG9yXScsXHJcbiAgcHJvdmlkZXJzOiBbRkxPQVRfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdmbG9hdCcsICfDqMKvwrfDqMK+wpPDpcKFwqXDpsK1wq7Dp8KCwrnDpsKVwrAnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGNvbnN0IGZsb2F0VmFsID0gcGFyc2VGbG9hdCgnJyArIGMudmFsdWUpO1xyXG4gICAgaWYgKGlzTmFOKGZsb2F0VmFsKSkge1xyXG4gICAgICByZXR1cm4geyBmbG9hdDogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tmb3JtR3JvdXBdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXByRm9ybUdyb3VwRGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIENhbGxlZCBhZnRlciB0aGUgY29uc3RydWN0b3IsIGluaXRpYWxpemluZyBpbnB1dCBwcm9wZXJ0aWVzLCBhbmQgdGhlIGZpcnN0IGNhbGwgdG8gbmdPbkNoYW5nZXMuXHJcbiAgICAvLyBBZGQgJ2ltcGxlbWVudHMgT25Jbml0JyB0byB0aGUgY2xhc3MuXHJcbiAgICBpZiAodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgJ2Zvcm1ncm91cCcsICdmb3JtZ3JvdXAnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aGlzLnJlbmRlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCwgJ2Zvcm1ncm91cCcsICdmb3JtZ3JvdXAnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZm9ybSxuZ0Zvcm0sW25nRm9ybV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNcHJGb3JtRGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIENhbGxlZCBhZnRlciB0aGUgY29uc3RydWN0b3IsIGluaXRpYWxpemluZyBpbnB1dCBwcm9wZXJ0aWVzLCBhbmQgdGhlIGZpcnN0IGNhbGwgdG8gbmdPbkNoYW5nZXMuXHJcbiAgICAvLyBBZGQgJ2ltcGxlbWVudHMgT25Jbml0JyB0byB0aGUgY2xhc3MuXHJcbiAgICBpZiAodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgJ2Zvcm1ncm91cCcsICdmb3JtZ3JvdXAnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aGlzLnJlbmRlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCwgJ2Zvcm1ncm91cCcsICdmb3JtZ3JvdXAnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1wckZvcm1Hcm91cERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtLWdyb3VwLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1wckZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIE1wckZvcm1Hcm91cERpcmVjdGl2ZSxcclxuICAgIE1wckZvcm1EaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBNcHJGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgICBNcHJGb3JtRGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIEZvcm1WYWxpZE1zZ1NlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNb2R1bGUgeyB9XHJcbiIsImV4cG9ydCB7IEZvcm1WYWxpZE1vZHVsZSB9IGZyb20gJy4vbGliL2Zvcm0tdmFsaWQubW9kdWxlJztcclxuZXhwb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmV4cG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2xpYi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IElzYm5WYWxpZHRvckRpcmVjdGl2ZSwgSVNCTiB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbi8vZXhwb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkZvcm1Db250cm9sIiwiRm9ybUdyb3VwIiwiRm9ybUdyb3VwRGlyZWN0aXZlIiwiRm9ybUdyb3VwTmFtZSIsIk5nTW9kZWxHcm91cCIsIkNvbXBvbmVudCIsIkF0dHJpYnV0ZSIsIkNvbnRyb2xDb250YWluZXIiLCJPcHRpb25hbCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZCIsIlRlbXBsYXRlUmVmIiwiRGlyZWN0aXZlIiwiTkdfVkFMSURBVE9SUyIsImZvcndhcmRSZWYiLCJSZW5kZXJlcjIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBOztRQUFBO1FBRUM7NEJBRG1CLElBQUksR0FBRyxFQUFrQjtTQUM1Qjs7Ozs7OztRQU9ULDJDQUFXOzs7Ozs7c0JBQUMsTUFBYyxFQUFFLFFBQWdCO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7aUJBQ3BEO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7O1FBRzVDLHNDQUFNOzs7O3NCQUFDLE1BQWM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1osT0FBTyxJQUFJLENBQUM7aUJBQ1o7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7b0NBdkJqRDtRQXlCQyxDQUFBO3lCQUVZLGtCQUFrQixHQUFHLElBQUkscUJBQXFCLEVBQUU7Ozs7OztBQzNCN0Q7UUFRRTs0QkFEbUIsRUFBRTtTQUNKOzs7Ozs7UUFFVix5Q0FBVzs7Ozs7c0JBQUMsTUFBYyxFQUFFLFFBQWdCO2dCQUNqRCxJQUFJ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