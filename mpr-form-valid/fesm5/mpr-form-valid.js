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
        if (control instanceof FormControl) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXByLWZvcm0tdmFsaWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC50cyIsIm5nOi8vbXByLWZvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2lzYm4tcGFydC12YWxpZC5kaXJlY3RpdmUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL2Zsb2F0LW9ubHktdmFsaWR0b3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tcHItZm9ybS12YWxpZC9saWIvZm9ybS12YWxpZC5tb2R1bGUudHMiLCJuZzovL21wci1mb3JtLXZhbGlkL3B1YmxpY19hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIMOlwoXCqMOlwrHCgMOpwqrCjMOowq/CgcOmwrbCiMOmwoHCr8OvwrzCjCDDpcKtwpjDpcKCwqjDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0gbmV3IE1hcDxTdHJpbmcsIFN0cmluZz4oKTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKuwr7Dp8K9wq7DqcKUwpnDqMKvwq9rZXnDp8KawoTDqcK7wpjDqMKuwqTDpsK2wojDpsKBwq9cclxuICAgKiBAcGFyYW0gbXNnS2V5IMOpwpTCmcOowq/Cr2tleVxyXG4gICAqIEBwYXJhbSBtc2dWYWx1ZSDDqcKUwpnDqMKvwq/DpsK2wojDpsKBwq9cclxuICAgKi9cclxuICBwdWJsaWMgcmVnaXN0ZXJNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnS2V5IHx8ICFtc2dWYWx1ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21zZyBrZXkgYW5kIHZhbHVlIG11c3Qgbm90IGVtcHR5Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnLnNldChtc2dLZXksIG1zZ1ZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNc2cobXNnS2V5OiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnS2V5KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRNc2cuZ2V0KG1zZ0tleSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbFZhbGlkTXNnU2VydiA9IG5ldyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2UoKTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgc2V0VmFsaWRNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZ1ttc2dLZXldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yW25hbWVdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRNc2dbbXNnUGF0aCArICcuJyArIG5hbWVdIHx8IGdsb2JhbFZhbGlkTXNnU2Vydi5nZXRNc2cobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE1zZyhtc2c6IE9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBtc2cgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdmb3JtIHZhbGlkIG1zZyBtdXN0IGJlIGEgb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnZhbGlkTXNnW25hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZSwgdGhpcy52YWxpZE1zZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0TXNnKG1zZzogT2JqZWN0LCBwYXRoOiBzdHJpbmcsIHJlc3VsdDogT2JqZWN0KSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJlc3VsdFtwYXRoICsgJy4nICsgbmFtZV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBwYXRoICsgJy4nICsgbmFtZSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdsb2JhbFZhbGlkU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRGb3JtczogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJWYWxpZEZvcm0oZm9ybTogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsaWRGb3Jtcy5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmZvcm0gPT0gZm9ybTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zW2luZGV4XS5jb3VudCArPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEZvcm1zLnB1c2goeyBmb3JtOiBmb3JtLCBjb3VudDogMSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZEFsbCgpIHtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy52YWxpZEZvcm1zLmZvckVhY2goZWxlbUZvcm0gPT4ge1xyXG4gICAgICAvLyBlbGVtRm9ybS5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAgICAgLy8gaWYgKGVsZW1Gb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgIC8vICAgdGhpcy52YWxpZEZvcm1Hcm91cChlbGVtRm9ybSk7XHJcbiAgICAgIC8vIH1cclxuICAgICAgZWxlbUZvcm0uZm9ybS5wYXRjaFZhbHVlKGVsZW1Gb3JtLmZvcm0udmFsdWUsIHsgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSwgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgICAgIHJlc3VsdCA9IGVsZW1Gb3JtLmZvcm0udmFsaWQgJiYgcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVucmVnaXN0ZXJWYWxpZEZvcm0oZm9ybSkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgPiAxKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgLT0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcHJpdmF0ZSB2YWxpZEZvcm1Hcm91cChmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xyXG4gIC8vICAgZm9ybUdyb3VwLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gIC8vICAgY29uc3QgZm9ybUNvbnRyb2xzID0gZm9ybUdyb3VwLmNvbnRyb2xzO1xyXG4gIC8vICAgZm9yIChjb25zdCBuYW1lIGluIGZvcm1Db250cm9scykge1xyXG4gIC8vICAgICBpZiAoZm9ybUNvbnRyb2xzW25hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgLy8gICAgICAgdGhpcy52YWxpZEZvcm1Hcm91cCg8Rm9ybUdyb3VwPmZvcm1Db250cm9sc1tuYW1lXSk7XHJcbiAgLy8gICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgZm9ybUNvbnRyb2xzW25hbWVdLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBJbnB1dCwgSW5qZWN0LFxyXG4gIEFmdGVyQ29udGVudEluaXQsIEVsZW1lbnRSZWYsIEF0dHJpYnV0ZSwgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb250cm9sQ29udGFpbmVyLCBBYnN0cmFjdENvbnRyb2wsIEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSxcclxuICBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtR3JvdXBOYW1lLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nTW9kZWxHcm91cFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgVkFMSURfQ09NUE9ORU5UX05BTUUgPSAnbXByLWZvcm0tY29udHJvbC12YWxpZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogVkFMSURfQ09NUE9ORU5UX05BTUUsXHJcbiAgdGVtcGxhdGU6IGA8c3BhblxuICAgIGNsYXNzPVwiZXJyb3JcIlxuICAgIFtuZ0NsYXNzXT1cImVycm9yUHJvbXB0XCJcbiAgICBbaGlkZGVuXT1cIiFlcnJvck1zZ1wiXG4+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG4gICAgPHAgKm5nSWY9XCIhdGVtcGxhdGVcIj57e2Vycm9yTXNnfX08L3A+XG48L3NwYW4+XG5gLFxyXG4gIHN0eWxlczogW2Bwe3dpZHRoOjEwMCU7aGVpZ2h0OjE3cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojZTA2YTJmO2Zsb2F0OmxlZnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAvL8Olwo/CqsOmwpjCvsOnwqTCumZvcm1ncm91cMOmwpzCrMOowrrCq8OnwprChMOpwpTCmcOowq/Cr8OvwrzCjMOkwrjCjcOmwpjCvsOnwqTCumdyb3Vww6TCuMKLY29udHJvbMOnwprChMOpwpTCmcOowq/Cr1xyXG4gIEBJbnB1dCgpIG9ubHlHcm91cCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVycm9yUHJvbXB0O1xyXG5cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8vw6nCqsKMw6jCr8KBw6XCpMKxw6jCtMKlw6bCmMK+w6fCpMK6w6fCmsKEw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcblxyXG4gIHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICBwcml2YXRlIGNvbnRyb2xOYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEF0dHJpYnV0ZSgnY29udHJvbE5hbWUnKSBjb250cm9sTmFtZTogc3RyaW5nLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXHJcbiAgICBwcml2YXRlIGVyck1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdsb2JhbFZhbGlkU2VydjogR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhpcy5jb250cm9sTmFtZSA9IGNvbnRyb2xOYW1lLnJlcGxhY2UoLycvZywgJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyAgw6XChcK8w6XCrsK5bmdGcm9tXHJcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuYmluZENvbnRyb2xFcnJvck1zZygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kQ29udHJvbEVycm9yTXNnKCkge1xyXG4gICAgdGhpcy5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKCk7XHJcbiAgICBpZiAoIXRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgZmluZCBjb250cm9sTmFtZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgbGV0IHBhdGggPSAnJztcclxuICAgIGNvbnN0IGlzRm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKVxyXG4gICAgICAmJiAodGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSkgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCk7XHJcbiAgICBpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuICAgICAgLy8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9ubHlHcm91cCkge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT50aGlzLmZvcm1Db250cm9sLCBwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIC8vQ2FsbGVkIG9uY2UsIGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxyXG4gICAgLy9BZGQgJ2ltcGxlbWVudHMgT25EZXN0cm95JyB0byB0aGUgY2xhc3MuXHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi51bnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/Clmdyb3Vww6TCuMKLw6nCncKiw6fCmsKEw6bCicKAw6bCnMKJw6nCqsKMw6jCr8KBw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIGNvbnRyb2wgXHJcbiAgICogQHBhcmFtIHBhdGggXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRHcm91cENvbnRyb2xWYWxpZE1zZyhjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1zZztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scykge1xyXG4gICAgICBtc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lKTtcclxuICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcbiAgICBsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG4gICAgd2hpbGUgKCFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJylcclxuICAgICAgJiYgIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJylcclxuICAgICAgJiYgIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICduZ2Zvcm0nKSkge1xyXG4gICAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNsaWJpbmdGb3JtQ29udHJsRWxlbShzZWFyY2hFbGVtOiBFbGVtZW50KSB7XHJcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nOiBFbGVtZW50ID0gc2VhcmNoRWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgd2hpbGUgKHByZXZpb3VzU2libGluZyAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcclxuICAgICAgLy8gaWYocHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcImZvcm1Hcm91cE5hbWVcIikgfHwgcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcIltmb3JtR3JvdXBdXCIpKXtcclxuICAgICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJoYXZlIHNlYXJjaCB0byByb290XCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtcHItZm9ybS1jb250cm9sLXZhbGlkIG11c3QgaGF2ZSBhIGZvcm1jb250cm9sIHNpYmlsaW5nJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCh8Kqw6XCisKow6bCn8Klw6bCicK+w6XCvcKTw6XCicKNw6nCqsKMw6jCr8KBw6XCr8K5w6XCusKUw6fCmsKEZm9ybUNvbnRyb2xOYW1lw6bCiMKWw6jCgMKFZm9ybUdyb3VwTmFtZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybUNvbnRyb2xOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICAvLyDDpsKJwovDpcKKwqjDqMKuwr7DpcKuwprDpMK6woZjb250cm9sTmFtZVxyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbE5hbWU7XHJcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25seSBvbmUgW2Zvcm1Db250cm9sXSBub3Qgc3VwcG9ydCwgVGhlcmUgbXVzdCBiZSBhIGZvcm1Hcm91cE5hbWUgb3IgW2Zvcm1Hcm91cF0nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldFBhcmVudEdyb3VwRUxlbSgpO1xyXG4gICAgICBjb25zdCBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChWQUxJRF9DT01QT05FTlRfTkFNRSkubGVuZ3RoO1xyXG4gICAgICB0aGlzLmdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGg7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cERpcmVjdGl2ZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCm8K0w6bCjsKlw6bCmMKvw6bCoMK5w6jCisKCw6fCgsK5w6XCr8K5w6XCusKUw6bClcK0w6TCuMKqZnJvbSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZm9ybcOowqHCqMOlwo3ClcOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWTDr8K8wozDpcKIwpnDpMK7wqXDpcK9wpPDpcKJwo1mb3JtR3JvdXDDpcKvwrnDpcK6wpTDp8KawoTDpcKPwpjDqcKHwo/DpcKQwo3DpMK4wrpjb250cm9sTmFtZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IHNob3VsZCBzZXQgY29udHJvbE5hbWUgYnkgeW91cnNlbGYnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cE5hbWUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwojCtsOoworCgsOnwoLCucOmwpjCr2Zvcm3DqMKhwqjDpcKNwpXDpMK4wq3DpsKfwpDDpMK4wqpncm91cFxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmdyb3Vww6XCj8Kqw6bCnMKJw6TCuMKAw6TCuMKqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIMOkwrzCmMOlwoXCiMOlwo/ClmZyb21Hcm91cMOnwprChMOpwqrCjMOowq/CgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKSB8fCBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZnJvbUdyb3VwTmFtZScpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgTmdNb2RlbEdyb3VwICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHRoaXMuY29udGFpbmVyLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbXByLWZvcm0tY29udHJvbC12YWxpZCDDpcKvwrnDpcK6wpTDpMK4woDDpMK4wqogZm9ybUNvbnRyb2xOYW1lXHJcbiAgICAgICAgLy8gw6XCkMKRw6XCicKNw6bCn8Klw6bCicK+w6XChcKEw6XCvMKfw6jCisKCw6fCgsK5XHJcbiAgICAgICAgY29uc3Qgc2libGluZ0VsZW0gPSB0aGlzLmdldFNsaWJpbmdGb3JtQ29udHJsRWxlbSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowo7Ct8Olwo/ClsOlwr3Ck8OlwonCjWZvcm1Db250cm9sw6fCm8K4w6XCr8K5w6TCusKOZm9ybUdyb3Vww6fCmsKEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbCBcclxuICAgKiBAcGFyYW0gcm9vdCBcclxuICAgKiBAcGFyYW0gY29udHJvbE5hbWUgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICBpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuICAgICAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuICAgICAgICByZXR1cm4gY3RybE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuICAgICAgICBpZiAodG1wUGF0aCkge1xyXG4gICAgICAgICAgcGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuICAgICAgICAgIHBhdGgucHVzaCh0bXBQYXRoKTtcclxuICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaXNsaUZvcm1WYWxpZE1zZ10nLFxyXG4gIHByb3ZpZGVyczogW0Zvcm1WYWxpZE1zZ1NlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoJ2lzbGlGb3JtVmFsaWRNc2cnKSBzZXQgdmFsaWRNc2cobXNnKSB7XHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHRoaXMubXNnU2Vydi5yZXNldE1zZyhtc2cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTQk4ge1xuICBpc2JuMTogc3RyaW5nO1xuICBpc2JuMjogc3RyaW5nO1xuICBpc2JuMzogc3RyaW5nO1xuICBpc2JuNDogc3RyaW5nO1xuICBpc2JuNTogc3RyaW5nO1xufVxuXG5jb25zdCBJU0JOX1ZBTElEVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuVmFsaWR0b3JEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wcklzYm5WYWxpZF0nLFxuICBwcm92aWRlcnM6IFtJU0JOX1ZBTElEVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnaXNibicsICfDqMKvwrfDqMK+wpPDpcKFwqXDpsKtwqPDp8Khwq7Dp8KawoRJU0JOw6XCj8K3Jyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgaWYgKCEoYyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNibiBtdXN0IGJlIGEgZ3JvdXAgY29udHJvbCcpO1xuICAgIH1cbiAgICBjb25zdCBpc2JuOiBJU0JOID0gYy52YWx1ZTtcbiAgICAvLyDDpMK4wo3DqcKqwozDqMKvwoHDqcKdwp7Dp8KpwrpcbiAgICBpZiAoIWlzYm4uaXNibjEgfHwgIWlzYm4uaXNibjIgfHwgIWlzYm4uaXNibjMgfHwgIWlzYm4uaXNibjQgfHwgIWlzYm4uaXNibjUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbGlkSVNCTkNvZGUoW2lzYm4uaXNibjEsIGlzYm4uaXNibjIsIGlzYm4uaXNibjMsIGlzYm4uaXNibjQsIGlzYm4uaXNibjVdLmpvaW4oJycpKSkge1xuICAgICAgcmV0dXJuIHsgaXNibjogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRJU0JOQ29kZShzKSB7XG4gICAgaWYgKHMgPT09ICc5OTk5OTk5OTk5OTk5Jykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0JhckNvZGUocykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGEgPSAwLCBiID0gMCwgYyA9IDAsIGQgPSAwLCBlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpKyspIHtcbiAgICAgIGNvbnN0IHNjID0gcGFyc2VJbnQoc1tpIC0gMV0sIDEwKTtcbiAgICAgIGlmIChpIDw9IDEyICYmIGkgJSAyID09PSAwKSB7XG4gICAgICAgIGEgKz0gc2M7XG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMTEgJiYgaSAlIDIgPT09IDEpIHtcbiAgICAgICAgYiArPSBzYztcbiAgICAgIH1cbiAgICB9XG4gICAgYyA9IGEgKiAzO1xuICAgIGQgPSBiICsgYztcbiAgICBpZiAoZCAlIDEwID09PSAwKSB7XG4gICAgICBlID0gZCAtIGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUgPSBkICsgKDEwIC0gZCAlIDEwKSAtIGQ7XG4gICAgfVxuICAgIHJldHVybiBlID09PSBwYXJzZUludChzWzEyXSwgMTApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0JhckNvZGUocyk6IGJvb2xlYW4ge1xuICAgIGlmIChzLmxlbmd0aCAhPT0gMTMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgvXlswLTldezEyfSQvKTtcbiAgICByZXR1cm4gcmVnLmV4ZWMocy5zdWJzdHJpbmcoMCwgMTIpKSAhPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJU0JOIH0gZnJvbSAnLi9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5jb25zdCBJU0JOX1BBUlRfVkFMSURUT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wcklzYm5QYXJ0VmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9QQVJUX1ZBTElEVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5QYXJ0MzQnLCAnw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3ClycpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcbiAgICB9XG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XG4gICAgaWYgKCFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gw6nCqsKMw6jCr8KBw6fCrMKsw6TCuMKJw6fCu8KEw6XCksKMw6fCrMKsw6XCm8Kbw6fCu8KEw6TCuMKAw6XChcKxw6TCuMK6OMOkwr3CjcOmwpXCsMOlwq3Cl1xuICAgIGlmIChpc2JuLmlzYm4zLmxlbmd0aCArIGlzYm4uaXNibjQubGVuZ3RoICE9PSA4KSB7XG4gICAgICByZXR1cm4geyBpc2JuUGFydDM0OiB0cnVlIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XG5cbmNvbnN0IElTQk5fSEVBREVSX1ZBTElEVE9SID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21wcklzYm5IZWFkZXJWYWxpZF0nLFxuICBwcm92aWRlcnM6IFtJU0JOX0hFQURFUl9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm5IZWFkZXInLCAnw6fCrMKsw6TCuMKAw6fCu8KEw6XCv8KFw6nCocK7w6TCuMK6OTc4w6bCiMKWOTc5Jyk7XG4gIH1cblxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoIWMudmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoWyc5OTknLCAnOTc4JywgJzk3OScsICcwMDAnXS5pbmRleE9mKGMudmFsdWUpIDwgMCkge1xuICAgICAgcmV0dXJuIHsgaXNibkhlYWRlcjogdHJ1ZX07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XG5cbmNvbnN0IEZMT0FUX1ZBTElEVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXByRmxvYXRPbmx5VmFsaWR0b3JdJyxcbiAgcHJvdmlkZXJzOiBbRkxPQVRfVkFMSURUT1JdXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2Zsb2F0JywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwrXCrsOnwoLCucOmwpXCsCcpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGNvbnN0IGZsb2F0VmFsID0gcGFyc2VGbG9hdCgnJyArIGMudmFsdWUpO1xuICAgIGlmIChpc05hTihmbG9hdFZhbCkpIHtcbiAgICAgIHJldHVybiB7IGZsb2F0OiB0cnVlIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSXNiblZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJc2JuUGFydFZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCxcclxuICAgIEZvcm1WYWxpZE1zZ0RpcmVjdGl2ZSxcclxuICAgIElzYm5WYWxpZHRvckRpcmVjdGl2ZSxcclxuICAgIElzYm5QYXJ0VmFsaWREaXJlY3RpdmUsXHJcbiAgICBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUsXHJcbiAgICBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgRm9ybVZhbGlkTXNnU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1vZHVsZSB7IH1cclxuIiwiZXhwb3J0IHsgRm9ybVZhbGlkTW9kdWxlIH0gZnJvbSAnLi9saWIvZm9ybS12YWxpZC5tb2R1bGUnO1xuZXhwb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xuZXhwb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcbmV4cG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcbmV4cG9ydCB7IEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQgfSBmcm9tICcuL2xpYi9mb3JtLWNvbnRyb2wtdmFsaWQvZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudCc7XG5leHBvcnQgeyBGbG9hdE9ubHlWYWxpZHRvckRpcmVjdGl2ZSB9IGZyb20gJy4vbGliL3ZhbGlkdG9ycy9mbG9hdC1vbmx5LXZhbGlkdG9yLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBJc2JuSGVhZGVyVmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlJztcbmV4cG9ydCB7IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi1wYXJ0LXZhbGlkLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsIElTQk4gfSBmcm9tICcuL2xpYi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xuLy9leHBvcnQgeyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2Zvcm0tdmFsaWQtbXNnLmRpcmVjdGl2ZSc7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQTs7O0FBQUE7SUFHRTt3QkFEbUIsSUFBSSxHQUFHLEVBQWtCO0tBQzNCOzs7Ozs7O0lBT1YsMkNBQVc7Ozs7OztjQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNqRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNyRDtRQUNE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