(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/form-valid/fesm5/form-valid.js":
/*!*********************************************!*\
  !*** ./dist/form-valid/fesm5/form-valid.js ***!
  \*********************************************/
/*! exports provided: FormValidModule, GlobalValidService, FloatValidtor, PriceValidtor, EmailValidtor, IsbnHeaderValidDirective, IsbnPartValidDirective, IsbnValidtorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormValidModule", function() { return FormValidModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalValidService", function() { return GlobalValidService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatValidtor", function() { return FloatValidtor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceValidtor", function() { return PriceValidtor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailValidtor", function() { return EmailValidtor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsbnHeaderValidDirective", function() { return IsbnHeaderValidDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsbnPartValidDirective", function() { return IsbnPartValidDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsbnValidtorDirective", function() { return IsbnValidtorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 全局验证消息， 存储默认消息
 */
var /**
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
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
        if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
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
            if (this.container instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"] && groupValidControlLength <= 1) {
                // 直接是根节点对应整个from [formGroup]="formGroup"
                // 整个form表单只有一个mpr-form-control-valid，则以当前formGroup对应的变量名为controlName
                throw new Error('you should set controlName by yourself');
            }
            else if (this.container instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupName"] && groupValidControlLength <= 1) {
                // 父节点是form表单中某个group
                // 整个group只有一个mpr-form-control-valid
                // 优先取fromGroup的验证
                controlName = parentElement.getAttribute('formgroupname') || parentElement.getAttribute('fromGroupName');
            }
            else if (this.container instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModelGroup"] && groupValidControlLength <= 1) {
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
        if (!(root instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])) {
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
            if (root['controls'][ctrlName] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: VALID_COMPONENT_NAME,
                    template: "<span\n    class=\"error\"\n    [ngClass]=\"errorPrompt\"\n    [hidden]=\"!errorMsg\"\n>\n    <ng-container\n        [ngTemplateOutlet]=\"template\"\n        [ngTemplateOutletContext]=\"{errorMsg:errorMsg}\"\n    ></ng-container>\n    <p *ngIf=\"!template\">{{errorMsg}}</p>\n</span>\n",
                    styles: ["p{width:100%;height:17px;line-height:17px;color:#e06a2f;float:left}"]
                },] },
    ];
    /** @nocollapse */
    FormControlValidComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Attribute"], args: ['controlName',] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ControlContainer"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] },
        { type: FormValidMsgService },
        { type: GlobalValidService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
    ]; };
    FormControlValidComponent.propDecorators = {
        onlyGroup: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        errorPrompt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        template: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],] }]
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[isliFormValidMsg]',
                    providers: [FormValidMsgService]
                },] },
    ];
    /** @nocollapse */
    FormValidMsgDirective.ctorParameters = function () { return [
        { type: FormValidMsgService }
    ]; };
    FormValidMsgDirective.propDecorators = {
        validMsg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['isliFormValidMsg',] }]
    };
    return FormValidMsgDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ ISBN_VALIDTOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return IsbnValidtorDirective; }),
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
        if (!(c instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
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
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return IsbnPartValidDirective; }),
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
        if (!(c instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
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
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return IsbnHeaderValidDirective; }),
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
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
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return FloatValidtor; }),
    multi: true
};
var FloatValidtor = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
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
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return PriceValidtor; }),
    multi: true
};
var PriceValidtor = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
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
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return EmailValidtor; }),
    multi: true
};
var EmailValidtor = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
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
var FormValidModule = /** @class */ (function () {
    function FormValidModule() {
    }
    FormValidModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL3ByaWNlLXZhbGlkdG9yLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvZW1haWwtdmFsaWR0b3IudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL2Zvcm0tdmFsaWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDDpcKFwqjDpcKxwoDDqcKqwozDqMKvwoHDpsK2wojDpsKBwq/Dr8K8wowgw6XCrcKYw6XCgsKow6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IG5ldyBNYXA8U3RyaW5nLCBTdHJpbmc+KCk7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCrsK+w6fCvcKuw6nClMKZw6jCr8Kva2V5w6fCmsKEw6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDDqcKUwpnDqMKvwq9rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUgw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LCBtc2dWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TXNnKG1zZ0tleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnZhbGlkTXNnLmdldChtc2dLZXkpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5XSA9IG1zZ1ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZhbGlkTXNnKG1zZ1BhdGg6IHN0cmluZywgZXJyb3IpIHtcclxuICAgIGlmICghZXJyb3IgfHwgIW1zZ1BhdGgpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvcltuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkTXNnW21zZ1BhdGggKyAnLicgKyBuYW1lXSB8fCBnbG9iYWxWYWxpZE1zZ1NlcnYuZ2V0TXNnKG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRNc2cobXNnOiBPYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgbXNnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcignZm9ybSB2YWxpZCBtc2cgbXVzdCBiZSBhIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIG5hbWUsIHRoaXMudmFsaWRNc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdE1zZyhtc2c6IE9iamVjdCwgcGF0aDogc3RyaW5nLCByZXN1bHQ6IE9iamVjdCkge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXN1bHRbcGF0aCArICcuJyArIG5hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZFNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5wdXNoKHsgZm9ybTogZm9ybSwgY291bnQ6IDEgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRBbGwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKGVsZW1Gb3JtID0+IHtcclxuICAgICAgLy8gZWxlbUZvcm0ubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgICAgIC8vIGlmIChlbGVtRm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAvLyAgIHRoaXMudmFsaWRGb3JtR3JvdXAoZWxlbUZvcm0pO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uZm9ybSA9PSBmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50ID4gMSkge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50IC09IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAvLyAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAvLyAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAvLyAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAvLyAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gIC8vICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gIC8vICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBBdHRyaWJ1dGUsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lciwgQWJzdHJhY3RDb250cm9sLCBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsXHJcbiAgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUdyb3VwTmFtZSwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cbiAgICBjbGFzcz1cImVycm9yXCJcbiAgICBbbmdDbGFzc109XCJlcnJvclByb21wdFwiXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxuPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXG4gICAgPjwvbmctY29udGFpbmVyPlxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxuPC9zcGFuPlxuYCxcclxuICBzdHlsZXM6IFtgcHt3aWR0aDoxMDAlO2hlaWdodDoxN3B4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6I2UwNmEyZjtmbG9hdDpsZWZ0fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgLy/DpcKPwqrDpsKYwr7Dp8Kkwrpmb3JtZ3JvdXDDpsKcwqzDqMK6wqvDp8KawoTDqcKUwpnDqMKvwq/Dr8K8wozDpMK4wo3DpsKYwr7Dp8Kkwrpncm91cMOkwrjCi2NvbnRyb2zDp8KawoTDqcKUwpnDqMKvwq9cclxuICBASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlcnJvclByb21wdDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBlcnJvck1zZzogc3RyaW5nOyAvL8OpwqrCjMOowq/CgcOlwqTCscOowrTCpcOmwpjCvsOnwqTCusOnwprChMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG5cclxuICBwcml2YXRlIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgcHJpdmF0ZSBjb250cm9sTmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gIMOlwoXCvMOlwq7CuW5nRnJvbVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuICAgIHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBpZiAodGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpZncm91cMOkwrjCi8Opwp3CosOnwprChMOmwonCgMOmwpzCicOpwqrCjMOowq/CgcOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBjb250cm9sIFxyXG4gICAqIEBwYXJhbSBwYXRoIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICAgIH1cclxuICAgIGxldCBtc2c7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgbXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSk7XHJcbiAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyZW50R3JvdXBFTGVtKCk6IEVsZW1lbnQge1xyXG4gICAgbGV0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgLy8gY29uc3QgYXJydHJpYnV0ZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcygpO1xyXG4gICAgY29uc29sZS5sb2cocGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpKTtcclxuICAgIHdoaWxlICghcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1Hcm91cE5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpXHJcbiAgICAgICYmICEocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScpXHJcbiAgICAgICYmICEocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnbmdmb3JtJykpIHtcclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGZpbmQgcGFyZW50RWxlbWVudFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIHdoaWxlIChwcmV2aW91c1NpYmxpbmcgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XHJcbiAgICAgIC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIH1cclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowofCqsOlworCqMOmwp/CpcOmwonCvsOlwr3Ck8OlwonCjcOpwqrCjMOowq/CgcOlwq/CucOlwrrClMOnwprChGZvcm1Db250cm9sTmFtZcOmwojClsOowoDChWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgLy8gw6bCicKLw6XCisKow6jCrsK+w6XCrsKaw6TCusKGY29udHJvbE5hbWVcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xOYW1lO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuICAgICAgY29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuICAgICAgdGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwpvCtMOmwo7CpcOmwpjCr8OmwqDCucOoworCgsOnwoLCucOlwq/CucOlwrrClMOmwpXCtMOkwrjCqmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmZvcm3DqMKhwqjDpcKNwpXDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkw6/CvMKMw6XCiMKZw6TCu8Klw6XCvcKTw6XCicKNZm9ybUdyb3Vww6XCr8K5w6XCusKUw6fCmsKEw6XCj8KYw6nCh8KPw6XCkMKNw6TCuMK6Y29udHJvbE5hbWVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgfHwgcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zyb21Hcm91cE5hbWUnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSB0aGlzLmNvbnRhaW5lci5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1wci1mb3JtLWNvbnRyb2wtdmFsaWQgw6XCr8K5w6XCusKUw6TCuMKAw6TCuMKqIGZvcm1Db250cm9sTmFtZVxyXG4gICAgICAgIC8vIMOlwpDCkcOlwonCjcOmwp/CpcOmwonCvsOlwoXChMOlwrzCn8OoworCgsOnwoLCuVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmdFbGVtID0gdGhpcy5nZXRTbGliaW5nRm9ybUNvbnRybEVsZW0odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGlmKHRoaXMuY29udHJvbE5hbWUgJiYgdGhpcy5jb250cm9sTmFtZSAhPSBjb250cm9sTmFtZSl7XHJcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihgeW91IG1heSBzZXQgYSBlcnJvciBjb250cm9sTmFtZSwgeW91IHNldCBpczogJHt0aGlzLmNvbnRyb2xOYW1lfSwgYnV0IG5lZWQgaXM6ICR7Y29udHJvbE5hbWV9YCk7XHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpbDpcK9wpPDpcKJwo1mb3JtQ29udHJvbMOnwpvCuMOlwq/CucOkwrrCjmZvcm1Hcm91cMOnwprChHBhdGhcclxuICAgKiBAcGFyYW0gZm9ybUNvbnRyb2wgXHJcbiAgICogQHBhcmFtIHJvb3QgXHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UGF0aChmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sLCByb290LCBjb250cm9sTmFtZSkge1xyXG4gICAgaWYgKCEocm9vdCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgaWYgKGZvcm1Db250cm9sID09PSByb290KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGggPSBbXTtcclxuICAgIGZvciAoY29uc3QgY3RybE5hbWUgaW4gcm9vdFsnY29udHJvbHMnXSkge1xyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gPT09IGZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgcmV0dXJuIGN0cmxOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHRtcFBhdGggPSB0aGlzLmdldFBhdGgoZm9ybUNvbnRyb2wsIHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdLCBjb250cm9sTmFtZSk7XHJcbiAgICAgICAgaWYgKHRtcFBhdGgpIHtcclxuICAgICAgICAgIHBhdGgucHVzaChjdHJsTmFtZSk7XHJcbiAgICAgICAgICBwYXRoLnB1c2godG1wUGF0aCk7XHJcbiAgICAgICAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lzbGlGb3JtVmFsaWRNc2ddJyxcclxuICBwcm92aWRlcnM6IFtGb3JtVmFsaWRNc2dTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCdpc2xpRm9ybVZhbGlkTXNnJykgc2V0IHZhbGlkTXNnKG1zZykge1xyXG4gICAgaWYgKG1zZykge1xyXG4gICAgICB0aGlzLm1zZ1NlcnYucmVzZXRNc2cobXNnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU0JOIHtcbiAgaXNibjE6IHN0cmluZztcbiAgaXNibjI6IHN0cmluZztcbiAgaXNibjM6IHN0cmluZztcbiAgaXNibjQ6IHN0cmluZztcbiAgaXNibjU6IHN0cmluZztcbn1cblxuY29uc3QgSVNCTl9WQUxJRFRPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm4nLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCrcKjw6fCocKuw6fCmsKESVNCTsOlwo/CtycpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcbiAgICB9XG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XG4gICAgLy8gw6TCuMKNw6nCqsKMw6jCr8KBw6nCncKew6fCqcK6XG4gICAgaWYgKCFpc2JuLmlzYm4xIHx8ICFpc2JuLmlzYm4yIHx8ICFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40IHx8ICFpc2JuLmlzYm41KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcbiAgICAgIHJldHVybiB7IGlzYm46IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xuICAgIGlmIChzID09PSAnOTk5OTk5OTk5OTk5OScpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNCYXJDb2RlKHMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBhID0gMCwgYiA9IDAsIGMgPSAwLCBkID0gMCwgZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XG4gICAgICBpZiAoaSA8PSAxMiAmJiBpICUgMiA9PT0gMCkge1xuICAgICAgICBhICs9IHNjO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XG4gICAgICAgIGIgKz0gc2M7XG4gICAgICB9XG4gICAgfVxuICAgIGMgPSBhICogMztcbiAgICBkID0gYiArIGM7XG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xuICAgICAgZSA9IGQgLSBkO1xuICAgIH0gZWxzZSB7XG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xuICAgIH1cbiAgICByZXR1cm4gZSA9PT0gcGFyc2VJbnQoc1sxMl0sIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNCYXJDb2RlKHMpOiBib29sZWFuIHtcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XG4gICAgcmV0dXJuIHJlZy5leGVjKHMuc3Vic3RyaW5nKDAsIDEyKSkgIT0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSVNCTiB9IGZyb20gJy4vaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuY29uc3QgSVNCTl9QQVJUX1ZBTElEVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuUGFydFZhbGlkRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuUGFydFZhbGlkXScsXG4gIHByb3ZpZGVyczogW0lTQk5fUEFSVF9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuUGFydDM0JywgJ8OnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpcnKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XG4gICAgfVxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xuICAgIGlmICghaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIMOpwqrCjMOowq/CgcOnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpdcbiAgICBpZiAoaXNibi5pc2JuMy5sZW5ndGggKyBpc2JuLmlzYm40Lmxlbmd0aCAhPT0gOCkge1xuICAgICAgcmV0dXJuIHsgaXNiblBhcnQzNDogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5jb25zdCBJU0JOX0hFQURFUl9WQUxJRFRPUiA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9IRUFERVJfVkFMSURUT1JdXG59KVxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ8OnwqzCrMOkwrjCgMOnwrvChMOlwr/ChcOpwqHCu8OkwrjCujk3OMOmwojCljk3OScpO1xuICB9XG5cbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgaWYgKCFjLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKFsnOTk5JywgJzk3OCcsICc5NzknLCAnMDAwJ10uaW5kZXhPZihjLnZhbHVlKSA8IDApIHtcbiAgICAgIHJldHVybiB7IGlzYm5IZWFkZXI6IHRydWV9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgRkxPQVRfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmxvYXRWYWxpZHRvciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttcHJGbG9hdE9ubHldJyxcclxuICAgIHByb3ZpZGVyczogW0ZMT0FUX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxvYXRWYWxpZHRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2Zsb2F0JywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwrXCrsOnwoLCucOmwpXCsCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICBjb25zdCBmbG9hdFZhbCA9IHBhcnNlRmxvYXQoJycgKyBjLnZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4oZmxvYXRWYWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGZsb2F0OiB0cnVlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBQUklDRV9WQUxJRFRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQcmljZVZhbGlkdG9yKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21wclByaWNlVmFsaWRdJyxcclxuICAgIHByb3ZpZGVyczogW1BSSUNFX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpY2VWYWxpZHRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdwcmljZScsICfDpMK7wrfDpsKgwrzDpMK4wrrDpMK4wqTDpMK9wo3DpcKwwo/DpsKVwrAnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgY29uc3QgcHJpY2UgPSAnJyArIGMudmFsdWU7XHJcbiAgICAgICAgaWYgKC9eXFxkKyguXFxkezAsMn0pPyQvLnRlc3QocHJpY2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBwcmljZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBFTUFJTF9WQUxJRFRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBFbWFpbFZhbGlkdG9yKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21wckVtYWlsVmFsaWRdJyxcclxuICAgIHByb3ZpZGVyczogW0VNQUlMX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZHRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdlbWFpbEVycm9yJywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOlwpDCiMOmwrPClcOnwprChMOpwoLCrsOnwq7CsScpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKGNvbnRvcmw6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IGVtYWlsID0gY29udG9ybC52YWx1ZTtcclxuICAgICAgICBpZiAoIWVtYWlsKSB7IC8vIMOlwoXCgcOowq7CuMOkwrjCusOnwqnCulxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEvXlthLXpBLVowLTlfLV0rQFthLXpBLVowLTlfLV0rKFxcLlthLXpBLVowLTlfLV0rKSskL2cudGVzdChlbWFpbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZW1haWxFcnJvcjogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRW1haWxWYWxpZHRvciwgRmxvYXRWYWxpZHRvciwgUHJpY2VWYWxpZHRvciB9IGZyb20gJy4vdmFsaWR0b3JzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRW1haWxWYWxpZHRvcixcclxuICAgIEZsb2F0VmFsaWR0b3IsXHJcbiAgICBQcmljZVZhbGlkdG9yXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIEVtYWlsVmFsaWR0b3IsXHJcbiAgICBGbG9hdFZhbGlkdG9yLFxyXG4gICAgUHJpY2VWYWxpZHRvclxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBGb3JtVmFsaWRNc2dTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQTs7O0FBQUE7SUFHRTt3QkFEbUIsSUFBSSxHQUFHLEVBQWtCO0tBQzNCOzs7Ozs7O0lBT1YsMkNBQVc7Ozs7OztjQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNqRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMs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

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.component */ "./src/app/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _form_group_valid_form_group_valid_form_group_valid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form-group-valid/form-group-valid/form-group-valid.component */ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.ts");
/* harmony import */ var _form_group_valid_form_group_valid_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form-group-valid/form-group-valid.module */ "./src/app/form-group-valid/form-group-valid.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _form_group_valid_form_valid_only_form_valid_only_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./form-group-valid/form-valid-only/form-valid-only.component */ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.ts");
/* harmony import */ var _form_group_valid_form_group_directive_valid_form_group_directive_valid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./form-group-valid/form-group-directive-valid/form-group-directive-valid.component */ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [{
        path: '', component: _form_group_valid_form_group_valid_form_group_valid_component__WEBPACK_IMPORTED_MODULE_4__["FormGroupValidComponent"]
    }, {
        path: 'only', component: _form_group_valid_form_valid_only_form_valid_only_component__WEBPACK_IMPORTED_MODULE_7__["FormValidOnlyComponent"]
    }, {
        path: 'directive', component: _form_group_valid_form_group_directive_valid_form_group_directive_valid_component__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirectiveValidComponent"]
    }];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"],
                _form_group_valid_form_group_valid_module__WEBPACK_IMPORTED_MODULE_5__["FormGroupValidModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes)
            ],
            declarations: [_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
            bootstrap: [_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app/app.component.css":
/*!***************************************!*\
  !*** ./src/app/app/app.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app/app.component.html":
/*!****************************************!*\
  !*** ./src/app/app/app.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "./src/app/app/app.component.ts":
/*!**************************************!*\
  !*** ./src/app/app/app.component.ts ***!
  \**************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.css":
/*!******************************************************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.html":
/*!*******************************************************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form  #formVar=\"ngForm\" [isliFormValidMsg]=\"validErrorMsg\" (ngSubmit)=\"handleSubmit(formVar)\">\n  <h3>Reactive Form 常规验证</h3>\n  <dl>\n    <dt>用户名</dt>\n    <dd>\n      <input type=\"text\" name=\"username\" [(ngModel)]=\"form.username\" required mprEmailValid>\n      <mpr-form-control-valid></mpr-form-control-valid>\n    </dd>\n    <dt>密码</dt>\n    <dd>\n      <input type=\"password\" name=\"password\" [(ngModel)]=\"form.password\" required>\n      <mpr-form-control-valid></mpr-form-control-valid>\n    </dd>\n  </dl>\n  <dl ngModelGroup=\"user\">\n    <dt>昵称</dt>\n    <dd>\n      <input type=\"text\" name=\"nickname\" [(ngModel)]=\"form.user.nickname\" required>\n      <mpr-form-control-valid></mpr-form-control-valid>\n    </dd>\n    <dt>性别</dt>\n    <dd>\n      <span>\n          <label>男</label>\n          <input type=\"radio\" name=\"sex\" required [(ngModel)]=\"form.user.sex\" value=\"1\">\n      </span>\n      <span>\n        <label>女</label>\n        <input type=\"radio\" name=\"sex\" required [(ngModel)]=\"form.user.sex\" value=\"2\">\n      </span>\n      <mpr-form-control-valid controlName=\"sex\"></mpr-form-control-valid>\n    </dd>\n  </dl>\n  <dl ngModelGroup=\"group1\">\n    <h3>只使用一个pr-form-control-valid显示所有control的错误消息</h3>\n    <dt>contorl1</dt>\n    <dd>\n      <input type=\"text\" name=\"contorl1\" [(ngModel)]=\"form.group1.control1\" required mprEmailValid>\n    </dd>\n    <dt>contorl2</dt>\n    <dd>\n      <input type=\"text\" name=\"control2\" [(ngModel)]=\"form.group1.control2\" required mprFloatOnly>\n    </dd>\n    <mpr-form-control-valid controlName=\"group1\"></mpr-form-control-valid>\n  </dl>\n  <dl>\n    <dd>\n      <input type=\"submit\" value=\"确定\">\n    </dd>\n  </dl>\n</form>\n"

/***/ }),

