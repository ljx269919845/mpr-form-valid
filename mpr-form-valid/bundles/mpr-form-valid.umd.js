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
                var /** @type {?} */ isFormControl = this.container.control.get(this.controlName)
                    && (this.container.control.get(this.controlName) instanceof forms.FormControl);
                if (!isFormControl) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL3ByaWNlLXZhbGlkdG9yLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2VtYWlsLXZhbGlkdG9yLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS12YWxpZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIMOlwoXCqMOlwrHCgMOpwqrCjMOowq/CgcOmwrbCiMOmwoHCr8OvwrzCjCDDpcKtwpjDpcKCwqjDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0gbmV3IE1hcDxTdHJpbmcsIFN0cmluZz4oKTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKuwr7Dp8K9wq7DqcKUwpnDqMKvwq9rZXnDp8KawoTDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gbXNnS2V5IMOpwpTCmcOowq/Cr2tleVxyXG4gICAqIEBwYXJhbSBtc2dWYWx1ZSDDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnS2V5IHx8ICFtc2dWYWx1ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21zZyBrZXkgYW5kIHZhbHVlIG11c3Qgbm90IGVtcHR5Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnLnNldChtc2dLZXksIG1zZ1ZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNc2cobXNnS2V5OiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnS2V5KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRNc2cuZ2V0KG1zZ0tleSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbFZhbGlkTXNnU2VydiA9IG5ldyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2UoKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgc2V0VmFsaWRNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZ1ttc2dLZXldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yW25hbWVdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRNc2dbbXNnUGF0aCArICcuJyArIG5hbWVdIHx8IGdsb2JhbFZhbGlkTXNnU2Vydi5nZXRNc2cobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE1zZyhtc2c6IE9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBtc2cgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdmb3JtIHZhbGlkIG1zZyBtdXN0IGJlIGEgb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnZhbGlkTXNnW25hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZSwgdGhpcy52YWxpZE1zZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0TXNnKG1zZzogT2JqZWN0LCBwYXRoOiBzdHJpbmcsIHJlc3VsdDogT2JqZWN0KSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJlc3VsdFtwYXRoICsgJy4nICsgbmFtZV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBwYXRoICsgJy4nICsgbmFtZSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtczogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJWYWxpZEZvcm0oZm9ybTogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsaWRGb3Jtcy5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZEFsbCgpIHtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goZWxlbUZvcm0gPT4ge1xyXG4gICAgICAvLyBlbGVtRm9ybS5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAgICAgLy8gaWYgKGVsZW1Gb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgIC8vICAgdGhpcy52YWxpZEZvcm1Hcm91cChlbGVtRm9ybSk7XHJcbiAgICAgIC8vIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGVsZW1Gb3JtLmZvcm0udmFsaWQgJiYgcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVucmVnaXN0ZXJWYWxpZEZvcm0oZm9ybSkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcHJpdmF0ZSB2YWxpZEZvcm1Hcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gIC8vICAgZm9ybUdyb3VwLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gIC8vICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gIC8vICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gIC8vICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgLy8gICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgLy8gICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBJbnB1dCwgSW5qZWN0LFxyXG4gIEFmdGVyQ29udGVudEluaXQsIEVsZW1lbnRSZWYsIEF0dHJpYnV0ZSwgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb250cm9sQ29udGFpbmVyLCBBYnN0cmFjdENvbnRyb2wsIEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSxcclxuICBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtR3JvdXBOYW1lLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nTW9kZWxHcm91cFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgVkFMSURfQ09NUE9ORU5UX05BTUUgPSAnbXByLWZvcm0tY29udHJvbC12YWxpZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogVkFMSURfQ09NUE9ORU5UX05BTUUsXHJcbiAgdGVtcGxhdGU6IGA8c3BhblxuICAgIGNsYXNzPVwiZXJyb3JcIlxuICAgIFtuZ0NsYXNzXT1cImVycm9yUHJvbXB0XCJcbiAgICBbaGlkZGVuXT1cIiFlcnJvck1zZ1wiXG4+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG4gICAgPHAgKm5nSWY9XCIhdGVtcGxhdGVcIj57e2Vycm9yTXNnfX08L3A+XG48L3NwYW4+XG5gLFxyXG4gIHN0eWxlczogW2Bwe3dpZHRoOjEwMCU7aGVpZ2h0OjE3cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojZTA2YTJmO2Zsb2F0OmxlZnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAvL8Olwo/CqsOmwpjCvsOnwqTCumZvcm1ncm91cMOmwpzCrMOowrrCq8OnwprChMOpwpTCmcOowq/Cr8OvwrzCjMOkwrjCjcOmwpjCvsOnwqTCumdyb3Vww6TCuMKLY29udHJvbMOnwprChMOpwpTCmcOowq/Cr1xyXG4gIEBJbnB1dCgpIG9ubHlHcm91cCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVycm9yUHJvbXB0O1xyXG5cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8vw6nCqsKMw6jCr8KBw6XCpMKxw6jCtMKlw6bCmMK+w6fCpMK6w6fCmsKEw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcblxyXG4gIHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICBwcml2YXRlIGNvbnRyb2xOYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEF0dHJpYnV0ZSgnY29udHJvbE5hbWUnKSBjb250cm9sTmFtZTogc3RyaW5nLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXHJcbiAgICBwcml2YXRlIGVyck1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdsb2JhbFZhbGlkU2VydjogR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhpcy5jb250cm9sTmFtZSA9IGNvbnRyb2xOYW1lLnJlcGxhY2UoLycvZywgJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyAgw6XChcK8w6XCrsK5bmdGcm9tXHJcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuYmluZENvbnRyb2xFcnJvck1zZygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kQ29udHJvbEVycm9yTXNnKCkge1xyXG4gICAgdGhpcy5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKCk7XHJcbiAgICBpZiAoIXRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgZmluZCBjb250cm9sTmFtZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgbGV0IHBhdGggPSAnJztcclxuICAgIGNvbnN0IGlzRm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKVxyXG4gICAgICAmJiAodGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSkgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCk7XHJcbiAgICBpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuICAgICAgLy8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9ubHlHcm91cCkge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT50aGlzLmZvcm1Db250cm9sLCBwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIC8vQ2FsbGVkIG9uY2UsIGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxyXG4gICAgLy9BZGQgJ2ltcGxlbWVudHMgT25EZXN0cm95JyB0byB0aGUgY2xhc3MuXHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi51bnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/Clmdyb3Vww6TCuMKLw6nCncKiw6fCmsKEw6bCicKAw6bCnMKJw6nCqsKMw6jCr8KBw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIGNvbnRyb2wgXHJcbiAgICogQHBhcmFtIHBhdGggXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRHcm91cENvbnRyb2xWYWxpZE1zZyhjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1zZztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scykge1xyXG4gICAgICBtc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lKTtcclxuICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcbiAgICBsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG4gICAgd2hpbGUgKCFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJylcclxuICAgICAgJiYgIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJylcclxuICAgICAgJiYgIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICduZ2Zvcm0nKSkge1xyXG4gICAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNsaWJpbmdGb3JtQ29udHJsRWxlbShzZWFyY2hFbGVtOiBFbGVtZW50KSB7XHJcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nOiBFbGVtZW50ID0gc2VhcmNoRWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgd2hpbGUgKHByZXZpb3VzU2libGluZyAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcclxuICAgICAgLy8gaWYocHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcImZvcm1Hcm91cE5hbWVcIikgfHwgcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcIltmb3JtR3JvdXBdXCIpKXtcclxuICAgICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJoYXZlIHNlYXJjaCB0byByb290XCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtcHItZm9ybS1jb250cm9sLXZhbGlkIG11c3QgaGF2ZSBhIGZvcm1jb250cm9sIHNpYmlsaW5nJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCh8Kqw6XCisKow6bCn8Klw6bCicK+w6XCvcKTw6XCicKNw6nCqsKMw6jCr8KBw6XCr8K5w6XCusKUw6fCmsKEZm9ybUNvbnRyb2xOYW1lw6bCiMKWw6jCgMKFZm9ybUdyb3VwTmFtZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybUNvbnRyb2xOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICAvLyDDpsKJwovDpcKKwqjDqMKuwr7DpcKuwprDpMK6woZjb250cm9sTmFtZVxyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbE5hbWU7XHJcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25seSBvbmUgW2Zvcm1Db250cm9sXSBub3Qgc3VwcG9ydCwgVGhlcmUgbXVzdCBiZSBhIGZvcm1Hcm91cE5hbWUgb3IgW2Zvcm1Hcm91cF0nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldFBhcmVudEdyb3VwRUxlbSgpO1xyXG4gICAgICBjb25zdCBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChWQUxJRF9DT01QT05FTlRfTkFNRSkubGVuZ3RoO1xyXG4gICAgICB0aGlzLmdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGg7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cERpcmVjdGl2ZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCm8K0w6bCjsKlw6bCmMKvw6bCoMK5w6jCisKCw6fCgsK5w6XCr8K5w6XCusKUw6bClcK0w6TCuMKqZnJvbSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZm9ybcOowqHCqMOlwo3ClcOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWTDr8K8wozDpcKIwpnDpMK7wqXDpcK9wpPDpcKJwo1mb3JtR3JvdXDDpcKvwrnDpcK6wpTDp8KawoTDpcKPwpjDqcKHwo/DpcKQwo3DpMK4wrpjb250cm9sTmFtZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IHNob3VsZCBzZXQgY29udHJvbE5hbWUgYnkgeW91cnNlbGYnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cE5hbWUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKSB8fCBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZnJvbUdyb3VwTmFtZScpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgTmdNb2RlbEdyb3VwICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHRoaXMuY29udGFpbmVyLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbXByLWZvcm0tY29udHJvbC12YWxpZCDDpcKvwrnDpcK6wpTDpMK4woDDpMK4wqogZm9ybUNvbnRyb2xOYW1lXHJcbiAgICAgICAgLy8gw6XCkMKRw6XCicKNw6bCn8Klw6bCicK+w6XChcKEw6XCvMKfw6jCisKCw6fCgsK5XHJcbiAgICAgICAgY29uc3Qgc2libGluZ0VsZW0gPSB0aGlzLmdldFNsaWJpbmdGb3JtQ29udHJsRWxlbSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/ClsOlwr3Ck8OlwonCjWZvcm1Db250cm9sw6fCm8K4w6XCr8K5w6TCusKOZm9ybUdyb3Vww6fCmsKEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbCBcclxuICAgKiBAcGFyYW0gcm9vdCBcclxuICAgKiBAcGFyYW0gY29udHJvbE5hbWUgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICBpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuICAgICAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuICAgICAgICByZXR1cm4gY3RybE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuICAgICAgICBpZiAodG1wUGF0aCkge1xyXG4gICAgICAgICAgcGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuICAgICAgICAgIHBhdGgucHVzaCh0bXBQYXRoKTtcclxuICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaXNsaUZvcm1WYWxpZE1zZ10nLFxyXG4gIHByb3ZpZGVyczogW0Zvcm1WYWxpZE1zZ1NlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoJ2lzbGlGb3JtVmFsaWRNc2cnKSBzZXQgdmFsaWRNc2cobXNnKSB7XHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHRoaXMubXNnU2Vydi5yZXNldE1zZyhtc2cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTQk4ge1xuICBpc2JuMTogc3RyaW5nO1xuICBpc2JuMjogc3RyaW5nO1xuICBpc2JuMzogc3RyaW5nO1xuICBpc2JuNDogc3RyaW5nO1xuICBpc2JuNTogc3RyaW5nO1xufVxuXG5jb25zdCBJU0JOX1ZBTElEVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuVmFsaWR0b3JEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wcklzYm5WYWxpZF0nLFxuICBwcm92aWRlcnM6IFtJU0JOX1ZBTElEVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibicsICfDqMKvwrfDqMK+wpPDpcKFwqXDpsKtwqPDp8Khwq7Dp8KawoRJU0JOw6XCj8K3Jyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xuICAgIH1cbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcbiAgICAvLyDDpMK4wo3DqcKqwozDqMKvwoHDqcKdwp7Dp8KpwrpcbiAgICBpZiAoIWlzYm4uaXNibjEgfHwgIWlzYm4uaXNibjIgfHwgIWlzYm4uaXNibjMgfHwgIWlzYm4uaXNibjQgfHwgIWlzYm4uaXNibjUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbGlkSVNCTkNvZGUoW2lzYm4uaXNibjEsIGlzYm4uaXNibjIsIGlzYm4uaXNibjMsIGlzYm4uaXNibjQsIGlzYm4uaXNibjVdLmpvaW4oJycpKSkge1xuICAgICAgcmV0dXJuIHsgaXNibjogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRJU0JOQ29kZShzKSB7XG4gICAgaWYgKHMgPT09ICc5OTk5OTk5OTk5OTk5Jykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0JhckNvZGUocykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGEgPSAwLCBiID0gMCwgYyA9IDAsIGQgPSAwLCBlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpKyspIHtcbiAgICAgIGNvbnN0IHNjID0gcGFyc2VJbnQoc1tpIC0gMV0sIDEwKTtcbiAgICAgIGlmIChpIDw9IDEyICYmIGkgJSAyID09PSAwKSB7XG4gICAgICAgIGEgKz0gc2M7XG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMTEgJiYgaSAlIDIgPT09IDEpIHtcbiAgICAgICAgYiArPSBzYztcbiAgICAgIH1cbiAgICB9XG4gICAgYyA9IGEgKiAzO1xuICAgIGQgPSBiICsgYztcbiAgICBpZiAoZCAlIDEwID09PSAwKSB7XG4gICAgICBlID0gZCAtIGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUgPSBkICsgKDEwIC0gZCAlIDEwKSAtIGQ7XG4gICAgfVxuICAgIHJldHVybiBlID09PSBwYXJzZUludChzWzEyXSwgMTApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0JhckNvZGUocyk6IGJvb2xlYW4ge1xuICAgIGlmIChzLmxlbmd0aCAhPT0gMTMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgvXlswLTldezEyfSQvKTtcbiAgICByZXR1cm4gcmVnLmV4ZWMocy5zdWJzdHJpbmcoMCwgMTIpKSAhPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJU0JOIH0gZnJvbSAnLi9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5jb25zdCBJU0JOX1BBUlRfVkFMSURUT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wcklzYm5QYXJ0VmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9QQVJUX1ZBTElEVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5QYXJ0MzQnLCAnw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3ClycpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcbiAgICB9XG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XG4gICAgaWYgKCFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gw6nCqsKMw6jCr8KBw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3Cl1xuICAgIGlmIChpc2JuLmlzYm4zLmxlbmd0aCArIGlzYm4uaXNibjQubGVuZ3RoICE9PSA4KSB7XG4gICAgICByZXR1cm4geyBpc2JuUGFydDM0OiB0cnVlIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XG5cbmNvbnN0IElTQk5fSEVBREVSX1ZBTElEVE9SID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wcklzYm5IZWFkZXJWYWxpZF0nLFxuICBwcm92aWRlcnM6IFtJU0JOX0hFQURFUl9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5IZWFkZXInLCAnw6fCrMKsw6TCuMKAw6fCu8KEw6XCv8KFw6nCocK7w6TCuMK6OTc4w6bCiMKWOTc5Jyk7XG4gIH1cblxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoIWMudmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoWyc5OTknLCAnOTc4JywgJzk3OScsICcwMDAnXS5pbmRleE9mKGMudmFsdWUpIDwgMCkge1xuICAgICAgcmV0dXJuIHsgaXNibkhlYWRlcjogdHJ1ZX07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBGTE9BVF9WQUxJRFRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGbG9hdFZhbGlkdG9yKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21wckZsb2F0T25seV0nLFxyXG4gICAgcHJvdmlkZXJzOiBbRkxPQVRfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbG9hdFZhbGlkdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnZmxvYXQnLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCtcKuw6fCgsK5w6bClcKwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IGZsb2F0VmFsID0gcGFyc2VGbG9hdCgnJyArIGMudmFsdWUpO1xyXG4gICAgICAgIGlmIChpc05hTihmbG9hdFZhbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZmxvYXQ6IHRydWUgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFBSSUNFX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFByaWNlVmFsaWR0b3IpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbXByUHJpY2VWYWxpZF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbUFJJQ0VfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcmljZVZhbGlkdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ3ByaWNlJywgJ8OkwrvCt8OmwqDCvMOkwrjCusOkwrjCpMOkwr3CjcOlwrDCj8OmwpXCsCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICBjb25zdCBwcmljZSA9ICcnICsgYy52YWx1ZTtcclxuICAgICAgICBpZiAoL15cXGQrKC5cXGR7MCwyfSk/JC8udGVzdChwcmljZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHByaWNlOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEVNQUlMX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEVtYWlsVmFsaWR0b3IpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbXByRW1haWxWYWxpZF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbRU1BSUxfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2VtYWlsRXJyb3InLCAnw6jCr8K3w6jCvsKTw6XChcKlw6XCkMKIw6bCs8KVw6fCmsKEw6nCgsKuw6fCrsKxJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGUoY29udG9ybDogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWwgPSBjb250b3JsLnZhbHVlO1xyXG4gICAgICAgIGlmICghZW1haWwpIHsgLy8gw6XChcKBw6jCrsK4w6TCuMK6w6fCqcK6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9eW2EtekEtWjAtOV8tXStAW2EtekEtWjAtOV8tXSsoXFwuW2EtekEtWjAtOV8tXSspKyQvZy50ZXN0KGVtYWlsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBlbWFpbEVycm9yOiB0cnVlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IElzYm5WYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLWhlYWRlci12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBFbWFpbFZhbGlkdG9yLCBGbG9hdFZhbGlkdG9yLCBQcmljZVZhbGlkdG9yIH0gZnJvbSAnLi92YWxpZHRvcnMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBFbWFpbFZhbGlkdG9yLFxyXG4gICAgRmxvYXRWYWxpZHRvcixcclxuICAgIFByaWNlVmFsaWR0b3JcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRW1haWxWYWxpZHRvcixcclxuICAgIEZsb2F0VmFsaWR0b3IsXHJcbiAgICBQcmljZVZhbGlkdG9yXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIEZvcm1WYWxpZE1zZ1NlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRm9ybUNvbnRyb2wiLCJGb3JtR3JvdXBEaXJlY3RpdmUiLCJGb3JtR3JvdXBOYW1lIiwiTmdNb2RlbEdyb3VwIiwiRm9ybUdyb3VwIiwiQ29tcG9uZW50IiwiQXR0cmlidXRlIiwiQ29udHJvbENvbnRhaW5lciIsIk9wdGlvbmFsIiwiRWxlbWVudFJlZiIsIklucHV0IiwiQ29udGVudENoaWxkIiwiVGVtcGxhdGVSZWYiLCJEaXJlY3RpdmUiLCJOR19WQUxJREFUT1JTIiwiZm9yd2FyZFJlZiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR0E7O1FBQUE7UUFHRTs0QkFEbUIsSUFBSSxHQUFHLEVBQWtCO1NBQzNCOzs7Ozs7O1FBT1YsMkNBQVc7Ozs7OztzQkFBQyxNQUFjLEVBQUUsUUFBZ0I7Z0JBQ2pELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7UUFHL0Isc0NBQU07Ozs7c0JBQUMsTUFBYztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztvQ0F4QnJDO1FBMEJDLENBQUE7SUFHTSxxQkFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7Ozs7OztBQzdCOUQ7UUFRRTs0QkFEbUIsRUFBRTtTQUNKOzs7Ozs7UUFFVix5Q0FBVzs7Ozs7c0JBQUMsTUFBYyxFQUFFLFFBQWdCO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7Ozs7Ozs7UUFHNUIseUNBQVc7Ozs7O3NCQUFD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