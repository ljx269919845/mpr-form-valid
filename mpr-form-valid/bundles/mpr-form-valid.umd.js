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
        GlobalValidService.prototype.validAll = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ result = true;
                this.validForms.forEach(function (elemForm) {
                    // elemForm.markAsDirty({onlySelf: true});
                    // if (elemForm instanceof FormGroup) {
                    //   this.validFormGroup(elemForm);
                    // }
                    elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
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
                    this.formControl.valueChanges.subscribe(function () {
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
                    this.formControl.valueChanges.subscribe(function () {
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
                for (var /** @type {?} */ name_1 in control.controls) {
                    tmpErrorInfo = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name_1)), path + '.' + name_1, errorInfo);
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
                console.log(parentElement.getAttribute('ng-reflect-form'));
                while (!parentElement.getAttribute('formgroupname')
                    && !parentElement.getAttribute('formGroupName')
                    && !parentElement.getAttribute('ng-reflect-form')
                    && !(parentElement.nodeName.toLocaleLowerCase() === 'form')
                    && !(parentElement.nodeName.toLocaleLowerCase() === 'ngform')) {
                    parentElement = parentElement.parentElement;
                }
                if (!parentElement) {
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
                        ],
                        exports: [
                            FormControlValidComponent,
                            FormValidMsgDirective,
                            IsbnValidtorDirective,
                            IsbnPartValidDirective,
                            IsbnHeaderValidDirective,
                            forms.ReactiveFormsModule,
                            forms.FormsModule,
                            FloatOnlyValidtorDirective
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
    exports.ɵb = FormValidMsgDirective;
    exports.ɵa = GlobalValidMsgService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2Zvcm0tdmFsaWQubW9kdWxlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9wdWJsaWNfYXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDDpcKFwqjDpcKxwoDDqcKqwozDqMKvwoHDpsK2wojDpsKBwq/Dr8K8wowgw6XCrcKYw6XCgsKow6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IG5ldyBNYXA8U3RyaW5nLCBTdHJpbmc+KCk7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCrsK+w6fCvcKuw6nClMKZw6jCr8Kva2V5w6fCmsKEw6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDDqcKUwpnDqMKvwq9rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUgw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LCBtc2dWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TXNnKG1zZ0tleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnZhbGlkTXNnLmdldChtc2dLZXkpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5XSA9IG1zZ1ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZhbGlkTXNnKG1zZ1BhdGg6IHN0cmluZywgZXJyb3IpIHtcclxuICAgIGxldCBtaW5XZWlnaHQgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgbGV0IGVycm9yTXNnID0gJyc7XHJcbiAgICBsZXQgdG1wTXNnO1xyXG4gICAgbGV0IHRtcFdlaWdodDtcclxuXHJcbiAgICBpZiAoIWVycm9yIHx8ICFtc2dQYXRoKSB7XHJcbiAgICAgIHJldHVybiB7ZXJyb3JNc2csIG1pbldlaWdodH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBlcnJvcikge1xyXG4gICAgICB0bXBNc2cgPSB0aGlzLnZhbGlkTXNnW21zZ1BhdGggKyAnLicgKyBuYW1lXSB8fCBnbG9iYWxWYWxpZE1zZ1NlcnYuZ2V0TXNnKG5hbWUpO1xyXG4gICAgICBpZighdG1wTXNnKXtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZihOdW1iZXIuaXNOYU4oTnVtYmVyKGVycm9yW25hbWVdKSkpe1xyXG4gICAgICAgIHRtcFdlaWdodCA9IDEwMDA7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHRtcFdlaWdodCA9IE51bWJlcihlcnJvcltuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYodG1wV2VpZ2h0IDwgbWluV2VpZ2h0KXtcclxuICAgICAgICBtaW5XZWlnaHQgPSB0bXBXZWlnaHQ7XHJcbiAgICAgICAgZXJyb3JNc2cgPSB0bXBNc2c7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7ZXJyb3JNc2csIG1pbldlaWdodH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRNc2cobXNnOiBPYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgbXNnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcignZm9ybSB2YWxpZCBtc2cgbXVzdCBiZSBhIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgLy90aGlzLnZhbGlkTXNnID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnZhbGlkTXNnW25hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZSwgdGhpcy52YWxpZE1zZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0TXNnKG1zZzogT2JqZWN0LCBwYXRoOiBzdHJpbmcsIHJlc3VsdDogT2JqZWN0KSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJlc3VsdFtwYXRoICsgJy4nICsgbmFtZV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBwYXRoICsgJy4nICsgbmFtZSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtczogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJWYWxpZEZvcm0oZm9ybTogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsaWRGb3Jtcy5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZEFsbCgpIHtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goZWxlbUZvcm0gPT4ge1xyXG4gICAgICAvLyBlbGVtRm9ybS5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAgICAgLy8gaWYgKGVsZW1Gb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgIC8vICAgdGhpcy52YWxpZEZvcm1Hcm91cChlbGVtRm9ybSk7XHJcbiAgICAgIC8vIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGVsZW1Gb3JtLmZvcm0udmFsaWQgJiYgcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVucmVnaXN0ZXJWYWxpZEZvcm0oZm9ybSkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcHJpdmF0ZSB2YWxpZEZvcm1Hcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gIC8vICAgZm9ybUdyb3VwLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gIC8vICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gIC8vICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gIC8vICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgLy8gICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgLy8gICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBJbnB1dCwgSW5qZWN0LFxyXG4gIEFmdGVyQ29udGVudEluaXQsIEVsZW1lbnRSZWYsIEF0dHJpYnV0ZSwgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb250cm9sQ29udGFpbmVyLCBBYnN0cmFjdENvbnRyb2wsIEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSxcclxuICBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtR3JvdXBOYW1lLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nTW9kZWxHcm91cFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgVkFMSURfQ09NUE9ORU5UX05BTUUgPSAnbXByLWZvcm0tY29udHJvbC12YWxpZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogVkFMSURfQ09NUE9ORU5UX05BTUUsXHJcbiAgdGVtcGxhdGU6IGA8c3BhblxyXG4gICAgY2xhc3M9XCJlcnJvclwiXHJcbiAgICBbbmdDbGFzc109XCJlcnJvclByb21wdFwiXHJcbiAgICBbaGlkZGVuXT1cIiFlcnJvck1zZ1wiXHJcbj5cclxuICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntlcnJvck1zZzplcnJvck1zZ31cIlxyXG4gICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgPHAgKm5nSWY9XCIhdGVtcGxhdGVcIj57e2Vycm9yTXNnfX08L3A+XHJcbjwvc3Bhbj5cclxuYCxcclxuICBzdHlsZXM6IFtgcHt3aWR0aDoxMDAlO2hlaWdodDoxN3B4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6I2UwNmEyZjtmbG9hdDpsZWZ0fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgLy/DpcKPwqrDpsKYwr7Dp8Kkwrpmb3JtZ3JvdXDDpsKcwqzDqMK6wqvDp8KawoTDqcKUwpnDqMKvwq/Dr8K8wozDpMK4wo3DpsKYwr7Dp8Kkwrpncm91cMOkwrjCi2NvbnRyb2zDp8KawoTDqcKUwpnDqMKvwq9cclxuICBASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlcnJvclByb21wdDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBlcnJvck1zZzogc3RyaW5nOyAvL8OpwqrCjMOowq/CgcOlwqTCscOowrTCpcOmwpjCvsOnwqTCusOnwprChMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG5cclxuICBwcml2YXRlIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgcHJpdmF0ZSBjb250cm9sTmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gIMOlwoXCvMOlwq7CuW5nRnJvbVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuICAgIHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBjb25zdCBpc0Zvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSlcclxuICAgICAgJiYgKHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpO1xyXG4gICAgaWYgKCFpc0Zvcm1Db250cm9sKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCBcclxuICAgICAgICAgICAge21pbldlaWdodDogTnVtYmVyLk1BWF9WQUxVRSwgZXJyb3JNc2c6ICcnfSlbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZvcm1Db250cm9sKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybUNvbnRyb2wgaW5zdGFuY2Ugbm90IGZpbmQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgLy9DYWxsZWQgb25jZSwgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXHJcbiAgICAvL0FkZCAnaW1wbGVtZW50cyBPbkRlc3Ryb3knIHRvIHRoZSBjbGFzcy5cclxuICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnVucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWZ3JvdXDDpMK4wovDqcKdwqLDp8KawoTDpsKJwoDDpsKcwonDqcKqwozDqMKvwoHDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gY29udHJvbCBcclxuICAgKiBAcGFyYW0gcGF0aCBcclxuICAgKi9cclxuICBwcml2YXRlIGdldEdyb3VwQ29udHJvbFZhbGlkTXNnKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoOiBzdHJpbmcsIGVycm9ySW5mbykge1xyXG4gICAgXHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHRtcEVycm9ySW5mbztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scykge1xyXG4gICAgICB0bXBFcnJvckluZm8gPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lLCBlcnJvckluZm8pO1xyXG4gICAgICBpZih0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSl7XHJcbiAgICAgICAgZXJyb3JJbmZvID0gdG1wRXJyb3JJbmZvO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0bXBFcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgaWYodG1wRXJyb3JJbmZvWydtaW5XZWlnaHQnXSA8IGVycm9ySW5mb1snbWluV2VpZ2h0J10pe1xyXG4gICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JJbmZvO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcbiAgICBsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG4gICAgd2hpbGUgKCFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJylcclxuICAgICAgJiYgIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJylcclxuICAgICAgJiYgIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICduZ2Zvcm0nKSkge1xyXG4gICAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNsaWJpbmdGb3JtQ29udHJsRWxlbShzZWFyY2hFbGVtOiBFbGVtZW50KSB7XHJcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nOiBFbGVtZW50ID0gc2VhcmNoRWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgd2hpbGUgKHByZXZpb3VzU2libGluZyAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcclxuICAgICAgLy8gaWYocHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcImZvcm1Hcm91cE5hbWVcIikgfHwgcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcIltmb3JtR3JvdXBdXCIpKXtcclxuICAgICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJoYXZlIHNlYXJjaCB0byByb290XCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtcHItZm9ybS1jb250cm9sLXZhbGlkIG11c3QgaGF2ZSBhIGZvcm1jb250cm9sIHNpYmlsaW5nJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCh8Kqw6XCisKow6bCn8Klw6bCicK+w6XCvcKTw6XCicKNw6nCqsKMw6jCr8KBw6XCr8K5w6XCusKUw6fCmsKEZm9ybUNvbnRyb2xOYW1lw6bCiMKWw6jCgMKFZm9ybUdyb3VwTmFtZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybUNvbnRyb2xOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICAvLyDDpsKJwovDpcKKwqjDqMKuwr7DpcKuwprDpMK6woZjb250cm9sTmFtZVxyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbE5hbWU7XHJcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25seSBvbmUgW2Zvcm1Db250cm9sXSBub3Qgc3VwcG9ydCwgVGhlcmUgbXVzdCBiZSBhIGZvcm1Hcm91cE5hbWUgb3IgW2Zvcm1Hcm91cF0nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldFBhcmVudEdyb3VwRUxlbSgpO1xyXG4gICAgICBjb25zdCBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChWQUxJRF9DT01QT05FTlRfTkFNRSkubGVuZ3RoO1xyXG4gICAgICB0aGlzLmdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGg7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cERpcmVjdGl2ZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCm8K0w6bCjsKlw6bCmMKvw6bCoMK5w6jCisKCw6fCgsK5w6XCr8K5w6XCusKUw6bClcK0w6TCuMKqZnJvbSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZm9ybcOowqHCqMOlwo3ClcOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWTDr8K8wozDpcKIwpnDpMK7wqXDpcK9wpPDpcKJwo1mb3JtR3JvdXDDpcKvwrnDpcK6wpTDp8KawoTDpcKPwpjDqcKHwo/DpcKQwo3DpMK4wrpjb250cm9sTmFtZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IHNob3VsZCBzZXQgY29udHJvbE5hbWUgYnkgeW91cnNlbGYnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cE5hbWUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKSB8fCBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZnJvbUdyb3VwTmFtZScpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgTmdNb2RlbEdyb3VwICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHRoaXMuY29udGFpbmVyLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbXByLWZvcm0tY29udHJvbC12YWxpZCDDpcKvwrnDpcK6wpTDpMK4woDDpMK4wqogZm9ybUNvbnRyb2xOYW1lXHJcbiAgICAgICAgLy8gw6XCkMKRw6XCicKNw6bCn8Klw6bCicK+w6XChcKEw6XCvMKfw6jCisKCw6fCgsK5XHJcbiAgICAgICAgY29uc3Qgc2libGluZ0VsZW0gPSB0aGlzLmdldFNsaWJpbmdGb3JtQ29udHJsRWxlbSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/ClsOlwr3Ck8OlwonCjWZvcm1Db250cm9sw6fCm8K4w6XCr8K5w6TCusKOZm9ybUdyb3Vww6fCmsKEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbCBcclxuICAgKiBAcGFyYW0gcm9vdCBcclxuICAgKiBAcGFyYW0gY29udHJvbE5hbWUgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICBpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuICAgICAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuICAgICAgICByZXR1cm4gY3RybE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuICAgICAgICBpZiAodG1wUGF0aCkge1xyXG4gICAgICAgICAgcGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuICAgICAgICAgIHBhdGgucHVzaCh0bXBQYXRoKTtcclxuICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaXNsaUZvcm1WYWxpZE1zZ10nLFxyXG4gIHByb3ZpZGVyczogW0Zvcm1WYWxpZE1zZ1NlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoJ2lzbGlGb3JtVmFsaWRNc2cnKSBzZXQgdmFsaWRNc2cobXNnKSB7XHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHRoaXMubXNnU2Vydi5yZXNldE1zZyhtc2cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNCTiB7XHJcbiAgaXNibjE6IHN0cmluZztcclxuICBpc2JuMjogc3RyaW5nO1xyXG4gIGlzYm4zOiBzdHJpbmc7XHJcbiAgaXNibjQ6IHN0cmluZztcclxuICBpc2JuNTogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBJU0JOX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNiblZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5WYWxpZHRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuJywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwq3Co8OnwqHCrsOnwprChElTQk7DpcKPwrcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XHJcbiAgICAvLyDDpMK4wo3DqcKqwozDqMKvwoHDqcKdwp7Dp8KpwrpcclxuICAgIGlmICghaXNibi5pc2JuMSB8fCAhaXNibi5pc2JuMiB8fCAhaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCB8fCAhaXNibi5pc2JuNSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcclxuICAgICAgcmV0dXJuIHsgaXNibjogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xyXG4gICAgaWYgKHMgPT09ICc5OTk5OTk5OTk5OTk5Jykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5pc0JhckNvZGUocykpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IGEgPSAwLCBiID0gMCwgYyA9IDAsIGQgPSAwLCBlO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xyXG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XHJcbiAgICAgIGlmIChpIDw9IDEyICYmIGkgJSAyID09PSAwKSB7XHJcbiAgICAgICAgYSArPSBzYztcclxuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XHJcbiAgICAgICAgYiArPSBzYztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYyA9IGEgKiAzO1xyXG4gICAgZCA9IGIgKyBjO1xyXG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xyXG4gICAgICBlID0gZCAtIGQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGUgPT09IHBhcnNlSW50KHNbMTJdLCAxMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzQmFyQ29kZShzKTogYm9vbGVhbiB7XHJcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XHJcbiAgICByZXR1cm4gcmVnLmV4ZWMocy5zdWJzdHJpbmcoMCwgMTIpKSAhPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSVNCTiB9IGZyb20gJy4vaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9QQVJUX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblBhcnRWYWxpZERpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21wcklzYm5QYXJ0VmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX1BBUlRfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5QYXJ0MzQnLCAnw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3ClycpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcclxuICAgIGlmICghaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8vIMOpwqrCjMOowq/CgcOnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpdcclxuICAgIGlmIChpc2JuLmlzYm4zLmxlbmd0aCArIGlzYm4uaXNibjQubGVuZ3RoICE9PSA4KSB7XHJcbiAgICAgIHJldHVybiB7IGlzYm5QYXJ0MzQ6IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IElTQk5fSEVBREVSX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNibkhlYWRlclZhbGlkXScsXHJcbiAgcHJvdmlkZXJzOiBbSVNCTl9IRUFERVJfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibkhlYWRlcicsICfDp8KswqzDpMK4woDDp8K7woTDpcK/woXDqcKhwrvDpMK4wro5NzjDpsKIwpY5NzknKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCFjLnZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKFsnOTk5JywgJzk3OCcsICc5NzknLCAnMDAwJ10uaW5kZXhPZihjLnZhbHVlKSA8IDApIHtcclxuICAgICAgcmV0dXJuIHsgaXNibkhlYWRlcjogdHJ1ZX07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBGTE9BVF9WQUxJRFRPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXByRmxvYXRPbmx5VmFsaWR0b3JdJyxcclxuICBwcm92aWRlcnM6IFtGTE9BVF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2Zsb2F0JywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwrXCrsOnwoLCucOmwpXCsCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgZmxvYXRWYWwgPSBwYXJzZUZsb2F0KCcnICsgYy52YWx1ZSk7XHJcbiAgICBpZiAoaXNOYU4oZmxvYXRWYWwpKSB7XHJcbiAgICAgIHJldHVybiB7IGZsb2F0OiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IElzYm5WYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLWhlYWRlci12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIEZvcm1WYWxpZE1zZ1NlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNb2R1bGUgeyB9XHJcbiIsImV4cG9ydCB7IEZvcm1WYWxpZE1vZHVsZSB9IGZyb20gJy4vbGliL2Zvcm0tdmFsaWQubW9kdWxlJztcclxuZXhwb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmV4cG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2xpYi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IElzYm5WYWxpZHRvckRpcmVjdGl2ZSwgSVNCTiB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbi8vZXhwb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkZvcm1Db250cm9sIiwiRm9ybUdyb3VwRGlyZWN0aXZlIiwiRm9ybUdyb3VwTmFtZSIsIk5nTW9kZWxHcm91cCIsIkZvcm1Hcm91cCIsIkNvbXBvbmVudCIsIkF0dHJpYnV0ZSIsIkNvbnRyb2xDb250YWluZXIiLCJPcHRpb25hbCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZCIsIlRlbXBsYXRlUmVmIiwiRGlyZWN0aXZlIiwiTkdfVkFMSURBVE9SUyIsImZvcndhcmRSZWYiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBOztRQUFBO1FBR0U7NEJBRG1CLElBQUksR0FBRyxFQUFrQjtTQUMzQjs7Ozs7OztRQU9WLDJDQUFXOzs7Ozs7c0JBQUMsTUFBYyxFQUFFLFFBQWdCO2dCQUNqRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7aUJBQ3JEO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7O1FBRy9CLHNDQUFNOzs7O3NCQUFDLE1BQWM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7b0NBeEJyQztRQTBCQyxDQUFBO3lCQUdZLGtCQUFrQixHQUFHLElBQUkscUJBQXFCLEVBQUU7Ozs7OztBQzdCN0Q7UUFRRTs0QkFEbUIsRUFBRTtTQUNKOzs7Ozs7UUFFVix5Q0FBVzs7Ozs7c0JBQUMsTUFBYyxFQUFF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