/***/ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: FormGroupDirectiveValidComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGroupDirectiveValidComponent", function() { return FormGroupDirectiveValidComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dist_form_valid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../dist/form-valid */ "./dist/form-valid/fesm5/form-valid.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VALID_ERROR_MSG = {
    username: { required: '请输入邮箱' },
    password: { required: '请输入密码' },
    user: {
        nickname: {
            required: '请输入用户名',
            maxLength: '用户名最多5位'
        },
        sex: {
            required: '请输入性别'
        }
    },
    group1: {
        control1: {
            required: '请输入用户名',
            maxLength: '用户名最多5位'
        },
        control2: {
            required: '请输入性别'
        }
    }
};
var FormGroupDirectiveValidComponent = /** @class */ (function () {
    function FormGroupDirectiveValidComponent(globalServ) {
        this.globalServ = globalServ;
        this.validErrorMsg = VALID_ERROR_MSG;
        this.form = {
            username: '',
            password: '',
            user: {
                nickname: '',
                sex: ''
            },
            group1: {
                control1: '',
                control2: ''
            }
        };
    }
    FormGroupDirectiveValidComponent.prototype.ngOnInit = function () {
    };
    FormGroupDirectiveValidComponent.prototype.handleSubmit = function (form) {
        console.log(form);
        this.globalServ.validAll();
    };
    FormGroupDirectiveValidComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-form-group-directive-valid',
            template: __webpack_require__(/*! ./form-group-directive-valid.component.html */ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.html"),
            styles: [__webpack_require__(/*! ./form-group-directive-valid.component.css */ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.css")]
        }),
        __metadata("design:paramtypes", [_dist_form_valid__WEBPACK_IMPORTED_MODULE_1__["GlobalValidService"]])
    ], FormGroupDirectiveValidComponent);
    return FormGroupDirectiveValidComponent;
}());



