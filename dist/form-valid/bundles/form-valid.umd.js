(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('form-valid', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['form-valid'] = {}),global.ng.core,global.ng.forms,global.ng.common));
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
                if (!error || !msgPath) {
                    return '';
                }
                for (var /** @type {?} */ name_1 in error) {
                    if (error[name_1]) {
                        return this.validMsg[msgPath + '.' + name_1] || globalValidMsgServ.getMsg(name_1);
                    }
                }
                return '';
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
                this.validMsg = {};
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
                if (this.groupValidControlLength <= 1) {
                    // from root or from formGroupName
                    this.formControl = this.container.control;
                    path = this.getPath(this.formControl, this.formControl.root, this.controlName);
                    this.formControl.valueChanges.subscribe(function () {
                        if (_this.onlyGroup) {
                            _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors);
                        }
                        else {
                            _this.errorMsg = _this.getGroupControlValidMsg(/** @type {?} */ (_this.formControl), path || _this.controlName);
                        }
                    });
                }
                else {
                    this.formControl = this.container.control.get(this.controlName);
                    path = this.getPath(this.formControl, this.formControl.root, this.controlName);
                    this.formControl.valueChanges.subscribe(function () {
                        _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors);
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
         * @return {?}
         */
        FormControlValidComponent.prototype.getGroupControlValidMsg = /**
         * 获取group下面的所有验证错误消息
         * @param {?} control
         * @param {?} path
         * @return {?}
         */
            function (control, path) {
                if (control instanceof forms.FormControl) {
                    return this.errMsgServ.getValidMsg(path, control.errors);
                }
                var /** @type {?} */ msg;
                for (var /** @type {?} */ name_1 in control.controls) {
                    msg = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name_1)), path + '.' + name_1);
                    if (msg) {
                        return msg;
                    }
                }
                return this.errMsgServ.getValidMsg(path, control.errors);
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
        useExisting: core.forwardRef(function () { return FloatValidtor; }),
        multi: true
    };
    var FloatValidtor = (function () {
        function FloatValidtor() {
            globalValidMsgServ.registerMsg('float', '请输入浮点数');
        }
        /**
         * @param {?} c
         * @return {?}
         */
        FloatValidtor.prototype.validate = /**
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
        FloatValidtor.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mprFloatOnly]',
                        providers: [FLOAT_VALIDTOR]
                    },] },
        ];
        /** @nocollapse */
        FloatValidtor.ctorParameters = function () { return []; };
        return FloatValidtor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ PRICE_VALIDTOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return PriceValidtor; }),
        multi: true
    };
    var PriceValidtor = (function () {
        function PriceValidtor() {
            globalValidMsgServ.registerMsg('price', '价格为两位小数');
        }
        /**
         * @param {?} c
         * @return {?}
         */
        PriceValidtor.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
            function (c) {
                var /** @type {?} */ price = '' + c.value;
                if (/^\d+(.\d{0,2})?$/.test(price)) {
                    return null;
                }
                return { price: true };
            };
        PriceValidtor.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mprPriceValid]',
                        providers: [PRICE_VALIDTOR]
                    },] },
        ];
        /** @nocollapse */
        PriceValidtor.ctorParameters = function () { return []; };
        return PriceValidtor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ EMAIL_VALIDTOR = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef(function () { return EmailValidtor; }),
        multi: true
    };
    var EmailValidtor = (function () {
        function EmailValidtor() {
            globalValidMsgServ.registerMsg('emailError', '请输入合法的邮箱');
        }
        /**
         * @param {?} contorl
         * @return {?}
         */
        EmailValidtor.prototype.validate = /**
         * @param {?} contorl
         * @return {?}
         */
            function (contorl) {
                var /** @type {?} */ email = contorl.value;
                if (!email) {
                    // 允许为空
                    return null;
                }
                if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email)) {
                    return { emailError: true };
                }
                return null;
            };
        EmailValidtor.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mprEmailValid]',
                        providers: [EMAIL_VALIDTOR]
                    },] },
        ];
        /** @nocollapse */
        EmailValidtor.ctorParameters = function () { return []; };
        return EmailValidtor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

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
                            common.CommonModule
                        ],
                        declarations: [
                            FormControlValidComponent,
                            FormValidMsgDirective,
                            IsbnValidtorDirective,
                            IsbnPartValidDirective,
                            IsbnHeaderValidDirective,
                            EmailValidtor,
                            FloatValidtor,
                            PriceValidtor
                        ],
                        exports: [
                            FormControlValidComponent,
                            FormValidMsgDirective,
                            IsbnValidtorDirective,
                            IsbnPartValidDirective,
                            IsbnHeaderValidDirective,
                            EmailValidtor,
                            FloatValidtor,
                            PriceValidtor
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.FormValidModule = FormValidModule;
    exports.GlobalValidService = GlobalValidService;
    exports.FloatValidtor = FloatValidtor;
    exports.PriceValidtor = PriceValidtor;
    exports.EmailValidtor = EmailValidtor;
    exports.IsbnHeaderValidDirective = IsbnHeaderValidDirective;
    exports.IsbnPartValidDirective = IsbnPartValidDirective;
    exports.IsbnValidtorDirective = IsbnValidtorDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9wcmljZS12YWxpZHRvci50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2VtYWlsLXZhbGlkdG9yLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi9mb3JtLXZhbGlkLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogw6XChcKow6XCscKAw6nCqsKMw6jCr8KBw6bCtsKIw6bCgcKvw6/CvMKMIMOlwq3CmMOlwoLCqMOpwrvCmMOowq7CpMOmwrbCiMOmwoHCr1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSBuZXcgTWFwPFN0cmluZywgU3RyaW5nPigpO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowq7CvsOnwr3CrsOpwpTCmcOowq/Cr2tlecOnwprChMOpwrvCmMOowq7CpMOmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBtc2dLZXkgw6nClMKZw6jCr8Kva2V5XHJcbiAgICogQHBhcmFtIG1zZ1ZhbHVlIMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZWdpc3Rlck1zZyhtc2dLZXk6IHN0cmluZywgbXNnVmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dLZXkgfHwgIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXNnIGtleSBhbmQgdmFsdWUgbXVzdCBub3QgZW1wdHknKTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2cuc2V0KG1zZ0tleSwgbXNnVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1zZyhtc2dLZXk6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dLZXkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZE1zZy5nZXQobXNnS2V5KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2xvYmFsVmFsaWRNc2dTZXJ2ID0gbmV3IEdsb2JhbFZhbGlkTXNnU2VydmljZSgpO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IHt9O1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHB1YmxpYyBzZXRWYWxpZE1zZyhtc2dLZXk6IHN0cmluZywgbXNnVmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKCFtc2dWYWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnW21zZ0tleV0gPSBtc2dWYWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWYWxpZE1zZyhtc2dQYXRoOiBzdHJpbmcsIGVycm9yKSB7XHJcbiAgICBpZiAoIWVycm9yIHx8ICFtc2dQYXRoKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBlcnJvcikge1xyXG4gICAgICBpZiAoZXJyb3JbbmFtZV0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZE1zZ1ttc2dQYXRoICsgJy4nICsgbmFtZV0gfHwgZ2xvYmFsVmFsaWRNc2dTZXJ2LmdldE1zZyhuYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0TXNnKG1zZzogT2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ2Zvcm0gdmFsaWQgbXNnIG11c3QgYmUgYSBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2cgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRoaXMudmFsaWRNc2dbbmFtZV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBuYW1lLCB0aGlzLnZhbGlkTXNnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRNc2cobXNnOiBPYmplY3QsIHBhdGg6IHN0cmluZywgcmVzdWx0OiBPYmplY3QpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmVzdWx0W3BhdGggKyAnLicgKyBuYW1lXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIHBhdGggKyAnLicgKyBuYW1lLCByZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1zOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlclZhbGlkRm9ybShmb3JtOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uZm9ybSA9PSBmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50ICs9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMucHVzaCh7IGZvcm06IGZvcm0sIGNvdW50OiAxIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaChlbGVtRm9ybSA9PiB7XHJcbiAgICAgIC8vIGVsZW1Gb3JtLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gICAgICAvLyBpZiAoZWxlbUZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgLy8gICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBlbGVtRm9ybS5mb3JtLnBhdGNoVmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgcmVzdWx0ID0gZWxlbUZvcm0uZm9ybS52YWxpZCAmJiByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5yZWdpc3RlclZhbGlkRm9ybShmb3JtKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsaWRGb3Jtcy5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCA+IDEpIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCAtPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBwcml2YXRlIHZhbGlkRm9ybUdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgLy8gICBmb3JtR3JvdXAubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgLy8gICBjb25zdCBmb3JtQ29udHJvbHMgPSBmb3JtR3JvdXAuY29udHJvbHM7XHJcbiAgLy8gICBmb3IgKGNvbnN0IG5hbWUgaW4gZm9ybUNvbnRyb2xzKSB7XHJcbiAgLy8gICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAvLyAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAvLyAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIElucHV0LCBJbmplY3QsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgQXR0cmlidXRlLCBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xDb250YWluZXIsIEFic3RyYWN0Q29udHJvbCwgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG4gIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1Hcm91cE5hbWUsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdNb2RlbEdyb3VwXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcblxyXG5jb25zdCBWQUxJRF9DT01QT05FTlRfTkFNRSA9ICdtcHItZm9ybS1jb250cm9sLXZhbGlkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBWQUxJRF9DT01QT05FTlRfTkFNRSxcclxuICB0ZW1wbGF0ZTogYDxzcGFuXG4gICAgY2xhc3M9XCJlcnJvclwiXG4gICAgW25nQ2xhc3NdPVwiZXJyb3JQcm9tcHRcIlxuICAgIFtoaWRkZW5dPVwiIWVycm9yTXNnXCJcbj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntlcnJvck1zZzplcnJvck1zZ31cIlxuICAgID48L25nLWNvbnRhaW5lcj5cbiAgICA8cCAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7ZXJyb3JNc2d9fTwvcD5cbjwvc3Bhbj5cbmAsXHJcbiAgc3R5bGVzOiBbYHB7d2lkdGg6MTAwJTtoZWlnaHQ6MTdweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiNlMDZhMmY7ZmxvYXQ6bGVmdH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gIC8vw6XCj8Kqw6bCmMK+w6fCpMK6Zm9ybWdyb3Vww6bCnMKsw6jCusKrw6fCmsKEw6nClMKZw6jCr8Kvw6/CvMKMw6TCuMKNw6bCmMK+w6fCpMK6Z3JvdXDDpMK4wotjb250cm9sw6fCmsKEw6nClMKZw6jCr8KvXHJcbiAgQElucHV0KCkgb25seUdyb3VwID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZXJyb3JQcm9tcHQ7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwdWJsaWMgZXJyb3JNc2c6IHN0cmluZzsgLy/DqcKqwozDqMKvwoHDpcKkwrHDqMK0wqXDpsKYwr7Dp8KkwrrDp8KawoTDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuXHJcbiAgcHJpdmF0ZSBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xyXG4gIHByaXZhdGUgY29udHJvbE5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gMTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAQXR0cmlidXRlKCdjb250cm9sTmFtZScpIGNvbnRyb2xOYW1lOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcixcclxuICAgIHByaXZhdGUgZXJyTXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSxcclxuICAgIHByaXZhdGUgZ2xvYmFsVmFsaWRTZXJ2OiBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWYpIHtcclxuICAgIGlmIChjb250cm9sTmFtZSkge1xyXG4gICAgICB0aGlzLmNvbnRyb2xOYW1lID0gY29udHJvbE5hbWUucmVwbGFjZSgvJy9nLCAnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vICDDpcKFwrzDpcKuwrluZ0Zyb21cclxuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5iaW5kQ29udHJvbEVycm9yTXNnKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJpbmRDb250cm9sRXJyb3JNc2coKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoKTtcclxuICAgIGlmICghdGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBmaW5kIGNvbnRyb2xOYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAvLyBmcm9tIHJvb3Qgb3IgZnJvbSBmb3JtR3JvdXBOYW1lXHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25seUdyb3VwKSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PnRoaXMuZm9ybUNvbnRyb2wsIHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZvcm1Db250cm9sKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybUNvbnRyb2wgaW5zdGFuY2Ugbm90IGZpbmQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgLy9DYWxsZWQgb25jZSwgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXHJcbiAgICAvL0FkZCAnaW1wbGVtZW50cyBPbkRlc3Ryb3knIHRvIHRoZSBjbGFzcy5cclxuICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnVucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWZ3JvdXDDpMK4wovDqcKdwqLDp8KawoTDpsKJwoDDpsKcwonDqcKqwozDqMKvwoHDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gY29udHJvbCBcclxuICAgKiBAcGFyYW0gcGF0aCBcclxuICAgKi9cclxuICBwcml2YXRlIGdldEdyb3VwQ29udHJvbFZhbGlkTXNnKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoOiBzdHJpbmcpIHtcclxuICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbXNnO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgIG1zZyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUpO1xyXG4gICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgcmV0dXJuIG1zZztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhcmVudEdyb3VwRUxlbSgpOiBFbGVtZW50IHtcclxuICAgIGxldCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIC8vIGNvbnN0IGFycnRyaWJ1dGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKSk7XHJcbiAgICB3aGlsZSAoIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJylcclxuICAgICAgJiYgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtR3JvdXBOYW1lJylcclxuICAgICAgJiYgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKVxyXG4gICAgICAmJiAhKHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ2Zvcm0nKVxyXG4gICAgICAmJiAhKHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ25nZm9ybScpKSB7XHJcbiAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBmaW5kIHBhcmVudEVsZW1lbnRcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHNlYXJjaEVsZW06IEVsZW1lbnQpIHtcclxuICAgIGxldCBwcmV2aW91c1NpYmxpbmc6IEVsZW1lbnQgPSBzZWFyY2hFbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB3aGlsZSAocHJldmlvdXNTaWJsaW5nICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkge1xyXG4gICAgICAvLyBpZihwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiZm9ybUdyb3VwTmFtZVwiKSB8fCBwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiW2Zvcm1Hcm91cF1cIikpe1xyXG4gICAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcImhhdmUgc2VhcmNoIHRvIHJvb3RcIik7XHJcbiAgICAgIC8vIH1cclxuICAgICAgcHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgICBpZiAoIXByZXZpb3VzU2libGluZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQgbXVzdCBoYXZlIGEgZm9ybWNvbnRyb2wgc2liaWxpbmcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKHwqrDpcKKwqjDpsKfwqXDpsKJwr7DpcK9wpPDpcKJwo3DqcKqwozDqMKvwoHDpcKvwrnDpcK6wpTDp8KawoRmb3JtQ29udHJvbE5hbWXDpsKIwpbDqMKAwoVmb3JtR3JvdXBOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRGb3JtQ29udHJvbE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIC8vIMOmwonCi8OlworCqMOowq7CvsOlwq7CmsOkwrrChmNvbnRyb2xOYW1lXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sTmFtZTtcclxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IG9uZSBbZm9ybUNvbnRyb2xdIG5vdCBzdXBwb3J0LCBUaGVyZSBtdXN0IGJlIGEgZm9ybUdyb3VwTmFtZSBvciBbZm9ybUdyb3VwXScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50R3JvdXBFTGVtKCk7XHJcbiAgICAgIGNvbnN0IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFZBTElEX0NPTVBPTkVOVF9OQU1FKS5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBncm91cFZhbGlkQ29udHJvbExlbmd0aDtcclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwRGlyZWN0aXZlICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KbwrTDpsKOwqXDpsKYwq/DpsKgwrnDqMKKwoLDp8KCwrnDpcKvwrnDpcK6wpTDpsKVwrTDpMK4wqpmcm9tIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCJcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpmb3Jtw6jCocKow6XCjcKVw6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZMOvwrzCjMOlwojCmcOkwrvCpcOlwr3Ck8OlwonCjWZvcm1Hcm91cMOlwq/CucOlwrrClMOnwprChMOlwo/CmMOpwofCj8OlwpDCjcOkwrjCumNvbnRyb2xOYW1lXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHNldCBjb250cm9sTmFtZSBieSB5b3Vyc2VsZicpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwTmFtZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpIHx8IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmcm9tR3JvdXBOYW1lJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXAgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gdGhpcy5jb250YWluZXIubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtcHItZm9ybS1jb250cm9sLXZhbGlkIMOlwq/CucOlwrrClMOkwrjCgMOkwrjCqiBmb3JtQ29udHJvbE5hbWVcclxuICAgICAgICAvLyDDpcKQwpHDpcKJwo3DpsKfwqXDpsKJwr7DpcKFwoTDpcK8wp/DqMKKwoLDp8KCwrlcclxuICAgICAgICBjb25zdCBzaWJsaW5nRWxlbSA9IHRoaXMuZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBjb250cm9sTmFtZSA9IHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpZih0aGlzLmNvbnRyb2xOYW1lICYmIHRoaXMuY29udHJvbE5hbWUgIT0gY29udHJvbE5hbWUpe1xyXG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYHlvdSBtYXkgc2V0IGEgZXJyb3IgY29udHJvbE5hbWUsIHlvdSBzZXQgaXM6ICR7dGhpcy5jb250cm9sTmFtZX0sIGJ1dCBuZWVkIGlzOiAke2NvbnRyb2xOYW1lfWApO1xyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWw6XCvcKTw6XCicKNZm9ybUNvbnRyb2zDp8KbwrjDpcKvwrnDpMK6wo5mb3JtR3JvdXDDp8KawoRwYXRoXHJcbiAgICogQHBhcmFtIGZvcm1Db250cm9sIFxyXG4gICAqIEBwYXJhbSByb290IFxyXG4gICAqIEBwYXJhbSBjb250cm9sTmFtZSBcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhdGgoZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcm9vdCwgY29udHJvbE5hbWUpIHtcclxuICAgIGlmICghKHJvb3QgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbCA9PT0gcm9vdCkge1xyXG4gICAgICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGN0cmxOYW1lIGluIHJvb3RbJ2NvbnRyb2xzJ10pIHtcclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdID09PSBmb3JtQ29udHJvbCkge1xyXG4gICAgICAgIHJldHVybiBjdHJsTmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBjb25zdCB0bXBQYXRoID0gdGhpcy5nZXRQYXRoKGZvcm1Db250cm9sLCByb290Wydjb250cm9scyddW2N0cmxOYW1lXSwgY29udHJvbE5hbWUpO1xyXG4gICAgICAgIGlmICh0bXBQYXRoKSB7XHJcbiAgICAgICAgICBwYXRoLnB1c2goY3RybE5hbWUpO1xyXG4gICAgICAgICAgcGF0aC5wdXNoKHRtcFBhdGgpO1xyXG4gICAgICAgICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpc2xpRm9ybVZhbGlkTXNnXScsXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVZhbGlkTXNnU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgnaXNsaUZvcm1WYWxpZE1zZycpIHNldCB2YWxpZE1zZyhtc2cpIHtcclxuICAgIGlmIChtc2cpIHtcclxuICAgICAgdGhpcy5tc2dTZXJ2LnJlc2V0TXNnKG1zZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UpIHtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNCTiB7XG4gIGlzYm4xOiBzdHJpbmc7XG4gIGlzYm4yOiBzdHJpbmc7XG4gIGlzYm4zOiBzdHJpbmc7XG4gIGlzYm40OiBzdHJpbmc7XG4gIGlzYm41OiBzdHJpbmc7XG59XG5cbmNvbnN0IElTQk5fVkFMSURUT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5WYWxpZHRvckRpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXBySXNiblZhbGlkXScsXG4gIHByb3ZpZGVyczogW0lTQk5fVkFMSURUT1JdXG59KVxuZXhwb3J0IGNsYXNzIElzYm5WYWxpZHRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuJywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwq3Co8OnwqHCrsOnwprChElTQk7DpcKPwrcnKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XG4gICAgfVxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xuICAgIC8vIMOkwrjCjcOpwqrCjMOowq/CgcOpwp3CnsOnwqnCulxuICAgIGlmICghaXNibi5pc2JuMSB8fCAhaXNibi5pc2JuMiB8fCAhaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCB8fCAhaXNibi5pc2JuNSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsaWRJU0JOQ29kZShbaXNibi5pc2JuMSwgaXNibi5pc2JuMiwgaXNibi5pc2JuMywgaXNibi5pc2JuNCwgaXNibi5pc2JuNV0uam9pbignJykpKSB7XG4gICAgICByZXR1cm4geyBpc2JuOiB0cnVlIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZElTQk5Db2RlKHMpIHtcbiAgICBpZiAocyA9PT0gJzk5OTk5OTk5OTk5OTknKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzQmFyQ29kZShzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgYSA9IDAsIGIgPSAwLCBjID0gMCwgZCA9IDAsIGU7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xuICAgICAgY29uc3Qgc2MgPSBwYXJzZUludChzW2kgLSAxXSwgMTApO1xuICAgICAgaWYgKGkgPD0gMTIgJiYgaSAlIDIgPT09IDApIHtcbiAgICAgICAgYSArPSBzYztcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAxMSAmJiBpICUgMiA9PT0gMSkge1xuICAgICAgICBiICs9IHNjO1xuICAgICAgfVxuICAgIH1cbiAgICBjID0gYSAqIDM7XG4gICAgZCA9IGIgKyBjO1xuICAgIGlmIChkICUgMTAgPT09IDApIHtcbiAgICAgIGUgPSBkIC0gZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZSA9IGQgKyAoMTAgLSBkICUgMTApIC0gZDtcbiAgICB9XG4gICAgcmV0dXJuIGUgPT09IHBhcnNlSW50KHNbMTJdLCAxMCk7XG4gIH1cblxuICBwcml2YXRlIGlzQmFyQ29kZShzKTogYm9vbGVhbiB7XG4gICAgaWYgKHMubGVuZ3RoICE9PSAxMykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKC9eWzAtOV17MTJ9JC8pO1xuICAgIHJldHVybiByZWcuZXhlYyhzLnN1YnN0cmluZygwLCAxMikpICE9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IElTQk4gfSBmcm9tICcuL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XG5cbmNvbnN0IElTQk5fUEFSVF9WQUxJRFRPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblBhcnRWYWxpZERpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXBySXNiblBhcnRWYWxpZF0nLFxuICBwcm92aWRlcnM6IFtJU0JOX1BBUlRfVkFMSURUT1JdXG59KVxuZXhwb3J0IGNsYXNzIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNiblBhcnQzNCcsICfDp8KswqzDpMK4wonDp8K7woTDpcKSwozDp8KswqzDpcKbwpvDp8K7woTDpMK4woDDpcKFwrHDpMK4wro4w6TCvcKNw6bClcKww6XCrcKXJyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xuICAgIH1cbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcbiAgICBpZiAoIWlzYm4uaXNibjMgfHwgIWlzYm4uaXNibjQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyDDqcKqwozDqMKvwoHDp8KswqzDpMK4wonDp8K7woTDpcKSwozDp8KswqzDpcKbwpvDp8K7woTDpMK4woDDpcKFwrHDpMK4wro4w6TCvcKNw6bClcKww6XCrcKXXG4gICAgaWYgKGlzYm4uaXNibjMubGVuZ3RoICsgaXNibi5pc2JuNC5sZW5ndGggIT09IDgpIHtcbiAgICAgIHJldHVybiB7IGlzYm5QYXJ0MzQ6IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuY29uc3QgSVNCTl9IRUFERVJfVkFMSURUT1IgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXBySXNibkhlYWRlclZhbGlkXScsXG4gIHByb3ZpZGVyczogW0lTQk5fSEVBREVSX1ZBTElEVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibkhlYWRlcicsICfDp8KswqzDpMK4woDDp8K7woTDpcK/woXDqcKhwrvDpMK4wro5NzjDpsKIwpY5NzknKTtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghYy52YWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChbJzk5OScsICc5NzgnLCAnOTc5JywgJzAwMCddLmluZGV4T2YoYy52YWx1ZSkgPCAwKSB7XG4gICAgICByZXR1cm4geyBpc2JuSGVhZGVyOiB0cnVlfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEZMT0FUX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZsb2F0VmFsaWR0b3IpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbXByRmxvYXRPbmx5XScsXHJcbiAgICBwcm92aWRlcnM6IFtGTE9BVF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsb2F0VmFsaWR0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdmbG9hdCcsICfDqMKvwrfDqMK+wpPDpcKFwqXDpsK1wq7Dp8KCwrnDpsKVwrAnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgY29uc3QgZmxvYXRWYWwgPSBwYXJzZUZsb2F0KCcnICsgYy52YWx1ZSk7XHJcbiAgICAgICAgaWYgKGlzTmFOKGZsb2F0VmFsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBmbG9hdDogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgUFJJQ0VfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHJpY2VWYWxpZHRvciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttcHJQcmljZVZhbGlkXScsXHJcbiAgICBwcm92aWRlcnM6IFtQUklDRV9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByaWNlVmFsaWR0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygncHJpY2UnLCAnw6TCu8K3w6bCoMK8w6TCuMK6w6TCuMKkw6TCvcKNw6XCsMKPw6bClcKwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IHByaWNlID0gJycgKyBjLnZhbHVlO1xyXG4gICAgICAgIGlmICgvXlxcZCsoLlxcZHswLDJ9KT8kLy50ZXN0KHByaWNlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgcHJpY2U6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgRU1BSUxfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRW1haWxWYWxpZHRvciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttcHJFbWFpbFZhbGlkXScsXHJcbiAgICBwcm92aWRlcnM6IFtFTUFJTF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWR0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnZW1haWxFcnJvcicsICfDqMKvwrfDqMK+wpPDpcKFwqXDpcKQwojDpsKzwpXDp8KawoTDqcKCwq7Dp8KuwrEnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZShjb250b3JsOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICBjb25zdCBlbWFpbCA9IGNvbnRvcmwudmFsdWU7XHJcbiAgICAgICAgaWYgKCFlbWFpbCkgeyAvLyDDpcKFwoHDqMKuwrjDpMK4wrrDp8KpwrpcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghL15bYS16QS1aMC05Xy1dK0BbYS16QS1aMC05Xy1dKyhcXC5bYS16QS1aMC05Xy1dKykrJC9nLnRlc3QoZW1haWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGVtYWlsRXJyb3I6IHRydWUgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEVtYWlsVmFsaWR0b3IsIEZsb2F0VmFsaWR0b3IsIFByaWNlVmFsaWR0b3IgfSBmcm9tICcuL3ZhbGlkdG9ycyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIEVtYWlsVmFsaWR0b3IsXHJcbiAgICBGbG9hdFZhbGlkdG9yLFxyXG4gICAgUHJpY2VWYWxpZHRvclxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBFbWFpbFZhbGlkdG9yLFxyXG4gICAgRmxvYXRWYWxpZHRvcixcclxuICAgIFByaWNlVmFsaWR0b3JcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgRm9ybVZhbGlkTXNnU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJGb3JtQ29udHJvbCIsIkZvcm1Hcm91cERpcmVjdGl2ZSIsIkZvcm1Hcm91cE5hbWUiLCJOZ01vZGVsR3JvdXAiLCJGb3JtR3JvdXAiLCJDb21wb25lbnQiLCJBdHRyaWJ1dGUiLCJDb250cm9sQ29udGFpbmVyIiwiT3B0aW9uYWwiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIkRpcmVjdGl2ZSIsIk5HX1ZBTElEQVRPUlMiLCJm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