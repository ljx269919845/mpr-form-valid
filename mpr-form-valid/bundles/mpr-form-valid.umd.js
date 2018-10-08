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
                this.validMsg.set(msgKey, msgValue);
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
                return this.validMsg.get(msgKey);
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
                this.validMsg[msgKey] = msgValue;
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
                if (!error || !msgPath) {
                    return { errorMsg: errorMsg, minWeight: minWeight };
                }
                for (var /** @type {?} */ name_1 in error) {
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
                        this.validMsg[name_2] = msg[name_2];
                    }
                    else {
                        this.formatMsg(msg[name_2], name_2, this.validMsg);
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
                        result[path + '.' + name_3] = msg[name_3];
                    }
                    else {
                        this.formatMsg(msg[name_3], path + '.' + name_3, result);
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
                    if (elemForm.form instanceof forms.FormControl) {
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
                        if (elemForm.form instanceof forms.FormControl) {
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
                    if (formControls[name_1] instanceof forms.FormGroup) {
                        this.validFormGroup(/** @type {?} */ (formControls[name_1]));
                    }
                    if (!formControls[name_1].valid || formControls[name_1]['_reset']) {
                        formControls[name_1]['_reset'] = false;
                        console.log(formControls[name_1].status, formControls[name_1]);
                        ((formControls[name_1].statusChanges)).emit(formControls[name_1].status);
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
                this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl);
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
                this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl);
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
                            MprFormGroupDirective
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
                            MprFormGroupDirective
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
    exports.ɵa = GlobalValidMsgService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS1ncm91cC5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9mb3JtLXZhbGlkLm1vZHVsZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvcHVibGljX2FwaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogw6XChcKow6XCscKAw6nCqsKMw6jCr8KBw6bCtsKIw6bCgcKvw6/CvMKMIMOlwq3CmMOlwoLCqMOpwrvCmMOowq7CpMOmwrbCiMOmwoHCr1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSBuZXcgTWFwPFN0cmluZywgU3RyaW5nPigpO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowq7CvsOnwr3CrsOpwpTCmcOowq/Cr2tlecOnwprChMOpwrvCmMOowq7CpMOmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBtc2dLZXkgw6nClMKZw6jCr8Kva2V5XHJcbiAgICogQHBhcmFtIG1zZ1ZhbHVlIMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZWdpc3Rlck1zZyhtc2dLZXk6IHN0cmluZywgbXNnVmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dLZXkgfHwgIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXNnIGtleSBhbmQgdmFsdWUgbXVzdCBub3QgZW1wdHknKTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2cuc2V0KG1zZ0tleSwgbXNnVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1zZyhtc2dLZXk6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dLZXkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZE1zZy5nZXQobXNnS2V5KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2xvYmFsVmFsaWRNc2dTZXJ2ID0gbmV3IEdsb2JhbFZhbGlkTXNnU2VydmljZSgpO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IHt9O1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHB1YmxpYyBzZXRWYWxpZE1zZyhtc2dLZXk6IHN0cmluZywgbXNnVmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dWYWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnW21zZ0tleV0gPSBtc2dWYWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWYWxpZE1zZyhtc2dQYXRoOiBzdHJpbmcsIGVycm9yKSB7XHJcbiAgICBsZXQgbWluV2VpZ2h0ID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIGxldCBlcnJvck1zZyA9ICcnO1xyXG4gICAgbGV0IHRtcE1zZztcclxuICAgIGxldCB0bXBXZWlnaHQ7XHJcblxyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4ge2Vycm9yTXNnLCBtaW5XZWlnaHR9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgdG1wTXNnID0gdGhpcy52YWxpZE1zZ1ttc2dQYXRoICsgJy4nICsgbmFtZV0gfHwgZ2xvYmFsVmFsaWRNc2dTZXJ2LmdldE1zZyhuYW1lKTtcclxuICAgICAgaWYoIXRtcE1zZyl7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYoTnVtYmVyLmlzTmFOKE51bWJlcihlcnJvcltuYW1lXSkpKXtcclxuICAgICAgICB0bXBXZWlnaHQgPSAxMDAwO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0bXBXZWlnaHQgPSBOdW1iZXIoZXJyb3JbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRtcFdlaWdodCA8IG1pbldlaWdodCl7XHJcbiAgICAgICAgbWluV2VpZ2h0ID0gdG1wV2VpZ2h0O1xyXG4gICAgICAgIGVycm9yTXNnID0gdG1wTXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2Vycm9yTXNnLCBtaW5XZWlnaHR9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0TXNnKG1zZzogT2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ2Zvcm0gdmFsaWQgbXNnIG11c3QgYmUgYSBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIC8vdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIG5hbWUsIHRoaXMudmFsaWRNc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdE1zZyhtc2c6IE9iamVjdCwgcGF0aDogc3RyaW5nLCByZXN1bHQ6IE9iamVjdCkge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXN1bHRbcGF0aCArICcuJyArIG5hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1zOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlclZhbGlkRm9ybShmb3JtOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleCgoZWxlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5wdXNoKHsgZm9ybTogZm9ybSwgY291bnQ6IDEgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXROdWxsKCkge1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goKGVsZW1Gb3JtKSA9PiB7XHJcbiAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnJlc2V0KG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbUZvcm0uZm9ybS5yZXNldCh7fSwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgICBlbGVtRm9ybS5mb3JtLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdyb3VwKGVsZW1Gb3JtLmZvcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaCgoZWxlbUZvcm0pID0+IHtcclxuICAgICAgaWYgKCFlbGVtRm9ybS5mb3JtLnZhbGlkIHx8IGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddKSB7XHJcbiAgICAgIC8vICBpZiAoZWxlbUZvcm0uZm9ybVsnX3Jlc2V0J10pIHtcclxuICAgICAgICAgIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAvLyAgfVxyXG4gICAgICAgIGVsZW1Gb3JtLmZvcm1bJ19yZXNldCddID0gZmFsc2U7XHJcbiAgICAgICAgLy8gIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChlbGVtRm9ybS5mb3JtIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1Gb3JtLmZvcm0uc3RhdHVzLCBlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICAgIGVsZW1Gb3JtLmZvcm0uc3RhdHVzQ2hhbmdlcy5lbWl0KGVsZW1Gb3JtLmZvcm0uc3RhdHVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cChlbGVtRm9ybS5mb3JtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzdWx0ID0gZWxlbUZvcm0uZm9ybS52YWxpZCAmJiByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5yZWdpc3RlclZhbGlkRm9ybShmb3JtKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsaWRGb3Jtcy5maW5kSW5kZXgoKGVsZW0pID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uZm9ybSA9PSBmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50ID4gMSkge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50IC09IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmb3JtQ29udHJvbHNbbmFtZV0udmFsaWQgfHwgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSkge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXVsnX3Jlc2V0J10gPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzLCBmb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICAgIChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChmb3JtQ29udHJvbHNbbmFtZV0uc3RhdHVzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRHcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gICAgICBpZiAoIWZvcm1Db250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0uc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnJlc2V0R3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9ybUNvbnRyb2xzW25hbWVdWydfcmVzZXQnXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIElucHV0LCBJbmplY3QsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgQXR0cmlidXRlLCBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xDb250YWluZXIsIEFic3RyYWN0Q29udHJvbCwgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG4gIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1Hcm91cE5hbWUsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdNb2RlbEdyb3VwXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcblxyXG5jb25zdCBWQUxJRF9DT01QT05FTlRfTkFNRSA9ICdtcHItZm9ybS1jb250cm9sLXZhbGlkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBWQUxJRF9DT01QT05FTlRfTkFNRSxcclxuICB0ZW1wbGF0ZTogYDxzcGFuXHJcbiAgICBjbGFzcz1cImVycm9yXCJcclxuICAgIFtuZ0NsYXNzXT1cImVycm9yUHJvbXB0XCJcclxuICAgIFtoaWRkZW5dPVwiIWVycm9yTXNnXCJcclxuPlxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXHJcbiAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICA8cCAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7ZXJyb3JNc2d9fTwvcD5cclxuPC9zcGFuPlxyXG5gLFxyXG4gIHN0eWxlczogW2Bwe3dpZHRoOjEwMCU7aGVpZ2h0OjE3cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojZTA2YTJmO2Zsb2F0OmxlZnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAvL8Olwo/CqsOmwpjCvsOnwqTCumZvcm1ncm91cMOmwpzCrMOowrrCq8OnwprChMOpwpTCmcOowq/Cr8OvwrzCjMOkwrjCjcOmwpjCvsOnwqTCumdyb3Vww6TCuMKLY29udHJvbMOnwprChMOpwpTCmcOowq/Cr1xyXG4gIEBJbnB1dCgpIG9ubHlHcm91cCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVycm9yUHJvbXB0O1xyXG4gIEBJbnB1dCgpIGNvbnRyb2xOYW1lO1xyXG5cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8vw6nCqsKMw6jCr8KBw6XCpMKxw6jCtMKlw6bCmMK+w6fCpMK6w6fCmsKEw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcblxyXG4gIHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICBwcml2YXRlIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gMTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAQXR0cmlidXRlKCdjb250cm9sTmFtZScpIGNvbnRyb2xOYW1lOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcixcclxuICAgIHByaXZhdGUgZXJyTXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSxcclxuICAgIHByaXZhdGUgZ2xvYmFsVmFsaWRTZXJ2OiBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWYpIHtcclxuICAgIGlmIChjb250cm9sTmFtZSkge1xyXG4gICAgICB0aGlzLmNvbnRyb2xOYW1lID0gY29udHJvbE5hbWUucmVwbGFjZSgvJy9nLCAnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vICDDpcKFwrzDpcKuwrluZ0Zyb21cclxuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5iaW5kQ29udHJvbEVycm9yTXNnKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJpbmRDb250cm9sRXJyb3JNc2coKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoKTtcclxuICAgIGlmICghdGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBmaW5kIGNvbnRyb2xOYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgY29uc3QgaXNGb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpXHJcbiAgICAgICYmICh0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKTtcclxuICAgIGlmICghaXNGb3JtQ29udHJvbCkge1xyXG4gICAgICAvLyBmcm9tIHJvb3Qgb3IgZnJvbSBmb3JtR3JvdXBOYW1lXHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9ubHlHcm91cCkge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKVsnZXJyb3JNc2cnXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT50aGlzLmZvcm1Db250cm9sLCBwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsXHJcbiAgICAgICAgICAgIHttaW5XZWlnaHQ6IE51bWJlci5NQVhfVkFMVUUsIGVycm9yTXNnOiAnJ30pWydlcnJvck1zZyddO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKVsnZXJyb3JNc2cnXTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEZvcm1Db250cm9sTXNnTGlzdGVuZXIoY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGgpe1xyXG4gICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpPT57XHJcbiAgICAgIGxldCBlcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCBjb250cm9sLmVycm9ycylcclxuICAgIH0pO1xyXG4gICAgaWYoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cCl7XHJcbiAgICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scyl7XHJcbiAgICAgICAgdGhpcy5zZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWZ3JvdXDDpMK4wovDqcKdwqLDp8KawoTDpsKJwoDDpsKcwonDqcKqwozDqMKvwoHDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRHcm91cENvbnRyb2xWYWxpZE1zZyhjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aDogc3RyaW5nLCBlcnJvckluZm8pIHtcclxuXHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHRtcEVycm9ySW5mbztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scykge1xyXG4gICAgICB0bXBFcnJvckluZm8gPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lLCBlcnJvckluZm8pO1xyXG4gICAgICBpZih0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSl7XHJcbiAgICAgICAgZXJyb3JJbmZvID0gdG1wRXJyb3JJbmZvO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0bXBFcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgaWYodG1wRXJyb3JJbmZvWydtaW5XZWlnaHQnXSA8IGVycm9ySW5mb1snbWluV2VpZ2h0J10pe1xyXG4gICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JJbmZvO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcbiAgICBsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG4gICAgd2hpbGUgKFxyXG4gICAgICBwYXJlbnRFbGVtZW50ICYmXHJcbiAgICAgICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwJykpIHtcclxuICAgICAgaWYocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScgfHwgcGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnbmdmb3JtJyl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNsaWJpbmdGb3JtQ29udHJsRWxlbShzZWFyY2hFbGVtOiBFbGVtZW50KSB7XHJcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nOiBFbGVtZW50ID0gc2VhcmNoRWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgd2hpbGUgKHByZXZpb3VzU2libGluZyAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcclxuICAgICAgLy8gaWYocHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcImZvcm1Hcm91cE5hbWVcIikgfHwgcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcIltmb3JtR3JvdXBdXCIpKXtcclxuICAgICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJoYXZlIHNlYXJjaCB0byByb290XCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtcHItZm9ybS1jb250cm9sLXZhbGlkIG11c3QgaGF2ZSBhIGZvcm1jb250cm9sIHNpYmlsaW5nJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCh8Kqw6XCisKow6bCn8Klw6bCicK+w6XCvcKTw6XCicKNw6nCqsKMw6jCr8KBw6XCr8K5w6XCusKUw6fCmsKEZm9ybUNvbnRyb2xOYW1lw6bCiMKWw6jCgMKFZm9ybUdyb3VwTmFtZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybUNvbnRyb2xOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICAvLyDDpsKJwovDpcKKwqjDqMKuwr7DpcKuwprDpMK6woZjb250cm9sTmFtZVxyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbE5hbWU7XHJcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25seSBvbmUgW2Zvcm1Db250cm9sXSBub3Qgc3VwcG9ydCwgVGhlcmUgbXVzdCBiZSBhIGZvcm1Hcm91cE5hbWUgb3IgW2Zvcm1Hcm91cF0nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldFBhcmVudEdyb3VwRUxlbSgpO1xyXG4gICAgICBjb25zdCBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChWQUxJRF9DT01QT05FTlRfTkFNRSkubGVuZ3RoO1xyXG4gICAgICB0aGlzLmdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGg7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cERpcmVjdGl2ZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCm8K0w6bCjsKlw6bCmMKvw6bCoMK5w6jCisKCw6fCgsK5w6XCr8K5w6XCusKUw6bClcK0w6TCuMKqZnJvbSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZm9ybcOowqHCqMOlwo3ClcOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWTDr8K8wozDpcKIwpnDpMK7wqXDpcK9wpPDpcKJwo1mb3JtR3JvdXDDpcKvwrnDpcK6wpTDp8KawoTDpcKPwpjDqcKHwo/DpcKQwo3DpMK4wrpjb250cm9sTmFtZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IHNob3VsZCBzZXQgY29udHJvbE5hbWUgYnkgeW91cnNlbGYnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cE5hbWUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKSB8fCBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZnJvbUdyb3VwTmFtZScpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgTmdNb2RlbEdyb3VwICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHRoaXMuY29udGFpbmVyLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbXByLWZvcm0tY29udHJvbC12YWxpZCDDpcKvwrnDpcK6wpTDpMK4woDDpMK4wqogZm9ybUNvbnRyb2xOYW1lXHJcbiAgICAgICAgLy8gw6XCkMKRw6XCicKNw6bCn8Klw6bCicK+w6XChcKEw6XCvMKfw6jCisKCw6fCgsK5XHJcbiAgICAgICAgY29uc3Qgc2libGluZ0VsZW0gPSB0aGlzLmdldFNsaWJpbmdGb3JtQ29udHJsRWxlbSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/ClsOlwr3Ck8OlwonCjWZvcm1Db250cm9sw6fCm8K4w6XCr8K5w6TCusKOZm9ybUdyb3Vww6fCmsKEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbFxyXG4gICAqIEBwYXJhbSByb290XHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICBpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuICAgICAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuICAgICAgICByZXR1cm4gY3RybE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuICAgICAgICBpZiAodG1wUGF0aCkge1xyXG4gICAgICAgICAgcGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuICAgICAgICAgIHBhdGgucHVzaCh0bXBQYXRoKTtcclxuICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaXNsaUZvcm1WYWxpZE1zZ10nLFxyXG4gIHByb3ZpZGVyczogW0Zvcm1WYWxpZE1zZ1NlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoJ2lzbGlGb3JtVmFsaWRNc2cnKSBzZXQgdmFsaWRNc2cobXNnKSB7XHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHRoaXMubXNnU2Vydi5yZXNldE1zZyhtc2cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNCTiB7XHJcbiAgaXNibjE6IHN0cmluZztcclxuICBpc2JuMjogc3RyaW5nO1xyXG4gIGlzYm4zOiBzdHJpbmc7XHJcbiAgaXNibjQ6IHN0cmluZztcclxuICBpc2JuNTogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBJU0JOX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNiblZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5WYWxpZHRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuJywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwq3Co8OnwqHCrsOnwprChElTQk7DpcKPwrcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XHJcbiAgICAvLyDDpMK4wo3DqcKqwozDqMKvwoHDqcKdwp7Dp8KpwrpcclxuICAgIGlmICghaXNibi5pc2JuMSB8fCAhaXNibi5pc2JuMiB8fCAhaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCB8fCAhaXNibi5pc2JuNSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcclxuICAgICAgcmV0dXJuIHsgaXNibjogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xyXG4gICAgaWYgKHMgPT09ICc5OTk5OTk5OTk5OTk5Jykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5pc0JhckNvZGUocykpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IGEgPSAwLCBiID0gMCwgYyA9IDAsIGQgPSAwLCBlO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xyXG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XHJcbiAgICAgIGlmIChpIDw9IDEyICYmIGkgJSAyID09PSAwKSB7XHJcbiAgICAgICAgYSArPSBzYztcclxuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XHJcbiAgICAgICAgYiArPSBzYztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYyA9IGEgKiAzO1xyXG4gICAgZCA9IGIgKyBjO1xyXG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xyXG4gICAgICBlID0gZCAtIGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGUgPT09IHBhcnNlSW50KHNbMTJdLCAxMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzQmFyQ29kZShzKTogYm9vbGVhbiB7XHJcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XHJcbiAgICByZXR1cm4gcmVnLmV4ZWMocy5zdWJzdHJpbmcoMCwgMTIpKSAhPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSVNCTiB9IGZyb20gJy4vaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9QQVJUX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblBhcnRWYWxpZERpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21wcklzYm5QYXJ0VmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX1BBUlRfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5QYXJ0MzQnLCAnw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3ClycpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcclxuICAgIGlmICghaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8vIMOpwqrCjMOowq/CgcOnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpdcclxuICAgIGlmIChpc2JuLmlzYm4zLmxlbmd0aCArIGlzYm4uaXNibjQubGVuZ3RoICE9PSA4KSB7XHJcbiAgICAgIHJldHVybiB7IGlzYm5QYXJ0MzQ6IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IElTQk5fSEVBREVSX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNibkhlYWRlclZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9IRUFERVJfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibkhlYWRlcicsICfDp8KswqzDpMK4woDDp8K7woTDpcK/woXDqcKhwrvDpMK4wro5NzjDpsKIwpY5NzknKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCFjLnZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKFsnOTk5JywgJzk3OCcsICc5NzknLCAnMDAwJ10uaW5kZXhPZihjLnZhbHVlKSA8IDApIHtcclxuICAgICAgcmV0dXJuIHsgaXNibkhlYWRlcjogdHJ1ZX07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBGTE9BVF9WQUxJRFRPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXByRmxvYXRPbmx5VmFsaWR0b3JdJyxcclxuICBwcm92aWRlcnM6IFtGTE9BVF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2Zsb2F0JywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwrXCrsOnwoLCucOmwpXCsCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgZmxvYXRWYWwgPSBwYXJzZUZsb2F0KCcnICsgYy52YWx1ZSk7XHJcbiAgICBpZiAoaXNOYU4oZmxvYXRWYWwpKSB7XHJcbiAgICAgIHJldHVybiB7IGZsb2F0OiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2Zvcm1Hcm91cF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNcHJGb3JtR3JvdXBEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gQ2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvciwgaW5pdGlhbGl6aW5nIGlucHV0IHByb3BlcnRpZXMsIGFuZCB0aGUgZmlyc3QgY2FsbCB0byBuZ09uQ2hhbmdlcy5cclxuICAgIC8vIEFkZCAnaW1wbGVtZW50cyBPbkluaXQnIHRvIHRoZSBjbGFzcy5cclxuICAgIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUpIHtcclxuICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNcHJGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS1ncm91cC5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIE1wckZvcm1Hcm91cERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIE1wckZvcm1Hcm91cERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBGb3JtVmFsaWRNc2dTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTW9kdWxlIHsgfVxyXG4iLCJleHBvcnQgeyBGb3JtVmFsaWRNb2R1bGUgfSBmcm9tICcuL2xpYi9mb3JtLXZhbGlkLm1vZHVsZSc7XHJcbmV4cG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuZXhwb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuZXhwb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQnO1xyXG5leHBvcnQgeyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9pc2JuLWhlYWRlci12YWxpZC5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsIElTQk4gfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG4vL2V4cG9ydCB7IEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlJztcclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJGb3JtQ29udHJvbCIsIkZvcm1Hcm91cCIsIkZvcm1Hcm91cERpcmVjdGl2ZSIsIkZvcm1Hcm91cE5hbWUiLCJOZ01vZGVsR3JvdXAiLCJDb21wb25lbnQiLCJBdHRyaWJ1dGUiLCJDb250cm9sQ29udGFpbmVyIiwiT3B0aW9uYWwiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIkRpcmVjdGl2ZSIsIk5HX1ZBTElEQVRPUlMiLCJmb3J3YXJkUmVmIiwiUmVuZGVyZXIyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQTs7UUFBQTtRQUdFOzRCQURtQixJQUFJLEdBQUcsRUFBa0I7U0FDM0I7Ozs7Ozs7UUFPViwyQ0FBVzs7Ozs7O3NCQUFDLE1BQWMsRUFBRSxRQUFnQjtnQkFDakQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Ozs7OztRQUcvQixzQ0FBTTs7OztzQkFBQyxNQUFjO2dCQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNYLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O29DQXhCckM7UUEwQkMsQ0FBQTt5QkFHWSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFxQixFQUFFOzs7Ozs7QUM3QjdEO1FBUUU7NEJBRG1CLEVBQUU7U0FDSjs7Ozs7O1FBRVYseUNBQVc7Ozs7O3NCQUFDLE1BQWMsRUFBRSxRQUFnQjtnQkFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDYixPQUFPO2lCQUNSO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O1FBRzVCLHlDQUFXOzs7OztzQkFBQyxPQUFlLEVBQUUsS0FBSztnQkFDdkMscUJBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ2pDLHFCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLHFCQUFJLE1BQU0sQ0FBQztnQkFDWCxxQkFBSSxTQUFTLENBQUM7Z0JBRWQsSUFBSSxDQUFDLEtBQUssSUFBSSxD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