/***/ }),

/***/ "./src/app/form-group-valid/form-group-valid.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-valid.module.ts ***!
  \*************************************************************/
/*! exports provided: FormGroupValidModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGroupValidModule", function() { return FormGroupValidModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _form_group_valid_form_group_valid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-group-valid/form-group-valid.component */ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dist_form_valid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../dist/form-valid */ "./dist/form-valid/fesm5/form-valid.js");
/* harmony import */ var _form_valid_only_form_valid_only_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form-valid-only/form-valid-only.component */ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.ts");
/* harmony import */ var _form_group_directive_valid_form_group_directive_valid_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form-group-directive-valid/form-group-directive-valid.component */ "./src/app/form-group-valid/form-group-directive-valid/form-group-directive-valid.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FormGroupValidModule = /** @class */ (function () {
    function FormGroupValidModule() {
    }
    FormGroupValidModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _dist_form_valid__WEBPACK_IMPORTED_MODULE_4__["FormValidModule"]
            ],
            exports: [
                _form_group_valid_form_group_valid_component__WEBPACK_IMPORTED_MODULE_2__["FormGroupValidComponent"]
            ],
            declarations: [_form_group_valid_form_group_valid_component__WEBPACK_IMPORTED_MODULE_2__["FormGroupValidComponent"], _form_valid_only_form_valid_only_component__WEBPACK_IMPORTED_MODULE_5__["FormValidOnlyComponent"], _form_group_directive_valid_form_group_directive_valid_component__WEBPACK_IMPORTED_MODULE_6__["FormGroupDirectiveValidComponent"]]
        })
    ], FormGroupValidModule);
    return FormGroupValidModule;
}());



