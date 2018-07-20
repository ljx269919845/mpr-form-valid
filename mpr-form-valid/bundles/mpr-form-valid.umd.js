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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2Zvcm0tdmFsaWQubW9kdWxlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9wdWJsaWNfYXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDDpcKFwqjDpcKxwoDDqcKqwozDqMKvwoHDpsK2wojDpsKBwq/Dr8K8wowgw6XCrcKYw6XCgsKow6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IG5ldyBNYXA8U3RyaW5nLCBTdHJpbmc+KCk7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCrsK+w6fCvcKuw6nClMKZw6jCr8Kva2V5w6fCmsKEw6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDDqcKUwpnDqMKvwq9rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUgw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LCBtc2dWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TXNnKG1zZ0tleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnZhbGlkTXNnLmdldChtc2dLZXkpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5XSA9IG1zZ1ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZhbGlkTXNnKG1zZ1BhdGg6IHN0cmluZywgZXJyb3IpIHtcclxuICAgIGlmICghZXJyb3IgfHwgIW1zZ1BhdGgpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvcltuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkTXNnW21zZ1BhdGggKyAnLicgKyBuYW1lXSB8fCBnbG9iYWxWYWxpZE1zZ1NlcnYuZ2V0TXNnKG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRNc2cobXNnOiBPYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgbXNnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcignZm9ybSB2YWxpZCBtc2cgbXVzdCBiZSBhIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIG5hbWUsIHRoaXMudmFsaWRNc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdE1zZyhtc2c6IE9iamVjdCwgcGF0aDogc3RyaW5nLCByZXN1bHQ6IE9iamVjdCkge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXN1bHRbcGF0aCArICcuJyArIG5hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZFNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5wdXNoKHsgZm9ybTogZm9ybSwgY291bnQ6IDEgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRBbGwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKGVsZW1Gb3JtID0+IHtcclxuICAgICAgLy8gZWxlbUZvcm0ubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgICAgIC8vIGlmIChlbGVtRm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAvLyAgIHRoaXMudmFsaWRGb3JtR3JvdXAoZWxlbUZvcm0pO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uZm9ybSA9PSBmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50ID4gMSkge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50IC09IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAvLyAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAvLyAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAvLyAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAvLyAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gIC8vICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gIC8vICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBBdHRyaWJ1dGUsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lciwgQWJzdHJhY3RDb250cm9sLCBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsXHJcbiAgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUdyb3VwTmFtZSwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cbiAgICBjbGFzcz1cImVycm9yXCJcbiAgICBbbmdDbGFzc109XCJlcnJvclByb21wdFwiXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxuPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXG4gICAgPjwvbmctY29udGFpbmVyPlxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxuPC9zcGFuPlxuYCxcclxuICBzdHlsZXM6IFtgcHt3aWR0aDoxMDAlO2hlaWdodDoxN3B4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6I2UwNmEyZjtmbG9hdDpsZWZ0fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgLy/DpcKPwqrDpsKYwr7Dp8Kkwrpmb3JtZ3JvdXDDpsKcwqzDqMK6wqvDp8KawoTDqcKUwpnDqMKvwq/Dr8K8wozDpMK4wo3DpsKYwr7Dp8Kkwrpncm91cMOkwrjCi2NvbnRyb2zDp8KawoTDqcKUwpnDqMKvwq9cclxuICBASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlcnJvclByb21wdDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBlcnJvck1zZzogc3RyaW5nOyAvL8OpwqrCjMOowq/CgcOlwqTCscOowrTCpcOmwpjCvsOnwqTCusOnwprChMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG5cclxuICBwcml2YXRlIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgcHJpdmF0ZSBjb250cm9sTmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gIMOlwoXCvMOlwq7CuW5nRnJvbVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuICAgIHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBjb25zdCBpc0Zvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSlcclxuICAgICAgJiYgKHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpO1xyXG4gICAgaWYgKCFpc0Zvcm1Db250cm9sKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpZncm91cMOkwrjCi8Opwp3CosOnwprChMOmwonCgMOmwpzCicOpwqrCjMOowq/CgcOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBjb250cm9sIFxyXG4gICAqIEBwYXJhbSBwYXRoIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICAgIH1cclxuICAgIGxldCBtc2c7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgbXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSk7XHJcbiAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyZW50R3JvdXBFTGVtKCk6IEVsZW1lbnQge1xyXG4gICAgbGV0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgLy8gY29uc3QgYXJydHJpYnV0ZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcygpO1xyXG4gICAgY29uc29sZS5sb2cocGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpKTtcclxuICAgIHdoaWxlICghcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1Hcm91cE5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpXHJcbiAgICAgICYmICEocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScpXHJcbiAgICAgICYmICEocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnbmdmb3JtJykpIHtcclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGZpbmQgcGFyZW50RWxlbWVudFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIHdoaWxlIChwcmV2aW91c1NpYmxpbmcgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XHJcbiAgICAgIC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIH1cclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowofCqsOlworCqMOmwp/CpcOmwonCvsOlwr3Ck8OlwonCjcOpwqrCjMOowq/CgcOlwq/CucOlwrrClMOnwprChGZvcm1Db250cm9sTmFtZcOmwojClsOowoDChWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgLy8gw6bCicKLw6XCisKow6jCrsK+w6XCrsKaw6TCusKGY29udHJvbE5hbWVcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xOYW1lO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuICAgICAgY29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuICAgICAgdGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwpvCtMOmwo7CpcOmwpjCr8OmwqDCucOoworCgsOnwoLCucOlwq/CucOlwrrClMOmwpXCtMOkwrjCqmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmZvcm3DqMKhwqjDpcKNwpXDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkw6/CvMKMw6XCiMKZw6TCu8Klw6XCvcKTw6XCicKNZm9ybUdyb3Vww6XCr8K5w6XCusKUw6fCmsKEw6XCj8KYw6nCh8KPw6XCkMKNw6TCuMK6Y29udHJvbE5hbWVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgfHwgcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zyb21Hcm91cE5hbWUnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSB0aGlzLmNvbnRhaW5lci5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1wci1mb3JtLWNvbnRyb2wtdmFsaWQgw6XCr8K5w6XCusKUw6TCuMKAw6TCuMKqIGZvcm1Db250cm9sTmFtZVxyXG4gICAgICAgIC8vIMOlwpDCkcOlwonCjcOmwp/CpcOmwonCvsOlwoXChMOlwrzCn8OoworCgsOnwoLCuVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmdFbGVtID0gdGhpcy5nZXRTbGliaW5nRm9ybUNvbnRybEVsZW0odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGlmKHRoaXMuY29udHJvbE5hbWUgJiYgdGhpcy5jb250cm9sTmFtZSAhPSBjb250cm9sTmFtZSl7XHJcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihgeW91IG1heSBzZXQgYSBlcnJvciBjb250cm9sTmFtZSwgeW91IHNldCBpczogJHt0aGlzLmNvbnRyb2xOYW1lfSwgYnV0IG5lZWQgaXM6ICR7Y29udHJvbE5hbWV9YCk7XHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpbDpcK9wpPDpcKJwo1mb3JtQ29udHJvbMOnwpvCuMOlwq/CucOkwrrCjmZvcm1Hcm91cMOnwprChHBhdGhcclxuICAgKiBAcGFyYW0gZm9ybUNvbnRyb2wgXHJcbiAgICogQHBhcmFtIHJvb3QgXHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UGF0aChmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sLCByb290LCBjb250cm9sTmFtZSkge1xyXG4gICAgaWYgKCEocm9vdCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgaWYgKGZvcm1Db250cm9sID09PSByb290KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGggPSBbXTtcclxuICAgIGZvciAoY29uc3QgY3RybE5hbWUgaW4gcm9vdFsnY29udHJvbHMnXSkge1xyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gPT09IGZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgcmV0dXJuIGN0cmxOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHRtcFBhdGggPSB0aGlzLmdldFBhdGgoZm9ybUNvbnRyb2wsIHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdLCBjb250cm9sTmFtZSk7XHJcbiAgICAgICAgaWYgKHRtcFBhdGgpIHtcclxuICAgICAgICAgIHBhdGgucHVzaChjdHJsTmFtZSk7XHJcbiAgICAgICAgICBwYXRoLnB1c2godG1wUGF0aCk7XHJcbiAgICAgICAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lzbGlGb3JtVmFsaWRNc2ddJyxcclxuICBwcm92aWRlcnM6IFtGb3JtVmFsaWRNc2dTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCdpc2xpRm9ybVZhbGlkTXNnJykgc2V0IHZhbGlkTXNnKG1zZykge1xyXG4gICAgaWYgKG1zZykge1xyXG4gICAgICB0aGlzLm1zZ1NlcnYucmVzZXRNc2cobXNnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU0JOIHtcbiAgaXNibjE6IHN0cmluZztcbiAgaXNibjI6IHN0cmluZztcbiAgaXNibjM6IHN0cmluZztcbiAgaXNibjQ6IHN0cmluZztcbiAgaXNibjU6IHN0cmluZztcbn1cblxuY29uc3QgSVNCTl9WQUxJRFRPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm4nLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCrcKjw6fCocKuw6fCmsKESVNCTsOlwo/CtycpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcbiAgICB9XG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XG4gICAgLy8gw6TCuMKNw6nCqsKMw6jCr8KBw6nCncKew6fCqcK6XG4gICAgaWYgKCFpc2JuLmlzYm4xIHx8ICFpc2JuLmlzYm4yIHx8ICFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40IHx8ICFpc2JuLmlzYm41KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcbiAgICAgIHJldHVybiB7IGlzYm46IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xuICAgIGlmIChzID09PSAnOTk5OTk5OTk5OTk5OScpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNCYXJDb2RlKHMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBhID0gMCwgYiA9IDAsIGMgPSAwLCBkID0gMCwgZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XG4gICAgICBpZiAoaSA8PSAxMiAmJiBpICUgMiA9PT0gMCkge1xuICAgICAgICBhICs9IHNjO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XG4gICAgICAgIGIgKz0gc2M7XG4gICAgICB9XG4gICAgfVxuICAgIGMgPSBhICogMztcbiAgICBkID0gYiArIGM7XG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xuICAgICAgZSA9IGQgLSBkO1xuICAgIH0gZWxzZSB7XG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xuICAgIH1cbiAgICByZXR1cm4gZSA9PT0gcGFyc2VJbnQoc1sxMl0sIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNCYXJDb2RlKHMpOiBib29sZWFuIHtcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XG4gICAgcmV0dXJuIHJlZy5leGVjKHMuc3Vic3RyaW5nKDAsIDEyKSkgIT0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSVNCTiB9IGZyb20gJy4vaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuY29uc3QgSVNCTl9QQVJUX1ZBTElEVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuUGFydFZhbGlkRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuUGFydFZhbGlkXScsXG4gIHByb3ZpZGVyczogW0lTQk5fUEFSVF9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuUGFydDM0JywgJ8OnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpcnKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XG4gICAgfVxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xuICAgIGlmICghaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIMOpwqrCjMOowq/CgcOnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpdcbiAgICBpZiAoaXNibi5pc2JuMy5sZW5ndGggKyBpc2JuLmlzYm40Lmxlbmd0aCAhPT0gOCkge1xuICAgICAgcmV0dXJuIHsgaXNiblBhcnQzNDogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5jb25zdCBJU0JOX0hFQURFUl9WQUxJRFRPUiA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9IRUFERVJfVkFMSURUT1JdXG59KVxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ8OnwqzCrMOkwrjCgMOnwrvChMOlwr/ChcOpwqHCu8OkwrjCujk3OMOmwojCljk3OScpO1xuICB9XG5cbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgaWYgKCFjLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKFsnOTk5JywgJzk3OCcsICc5NzknLCAnMDAwJ10uaW5kZXhPZihjLnZhbHVlKSA8IDApIHtcbiAgICAgIHJldHVybiB7IGlzYm5IZWFkZXI6IHRydWV9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5jb25zdCBGTE9BVF9WQUxJRFRPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wckZsb2F0T25seVZhbGlkdG9yXScsXG4gIHByb3ZpZGVyczogW0ZMT0FUX1ZBTElEVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdmbG9hdCcsICfDqMKvwrfDqMK+wpPDpcKFwqXDpsK1wq7Dp8KCwrnDpsKVwrAnKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBjb25zdCBmbG9hdFZhbCA9IHBhcnNlRmxvYXQoJycgKyBjLnZhbHVlKTtcbiAgICBpZiAoaXNOYU4oZmxvYXRWYWwpKSB7XG4gICAgICByZXR1cm4geyBmbG9hdDogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IElzYm5WYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLWhlYWRlci12YWxpZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIEZvcm1WYWxpZE1zZ1NlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNb2R1bGUgeyB9XHJcbiIsImV4cG9ydCB7IEZvcm1WYWxpZE1vZHVsZSB9IGZyb20gJy4vbGliL2Zvcm0tdmFsaWQubW9kdWxlJztcbmV4cG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcbmV4cG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XG5leHBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XG5leHBvcnQgeyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQnO1xuZXhwb3J0IHsgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlLCBJU0JOIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcbi8vZXhwb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9mb3JtLXZhbGlkLW1zZy5kaXJlY3RpdmUnO1xuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJGb3JtQ29udHJvbCIsIkZvcm1Hcm91cERpcmVjdGl2ZSIsIkZvcm1Hcm91cE5hbWUiLCJOZ01vZGVsR3JvdXAiLCJGb3JtR3JvdXAiLCJDb21wb25lbnQiLCJBdHRyaWJ1dGUiLCJDb250cm9sQ29udGFpbmVyIiwiT3B0aW9uYWwiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIkRpcmVjdGl2ZSIsIk5HX1ZBTElEQVRPUlMiLCJmb3J3YXJkUmVmIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQTs7UUFBQTtRQUdFOzRCQURtQixJQUFJLEdBQUcsRUFBa0I7U0FDM0I7Ozs7Ozs7UUFPViwyQ0FBVzs7Ozs7O3NCQUFDLE1BQWMsRUFBRSxRQUFnQjtnQkFDakQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Ozs7OztRQUcvQixzQ0FBTTs7OztzQkFBQyxNQUFjO2dCQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNYLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O29DQXhCckM7UUEwQkMsQ0FBQTt5QkFHWSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFxQixFQUFFOzs7Ozs7QUM3QjdEO1FBUUU7NEJBRG1CLEVBQUU7U0FDSjs7Ozs7O1FBRVYseUNBQVc7Ozs7O3NCQUFDLE1BQWMsRUFBRSxRQUFnQjtnQkFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDYixPQUFPO2lCQUNSO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O1FBRzVCLHlDQUFXOzs7OztzQkFBQyxPQUFlLEVBQUUsS0FBSztnQkFDdkMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDdEIsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0QsS0FBSyxxQkFBTSxNQUFJLElBQUksS0FBSyxFQUFFO29CQUN4QixJQUFJLEtBQUssQ0FB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