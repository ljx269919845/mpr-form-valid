import { Injectable, Component, ContentChild, TemplateRef, Input, ElementRef, Attribute, Optional, Directive, forwardRef, NgModule } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupName, FormGroupDirective, NgModelGroup, NG_VALIDATORS, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
var GlobalValidService = /** @class */ (function () {
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
            && (this.container.control.get(this.controlName) instanceof FormControl);
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
        if (control instanceof FormControl) {
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
                    ],
                    exports: [
                        FormControlValidComponent,
                        FormValidMsgDirective,
                        IsbnValidtorDirective,
                        IsbnPartValidDirective,
                        IsbnHeaderValidDirective,
                        ReactiveFormsModule,
                        FormsModule,
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

export { FormValidModule, GlobalValidService, globalValidMsgServ, FormValidMsgService, FormControlValidComponent, FloatOnlyValidtorDirective, IsbnHeaderValidDirective, IsbnPartValidDirective, IsbnValidtorDirective, FormValidMsgDirective as ɵb, GlobalValidMsgService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS12YWxpZC5tb2R1bGUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL3B1YmxpY19hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIMOlwoXCqMOlwrHCgMOpwqrCjMOowq/CgcOmwrbCiMOmwoHCr8OvwrzCjCDDpcKtwpjDpcKCwqjDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0gbmV3IE1hcDxTdHJpbmcsIFN0cmluZz4oKTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKuwr7Dp8K9wq7DqcKUwpnDqMKvwq9rZXnDp8KawoTDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gbXNnS2V5IMOpwpTCmcOowq/Cr2tleVxyXG4gICAqIEBwYXJhbSBtc2dWYWx1ZSDDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnS2V5IHx8ICFtc2dWYWx1ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21zZyBrZXkgYW5kIHZhbHVlIG11c3Qgbm90IGVtcHR5Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnLnNldChtc2dLZXksIG1zZ1ZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNc2cobXNnS2V5OiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnS2V5KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRNc2cuZ2V0KG1zZ0tleSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbFZhbGlkTXNnU2VydiA9IG5ldyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2UoKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgc2V0VmFsaWRNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZ1ttc2dLZXldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgbGV0IG1pbldlaWdodCA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBsZXQgZXJyb3JNc2cgPSAnJztcclxuICAgIGxldCB0bXBNc2c7XHJcbiAgICBsZXQgdG1wV2VpZ2h0O1xyXG5cclxuICAgIGlmICghZXJyb3IgfHwgIW1zZ1BhdGgpIHtcclxuICAgICAgcmV0dXJuIHtlcnJvck1zZywgbWluV2VpZ2h0fTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGVycm9yKSB7XHJcbiAgICAgIHRtcE1zZyA9IHRoaXMudmFsaWRNc2dbbXNnUGF0aCArICcuJyArIG5hbWVdIHx8IGdsb2JhbFZhbGlkTXNnU2Vydi5nZXRNc2cobmFtZSk7XHJcbiAgICAgIGlmKCF0bXBNc2cpe1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKE51bWJlci5pc05hTihOdW1iZXIoZXJyb3JbbmFtZV0pKSl7XHJcbiAgICAgICAgdG1wV2VpZ2h0ID0gMTAwMDtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdG1wV2VpZ2h0ID0gTnVtYmVyKGVycm9yW25hbWVdKTtcclxuICAgICAgfVxyXG4gICAgICBpZih0bXBXZWlnaHQgPCBtaW5XZWlnaHQpe1xyXG4gICAgICAgIG1pbldlaWdodCA9IHRtcFdlaWdodDtcclxuICAgICAgICBlcnJvck1zZyA9IHRtcE1zZztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtlcnJvck1zZywgbWluV2VpZ2h0fTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE1zZyhtc2c6IE9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBtc2cgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdmb3JtIHZhbGlkIG1zZyBtdXN0IGJlIGEgb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICAvL3RoaXMudmFsaWRNc2cgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRoaXMudmFsaWRNc2dbbmFtZV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBuYW1lLCB0aGlzLnZhbGlkTXNnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRNc2cobXNnOiBPYmplY3QsIHBhdGg6IHN0cmluZywgcmVzdWx0OiBPYmplY3QpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmVzdWx0W3BhdGggKyAnLicgKyBuYW1lXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIHBhdGggKyAnLicgKyBuYW1lLCByZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZEZvcm1zOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlclZhbGlkRm9ybShmb3JtOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uZm9ybSA9PSBmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50ICs9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMucHVzaCh7IGZvcm06IGZvcm0sIGNvdW50OiAxIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkQWxsKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcbiAgICB0aGlzLnZhbGlkRm9ybXMuZm9yRWFjaChlbGVtRm9ybSA9PiB7XHJcbiAgICAgIC8vIGVsZW1Gb3JtLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gICAgICAvLyBpZiAoZWxlbUZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgLy8gICB0aGlzLnZhbGlkRm9ybUdyb3VwKGVsZW1Gb3JtKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBlbGVtRm9ybS5mb3JtLnBhdGNoVmFsdWUoZWxlbUZvcm0uZm9ybS52YWx1ZSwgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLCBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICAgICAgcmVzdWx0ID0gZWxlbUZvcm0uZm9ybS52YWxpZCAmJiByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5yZWdpc3RlclZhbGlkRm9ybShmb3JtKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsaWRGb3Jtcy5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCA+IDEpIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCAtPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBwcml2YXRlIHZhbGlkRm9ybUdyb3VwKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XHJcbiAgLy8gICBmb3JtR3JvdXAubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgLy8gICBjb25zdCBmb3JtQ29udHJvbHMgPSBmb3JtR3JvdXAuY29udHJvbHM7XHJcbiAgLy8gICBmb3IgKGNvbnN0IG5hbWUgaW4gZm9ybUNvbnRyb2xzKSB7XHJcbiAgLy8gICAgIGlmIChmb3JtQ29udHJvbHNbbmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAvLyAgICAgICB0aGlzLnZhbGlkRm9ybUdyb3VwKDxGb3JtR3JvdXA+Zm9ybUNvbnRyb2xzW25hbWVdKTtcclxuICAvLyAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICBmb3JtQ29udHJvbHNbbmFtZV0ubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIElucHV0LCBJbmplY3QsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgQXR0cmlidXRlLCBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xDb250YWluZXIsIEFic3RyYWN0Q29udHJvbCwgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG4gIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1Hcm91cE5hbWUsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdNb2RlbEdyb3VwXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcblxyXG5jb25zdCBWQUxJRF9DT01QT05FTlRfTkFNRSA9ICdtcHItZm9ybS1jb250cm9sLXZhbGlkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBWQUxJRF9DT01QT05FTlRfTkFNRSxcclxuICB0ZW1wbGF0ZTogYDxzcGFuXHJcbiAgICBjbGFzcz1cImVycm9yXCJcclxuICAgIFtuZ0NsYXNzXT1cImVycm9yUHJvbXB0XCJcclxuICAgIFtoaWRkZW5dPVwiIWVycm9yTXNnXCJcclxuPlxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXHJcbiAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICA8cCAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7ZXJyb3JNc2d9fTwvcD5cclxuPC9zcGFuPlxyXG5gLFxyXG4gIHN0eWxlczogW2Bwe3dpZHRoOjEwMCU7aGVpZ2h0OjE3cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojZTA2YTJmO2Zsb2F0OmxlZnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAvL8Olwo/CqsOmwpjCvsOnwqTCumZvcm1ncm91cMOmwpzCrMOowrrCq8OnwprChMOpwpTCmcOowq/Cr8OvwrzCjMOkwrjCjcOmwpjCvsOnwqTCumdyb3Vww6TCuMKLY29udHJvbMOnwprChMOpwpTCmcOowq/Cr1xyXG4gIEBJbnB1dCgpIG9ubHlHcm91cCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVycm9yUHJvbXB0O1xyXG5cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8vw6nCqsKMw6jCr8KBw6XCpMKxw6jCtMKlw6bCmMK+w6fCpMK6w6fCmsKEw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcblxyXG4gIHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICBwcml2YXRlIGNvbnRyb2xOYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEF0dHJpYnV0ZSgnY29udHJvbE5hbWUnKSBjb250cm9sTmFtZTogc3RyaW5nLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXHJcbiAgICBwcml2YXRlIGVyck1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdsb2JhbFZhbGlkU2VydjogR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhpcy5jb250cm9sTmFtZSA9IGNvbnRyb2xOYW1lLnJlcGxhY2UoLycvZywgJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyAgw6XChcK8w6XCrsK5bmdGcm9tXHJcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuYmluZENvbnRyb2xFcnJvck1zZygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kQ29udHJvbEVycm9yTXNnKCkge1xyXG4gICAgdGhpcy5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKCk7XHJcbiAgICBpZiAoIXRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgZmluZCBjb250cm9sTmFtZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgbGV0IHBhdGggPSAnJztcclxuICAgIGNvbnN0IGlzRm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKVxyXG4gICAgICAmJiAodGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSkgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCk7XHJcbiAgICBpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuICAgICAgLy8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9ubHlHcm91cCkge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKVsnZXJyb3JNc2cnXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT50aGlzLmZvcm1Db250cm9sLCBwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIFxyXG4gICAgICAgICAgICB7bWluV2VpZ2h0OiBOdW1iZXIuTUFYX1ZBTFVFLCBlcnJvck1zZzogJyd9KVsnZXJyb3JNc2cnXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKVsnZXJyb3JNc2cnXTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpZncm91cMOkwrjCi8Opwp3CosOnwprChMOmwonCgMOmwpzCicOpwqrCjMOowq/CgcOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBjb250cm9sIFxyXG4gICAqIEBwYXJhbSBwYXRoIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGg6IHN0cmluZywgZXJyb3JJbmZvKSB7XHJcbiAgICBcclxuICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9XHJcbiAgICBsZXQgdG1wRXJyb3JJbmZvO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUsIGVycm9ySW5mbyk7XHJcbiAgICAgIGlmKHRtcEVycm9ySW5mb1snbWluV2VpZ2h0J10gPCBlcnJvckluZm9bJ21pbldlaWdodCddKXtcclxuICAgICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICBpZih0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSl7XHJcbiAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvckluZm87XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhcmVudEdyb3VwRUxlbSgpOiBFbGVtZW50IHtcclxuICAgIGxldCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIC8vIGNvbnN0IGFycnRyaWJ1dGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKSk7XHJcbiAgICB3aGlsZSAoIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJylcclxuICAgICAgJiYgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtR3JvdXBOYW1lJylcclxuICAgICAgJiYgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKVxyXG4gICAgICAmJiAhKHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ2Zvcm0nKVxyXG4gICAgICAmJiAhKHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ25nZm9ybScpKSB7XHJcbiAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBmaW5kIHBhcmVudEVsZW1lbnRcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHNlYXJjaEVsZW06IEVsZW1lbnQpIHtcclxuICAgIGxldCBwcmV2aW91c1NpYmxpbmc6IEVsZW1lbnQgPSBzZWFyY2hFbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB3aGlsZSAocHJldmlvdXNTaWJsaW5nICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkge1xyXG4gICAgICAvLyBpZihwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiZm9ybUdyb3VwTmFtZVwiKSB8fCBwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiW2Zvcm1Hcm91cF1cIikpe1xyXG4gICAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcImhhdmUgc2VhcmNoIHRvIHJvb3RcIik7XHJcbiAgICAgIC8vIH1cclxuICAgICAgcHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgICBpZiAoIXByZXZpb3VzU2libGluZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQgbXVzdCBoYXZlIGEgZm9ybWNvbnRyb2wgc2liaWxpbmcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKHwqrDpcKKwqjDpsKfwqXDpsKJwr7DpcK9wpPDpcKJwo3DqcKqwozDqMKvwoHDpcKvwrnDpcK6wpTDp8KawoRmb3JtQ29udHJvbE5hbWXDpsKIwpbDqMKAwoVmb3JtR3JvdXBOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRGb3JtQ29udHJvbE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIC8vIMOmwonCi8OlworCqMOowq7CvsOlwq7CmsOkwrrChmNvbnRyb2xOYW1lXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sTmFtZTtcclxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IG9uZSBbZm9ybUNvbnRyb2xdIG5vdCBzdXBwb3J0LCBUaGVyZSBtdXN0IGJlIGEgZm9ybUdyb3VwTmFtZSBvciBbZm9ybUdyb3VwXScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50R3JvdXBFTGVtKCk7XHJcbiAgICAgIGNvbnN0IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFZBTElEX0NPTVBPTkVOVF9OQU1FKS5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBncm91cFZhbGlkQ29udHJvbExlbmd0aDtcclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwRGlyZWN0aXZlICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KbwrTDpsKOwqXDpsKYwq/DpsKgwrnDqMKKwoLDp8KCwrnDpcKvwrnDpcK6wpTDpsKVwrTDpMK4wqpmcm9tIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCJcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpmb3Jtw6jCocKow6XCjcKVw6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZMOvwrzCjMOlwojCmcOkwrvCpcOlwr3Ck8OlwonCjWZvcm1Hcm91cMOlwq/CucOlwrrClMOnwprChMOlwo/CmMOpwofCj8OlwpDCjcOkwrjCumNvbnRyb2xOYW1lXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHNldCBjb250cm9sTmFtZSBieSB5b3Vyc2VsZicpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwTmFtZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpIHx8IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmcm9tR3JvdXBOYW1lJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXAgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gdGhpcy5jb250YWluZXIubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtcHItZm9ybS1jb250cm9sLXZhbGlkIMOlwq/CucOlwrrClMOkwrjCgMOkwrjCqiBmb3JtQ29udHJvbE5hbWVcclxuICAgICAgICAvLyDDpcKQwpHDpcKJwo3DpsKfwqXDpsKJwr7DpcKFwoTDpcK8wp/DqMKKwoLDp8KCwrlcclxuICAgICAgICBjb25zdCBzaWJsaW5nRWxlbSA9IHRoaXMuZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBjb250cm9sTmFtZSA9IHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpZih0aGlzLmNvbnRyb2xOYW1lICYmIHRoaXMuY29udHJvbE5hbWUgIT0gY29udHJvbE5hbWUpe1xyXG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYHlvdSBtYXkgc2V0IGEgZXJyb3IgY29udHJvbE5hbWUsIHlvdSBzZXQgaXM6ICR7dGhpcy5jb250cm9sTmFtZX0sIGJ1dCBuZWVkIGlzOiAke2NvbnRyb2xOYW1lfWApO1xyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCjsK3w6XCj8KWw6XCvcKTw6XCicKNZm9ybUNvbnRyb2zDp8KbwrjDpcKvwrnDpMK6wo5mb3JtR3JvdXDDp8KawoRwYXRoXHJcbiAgICogQHBhcmFtIGZvcm1Db250cm9sIFxyXG4gICAqIEBwYXJhbSByb290IFxyXG4gICAqIEBwYXJhbSBjb250cm9sTmFtZSBcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhdGgoZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcm9vdCwgY29udHJvbE5hbWUpIHtcclxuICAgIGlmICghKHJvb3QgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbCA9PT0gcm9vdCkge1xyXG4gICAgICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGN0cmxOYW1lIGluIHJvb3RbJ2NvbnRyb2xzJ10pIHtcclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdID09PSBmb3JtQ29udHJvbCkge1xyXG4gICAgICAgIHJldHVybiBjdHJsTmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBjb25zdCB0bXBQYXRoID0gdGhpcy5nZXRQYXRoKGZvcm1Db250cm9sLCByb290Wydjb250cm9scyddW2N0cmxOYW1lXSwgY29udHJvbE5hbWUpO1xyXG4gICAgICAgIGlmICh0bXBQYXRoKSB7XHJcbiAgICAgICAgICBwYXRoLnB1c2goY3RybE5hbWUpO1xyXG4gICAgICAgICAgcGF0aC5wdXNoKHRtcFBhdGgpO1xyXG4gICAgICAgICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpc2xpRm9ybVZhbGlkTXNnXScsXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVZhbGlkTXNnU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgnaXNsaUZvcm1WYWxpZE1zZycpIHNldCB2YWxpZE1zZyhtc2cpIHtcclxuICAgIGlmIChtc2cpIHtcclxuICAgICAgdGhpcy5tc2dTZXJ2LnJlc2V0TXNnKG1zZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UpIHtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU0JOIHtcclxuICBpc2JuMTogc3RyaW5nO1xyXG4gIGlzYm4yOiBzdHJpbmc7XHJcbiAgaXNibjM6IHN0cmluZztcclxuICBpc2JuNDogc3RyaW5nO1xyXG4gIGlzYm41OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IElTQk5fVkFMSURUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuVmFsaWR0b3JEaXJlY3RpdmUpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuVmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXNiblZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm4nLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCrcKjw6fCocKuw6fCmsKESVNCTsOlwo/CtycpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcclxuICAgIC8vIMOkwrjCjcOpwqrCjMOowq/CgcOpwp3CnsOnwqnCulxyXG4gICAgaWYgKCFpc2JuLmlzYm4xIHx8ICFpc2JuLmlzYm4yIHx8ICFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40IHx8ICFpc2JuLmlzYm41KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkSVNCTkNvZGUoW2lzYm4uaXNibjEsIGlzYm4uaXNibjIsIGlzYm4uaXNibjMsIGlzYm4uaXNibjQsIGlzYm4uaXNibjVdLmpvaW4oJycpKSkge1xyXG4gICAgICByZXR1cm4geyBpc2JuOiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRJU0JOQ29kZShzKSB7XHJcbiAgICBpZiAocyA9PT0gJzk5OTk5OTk5OTk5OTknKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmlzQmFyQ29kZShzKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgYSA9IDAsIGIgPSAwLCBjID0gMCwgZCA9IDAsIGU7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHNjID0gcGFyc2VJbnQoc1tpIC0gMV0sIDEwKTtcclxuICAgICAgaWYgKGkgPD0gMTIgJiYgaSAlIDIgPT09IDApIHtcclxuICAgICAgICBhICs9IHNjO1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMTEgJiYgaSAlIDIgPT09IDEpIHtcclxuICAgICAgICBiICs9IHNjO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjID0gYSAqIDM7XHJcbiAgICBkID0gYiArIGM7XHJcbiAgICBpZiAoZCAlIDEwID09PSAwKSB7XHJcbiAgICAgIGUgPSBkIC0gZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGUgPSBkICsgKDEwIC0gZCAlIDEwKSAtIGQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZSA9PT0gcGFyc2VJbnQoc1sxMl0sIDEwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNCYXJDb2RlKHMpOiBib29sZWFuIHtcclxuICAgIGlmIChzLmxlbmd0aCAhPT0gMTMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgvXlswLTldezEyfSQvKTtcclxuICAgIHJldHVybiByZWcuZXhlYyhzLnN1YnN0cmluZygwLCAxMikpICE9IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJU0JOIH0gZnJvbSAnLi9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBJU0JOX1BBUlRfVkFMSURUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuUGFydFZhbGlkRGlyZWN0aXZlKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXBySXNiblBhcnRWYWxpZF0nLFxyXG4gIHByb3ZpZGVyczogW0lTQk5fUEFSVF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNiblBhcnQzNCcsICfDp8KswqzDpMK4wonDp8K7woTDpcKSwozDp8KswqzDpcKbwpvDp8K7woTDpMK4woDDpcKFwrHDpMK4wro4w6TCvcKNw6bClcKww6XCrcKXJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xyXG4gICAgaWYgKCFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgLy8gw6nCqsKMw6jCr8KBw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3Cl1xyXG4gICAgaWYgKGlzYm4uaXNibjMubGVuZ3RoICsgaXNibi5pc2JuNC5sZW5ndGggIT09IDgpIHtcclxuICAgICAgcmV0dXJuIHsgaXNiblBhcnQzNDogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9IRUFERVJfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX0hFQURFUl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ8OnwqzCrMOkwrjCgMOnwrvChMOlwr/ChcOpwqHCu8OkwrjCujk3OMOmwojCljk3OScpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIWMudmFsdWUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoWyc5OTknLCAnOTc4JywgJzk3OScsICcwMDAnXS5pbmRleE9mKGMudmFsdWUpIDwgMCkge1xyXG4gICAgICByZXR1cm4geyBpc2JuSGVhZGVyOiB0cnVlfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEZMT0FUX1ZBTElEVE9SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJGbG9hdE9ubHlWYWxpZHRvcl0nLFxyXG4gIHByb3ZpZGVyczogW0ZMT0FUX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnZmxvYXQnLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCtcKuw6fCgsK5w6bClcKwJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBjb25zdCBmbG9hdFZhbCA9IHBhcnNlRmxvYXQoJycgKyBjLnZhbHVlKTtcclxuICAgIGlmIChpc05hTihmbG9hdFZhbCkpIHtcclxuICAgICAgcmV0dXJuIHsgZmxvYXQ6IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgRm9ybVZhbGlkTXNnU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1vZHVsZSB7IH1cclxuIiwiZXhwb3J0IHsgRm9ybVZhbGlkTW9kdWxlIH0gZnJvbSAnLi9saWIvZm9ybS12YWxpZC5tb2R1bGUnO1xyXG5leHBvcnQgeyBHbG9iYWxWYWxpZFNlcnZpY2UgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcbmV4cG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcbmV4cG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuZXhwb3J0IHsgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCB9IGZyb20gJy4vbGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuZXhwb3J0IHsgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlLCBJU0JOIH0gZnJvbSAnLi9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlJztcclxuLy9leHBvcnQgeyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBOzs7QUFBQTtJQUdFO3dCQURtQixJQUFJLEdBQUcsRUFBa0I7S0FDM0I7Ozs7Ozs7SUFPViwyQ0FBVzs7Ozs7O2NBQUMsTUFBYyxFQUFFLFFBQWdCO1FBQ2pELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7SUFHL0Isc0NBQU07Ozs7Y0FBQyxNQUFjO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Z0NBeEJyQztJQTBCQyxDQUFBO3FCQUdZLGtCQUFrQixHQUFHLElBQUkscUJBQXFCLEVBQUU7Ozs7OztBQzdCN0Q7SUFRRTt3QkFEbUIsRUFBRTtLQUNKOzs7Ozs7SUFFVix5Q0FBVzs7Ozs7Y0FBQyxNQUFjLEVBQUUsUUFBZ0I7UUFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O0lBRzVCLHlDQUFXOzs7OztjQUFDLE9BQWUsRUFBRSxLQUFLO1FBQ3ZDLHFCQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2pDLHFCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIscUJBQUksTUFBTSxDQUFDO1FBQ1gscUJBQUksU0FBUyxDQUFDO1FBRWQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN0QixPQUFPLEVBQUMs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