/***/ }),

/***/ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-valid/form-group-valid.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dl dt{\r\n    display: inline-block;\r\n}\r\ndl dd{\r\n    display: inline-block\r\n}"

/***/ }),

/***/ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-valid/form-group-valid.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\" [isliFormValidMsg]=\"validErrorMsg\">\r\n  <h3>Reactive Form 常规验证</h3>\r\n  <dl>\r\n    <dt>用户名</dt>\r\n    <dd>\r\n      <input type=\"text\" formControlName=\"username\" mprEmailValid>\r\n      <mpr-form-control-valid></mpr-form-control-valid>\r\n    </dd>\r\n    <dt>密码</dt>\r\n    <dd>\r\n      <input type=\"password\" formControlName=\"password\">\r\n      <mpr-form-control-valid></mpr-form-control-valid>\r\n    </dd>\r\n  </dl>\r\n  <dl formGroupName=\"user\">\r\n    <dt>昵称</dt>\r\n    <dd>\r\n      <input type=\"text\" formControlName=\"nickname\">\r\n      <mpr-form-control-valid></mpr-form-control-valid>\r\n    </dd>\r\n    <dt>性别</dt>\r\n    <dd>\r\n      <span>\r\n          <label>男</label>\r\n          <input type=\"radio\" name=\"sex\" formControlName=\"sex\">\r\n      </span>\r\n      <span>\r\n        <label>女</label>\r\n        <input type=\"radio\" name=\"sex\" formControlName=\"sex\">\r\n      </span>\r\n      <!--如果验证消息组件和对应的formControlName不在同一个父节点下， 必须指定controlName-->\r\n      <mpr-form-control-valid controlName=\"sex\"></mpr-form-control-valid>\r\n    </dd>\r\n  </dl>\r\n  <dl formGroupName=\"group1\">\r\n    <h3>只使用一个pr-form-control-valid显示所有control的错误消息</h3>\r\n    <dt>contorl1</dt>\r\n    <dd>\r\n      <input type=\"text\" formControlName=\"control1\">\r\n    </dd>\r\n    <dt>contorl2</dt>\r\n    <dd>\r\n      <input type=\"text\" formControlName=\"control2\">\r\n    </dd>\r\n    <mpr-form-control-valid></mpr-form-control-valid>\r\n  </dl>\r\n  <dl>\r\n    <dd>\r\n      <input type=\"button\" value=\"确定\" (click)=\"handleSubmit()\">\r\n    </dd>\r\n  </dl>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/form-group-valid/form-group-valid/form-group-valid.component.ts ***!
  \*********************************************************************************/
/*! exports provided: FormGroupValidComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGroupValidComponent", function() { return FormGroupValidComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dist/form-valid */ "./dist/form-valid/fesm5/form-valid.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VALID_ERROR_MSG = {
    username: { required: '请输入邮箱' },
    password: { required: '请输入密码' },
    user: {
        nickname: {
            required: '请输入用户名',
            maxLength: '用户名最多5位'
        },
        sex: {
            required: '请输入性别'
        }
    },
    group1: {
        control1: {
            required: '请输入用户名',
            maxLength: '用户名最多5位'
        },
        control2: {
            required: '请输入性别'
        }
    }
};
var FormGroupValidComponent = /** @class */ (function () {
    function FormGroupValidComponent(fb, gbValidServ) {
        this.fb = fb;
        this.gbValidServ = gbValidServ;
        this.validErrorMsg = VALID_ERROR_MSG;
        this.form = fb.group({
            username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            user: fb.group({
                nickname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
                sex: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
            }),
            group1: fb.group({
                control1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, new _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__["EmailValidtor"]()]],
                control2: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
            }),
        });
    }
    FormGroupValidComponent.prototype.ngOnInit = function () {
    };
    FormGroupValidComponent.prototype.handleSubmit = function () {
        this.gbValidServ.validAll();
    };
    FormGroupValidComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-form-group-valid',
            template: __webpack_require__(/*! ./form-group-valid.component.html */ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.html"),
            styles: [__webpack_require__(/*! ./form-group-valid.component.css */ "./src/app/form-group-valid/form-group-valid/form-group-valid.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__["GlobalValidService"]])
    ], FormGroupValidComponent);
    return FormGroupValidComponent;
}());



/***/ }),

/***/ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/form-group-valid/form-valid-only/form-valid-only.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/form-group-valid/form-valid-only/form-valid-only.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\" [isliFormValidMsg]=\"validErrorMsg\">\n  <h3>整个form表单只有一个验证显示，此时一定要配置controlName</h3>\n  <dl>\n    <dt>用户名</dt>\n    <dd>\n      <input type=\"text\" formControlName=\"username\">\n    </dd>\n    <dt>密码</dt>\n    <dd>\n      <input type=\"password\" formControlName=\"password\">\n    </dd>\n  </dl>\n  <dl formGroupName=\"user\">\n    <dt>昵称</dt>\n    <dd>\n      <input type=\"text\" formControlName=\"nickname\">\n    </dd>\n    <dt>性别</dt>\n    <dd>\n      <span>\n          <label>男</label>\n          <input type=\"radio\" name=\"sex\" formControlName=\"sex\" value=\"1\">\n      </span>\n      <span>\n        <label>女</label>\n        <input type=\"radio\" name=\"sex\" formControlName=\"sex\" value=\"2\">\n      </span>\n    </dd>\n  </dl>\n  <dl formGroupName=\"group1\">\n    <h3>只使用一个pr-form-control-valid显示所有control的错误消息</h3>\n    <dt>contorl1</dt>\n    <dd>\n      <input type=\"text\" formControlName=\"control1\">\n    </dd>\n    <dt>contorl2</dt>\n    <dd>\n      <input type=\"text\" formControlName=\"control2\">\n    </dd>\n  </dl>\n  <mpr-form-control-valid controlName=\"form\"></mpr-form-control-valid>\n  <dl>\n    <dd>\n      <input type=\"button\" value=\"确定\" (click)=\"handleSubmit()\">\n    </dd>\n  </dl>\n</div>"

/***/ }),

/***/ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/form-group-valid/form-valid-only/form-valid-only.component.ts ***!
  \*******************************************************************************/
/*! exports provided: FormValidOnlyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormValidOnlyComponent", function() { return FormValidOnlyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dist/form-valid */ "./dist/form-valid/fesm5/form-valid.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VALID_ERROR_MSG = {
    form: {
        username: { required: '请输入邮箱' },
        password: { required: '请输入密码' },
        user: {
            nickname: {
                required: '请输入用户名',
                maxLength: '用户名最多5位'
            },
            sex: {
                required: '请输入性别'
            }
        },
        group1: {
            control1: {
                required: '请输入用户名',
                maxLength: '用户名最多5位'
            },
            control2: {
                required: '请输入性别'
            }
        }
    }
};
var FormValidOnlyComponent = /** @class */ (function () {
    function FormValidOnlyComponent(fb, gbValidServ) {
        this.fb = fb;
        this.gbValidServ = gbValidServ;
        this.validErrorMsg = VALID_ERROR_MSG;
        this.form = fb.group({
            username: ['', [new _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__["EmailValidtor"](), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            user: fb.group({
                nickname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
                sex: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
            }),
            group1: fb.group({
                control1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, new _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__["EmailValidtor"]()]],
                control2: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
            }),
        });
    }
    FormValidOnlyComponent.prototype.ngOnInit = function () {
    };
    FormValidOnlyComponent.prototype.handleSubmit = function () {
        this.gbValidServ.validAll();
    };
    FormValidOnlyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-form-valid-only',
            template: __webpack_require__(/*! ./form-valid-only.component.html */ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.html"),
            styles: [__webpack_require__(/*! ./form-valid-only.component.css */ "./src/app/form-group-valid/form-valid-only/form-valid-only.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _dist_form_valid__WEBPACK_IMPORTED_MODULE_2__["GlobalValidService"]])
    ], FormValidOnlyComponent);
    return FormValidOnlyComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\GIT\mpr-form-valid\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map