import { Injectable, Component, ContentChild, TemplateRef, Input, ElementRef, Attribute, Optional, Directive, forwardRef, NgModule } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupName, FormGroupDirective, NgModelGroup, NG_VALIDATORS } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 全局验证消息， 存储默认消息
 */
class GlobalValidMsgService {
    constructor() {
        this.validMsg = new Map();
    }
    /**
     * 设置错误key的默认消息
     * @param {?} msgKey 错误key
     * @param {?} msgValue 错误消息
     * @return {?}
     */
    registerMsg(msgKey, msgValue) {
        if (!msgKey || !msgValue) {
            throw new Error('msg key and value must not empty');
        }
        this.validMsg.set(msgKey, msgValue);
    }
    /**
     * @param {?} msgKey
     * @return {?}
     */
    getMsg(msgKey) {
        if (!msgKey) {
            return null;
        }
        return this.validMsg.get(msgKey);
    }
}
const /** @type {?} */ globalValidMsgServ = new GlobalValidMsgService();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormValidMsgService {
    constructor() {
        this.validMsg = {};
    }
    /**
     * @param {?} msgKey
     * @param {?} msgValue
     * @return {?}
     */
    setValidMsg(msgKey, msgValue) {
        if (!msgValue) {
            return;
        }
        this.validMsg[msgKey] = msgValue;
    }
    /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    getValidMsg(msgPath, error) {
        if (!error || !msgPath) {
            return '';
        }
        for (const /** @type {?} */ name in error) {
            if (error[name]) {
                return this.validMsg[msgPath + '.' + name] || globalValidMsgServ.getMsg(name);
            }
        }
        return '';
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    resetMsg(msg) {
        if (typeof msg !== 'object') {
            throw Error('form valid msg must be a object');
        }
        this.validMsg = {};
        for (const /** @type {?} */ name in msg) {
            if (typeof msg[name] !== 'object') {
                this.validMsg[name] = msg[name];
            }
            else {
                this.formatMsg(msg[name], name, this.validMsg);
            }
        }
    }
    /**
     * @param {?} msg
     * @param {?} path
     * @param {?} result
     * @return {?}
     */
    formatMsg(msg, path, result) {
        for (const /** @type {?} */ name in msg) {
            if (typeof msg[name] !== 'object') {
                result[path + '.' + name] = msg[name];
            }
            else {
                this.formatMsg(msg[name], path + '.' + name, result);
            }
        }
    }
}
FormValidMsgService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormValidMsgService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GlobalValidService {
    constructor() {
        this.validForms = [];
    }
    /**
     * @param {?} form
     * @return {?}
     */
    registerValidForm(form) {
        const /** @type {?} */ index = this.validForms.findIndex(elem => {
            return elem.form == form;
        });
        if (index >= 0) {
            this.validForms[index].count += 1;
        }
        else {
            this.validForms.push({ form: form, count: 1 });
        }
    }
    /**
     * @return {?}
     */
    validAll() {
        let /** @type {?} */ result = true;
        this.validForms.forEach(elemForm => {
            // elemForm.markAsDirty({onlySelf: true});
            // if (elemForm instanceof FormGroup) {
            //   this.validFormGroup(elemForm);
            // }
            elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
            result = elemForm.form.valid && result;
        });
        return result;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    unregisterValidForm(form) {
        const /** @type {?} */ index = this.validForms.findIndex(elem => {
            return elem.form == form;
        });
        if (index >= 0 && this.validForms[index].count > 1) {
            this.validForms[index].count -= 1;
        }
        else {
            this.validForms.splice(index, 1);
        }
    }
}
GlobalValidService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GlobalValidService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ VALID_COMPONENT_NAME = 'mpr-form-control-valid';
class FormControlValidComponent {
    /**
     * @param {?} controlName
     * @param {?} container
     * @param {?} errMsgServ
     * @param {?} globalValidServ
     * @param {?} elemRef
     */
    constructor(controlName, container, errMsgServ, globalValidServ, elemRef) {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        //  兼容ngFrom
        Promise.resolve(null).then(() => {
            this.bindControlErrorMsg();
        });
    }
    /**
     * @return {?}
     */
    bindControlErrorMsg() {
        this.controlName = this.getFormControlName();
        if (!this.controlName) {
            throw new Error("can't find controlName");
        }
        console.log(this.controlName);
        let /** @type {?} */ path = '';
        if (this.groupValidControlLength <= 1) {
            // from root or from formGroupName
            this.formControl = this.container.control;
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.valueChanges.subscribe(() => {
                if (this.onlyGroup) {
                    this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors);
                }
                else {
                    this.errorMsg = this.getGroupControlValidMsg(/** @type {?} */ (this.formControl), path || this.controlName);
                }
            });
        }
        else {
            this.formControl = this.container.control.get(this.controlName);
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.valueChanges.subscribe(() => {
                this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors);
            });
        }
        if (!this.formControl) {
            throw new Error('formControl instance not find');
        }
        this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl);
    }
    /**
     * 获取group下面的所有验证错误消息
     * @param {?} control
     * @param {?} path
     * @return {?}
     */
    getGroupControlValidMsg(control, path) {
        if (control instanceof FormControl) {
            return this.errMsgServ.getValidMsg(path, control.errors);
        }
        let /** @type {?} */ msg;
        for (let /** @type {?} */ name in control.controls) {
            msg = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name)), path + '.' + name);
            if (msg) {
                return msg;
            }
        }
        return this.errMsgServ.getValidMsg(path, control.errors);
    }
    /**
     * @return {?}
     */
    getParentGroupELem() {
        let /** @type {?} */ parentElement = this.elemRef.nativeElement.parentElement;
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
    }
    /**
     * @param {?} searchElem
     * @return {?}
     */
    getSlibingFormContrlElem(searchElem) {
        let /** @type {?} */ previousSibling = searchElem.previousElementSibling;
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
    }
    /**
     * 自动查找当前验证对应的formControlName或者formGroupName
     * @return {?}
     */
    getFormControlName() {
        if (this.controlName) {
            // 手动设定了controlName
            return this.controlName;
        }
        let /** @type {?} */ controlName;
        if (!this.container) {
            throw new Error('only one [formControl] not support, There must be a formGroupName or [formGroup]');
        }
        else {
            const /** @type {?} */ parentElement = this.getParentGroupELem();
            const /** @type {?} */ groupValidControlLength = parentElement.querySelectorAll(VALID_COMPONENT_NAME).length;
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
                const /** @type {?} */ siblingElem = this.getSlibingFormContrlElem(this.elemRef.nativeElement);
                controlName = siblingElem.getAttribute('formcontrolname') ||
                    siblingElem.getAttribute('formControlName') ||
                    siblingElem.getAttribute('name');
            }
        }
        // if(this.controlName && this.controlName != controlName){
        //   throw new Error(`you may set a error controlName, you set is: ${this.controlName}, but need is: ${controlName}`);
        // }
        return controlName;
    }
    /**
     * 获取当前formControl相对于formGroup的path
     * @param {?} formControl
     * @param {?} root
     * @param {?} controlName
     * @return {?}
     */
    getPath(formControl, root, controlName) {
        if (!(root instanceof FormGroup)) {
            if (formControl === root) {
                return controlName;
            }
            return '';
        }
        const /** @type {?} */ path = [];
        for (const /** @type {?} */ ctrlName in root['controls']) {
            if (root['controls'][ctrlName] === formControl) {
                return ctrlName;
            }
            if (root['controls'][ctrlName] instanceof FormGroup) {
                const /** @type {?} */ tmpPath = this.getPath(formControl, root['controls'][ctrlName], controlName);
                if (tmpPath) {
                    path.push(ctrlName);
                    path.push(tmpPath);
                    return path.join('.');
                }
            }
        }
        return path.join('.');
    }
}
FormControlValidComponent.decorators = [
    { type: Component, args: [{
                selector: VALID_COMPONENT_NAME,
                template: `<span
    class="error"
    [ngClass]="errorPrompt"
    [hidden]="!errorMsg"
>
    <ng-container
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{errorMsg:errorMsg}"
    ></ng-container>
    <p *ngIf="!template">{{errorMsg}}</p>
</span>
`,
                styles: [`p{width:100%;height:17px;line-height:17px;color:#e06a2f;float:left}`]
            },] },
];
/** @nocollapse */
FormControlValidComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['controlName',] }] },
    { type: ControlContainer, decorators: [{ type: Optional }] },
    { type: FormValidMsgService },
    { type: GlobalValidService },
    { type: ElementRef }
];
FormControlValidComponent.propDecorators = {
    onlyGroup: [{ type: Input }],
    errorPrompt: [{ type: Input }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormValidMsgDirective {
    /**
     * @param {?} msgServ
     */
    constructor(msgServ) {
        this.msgServ = msgServ;
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    set validMsg(msg) {
        if (msg) {
            this.msgServ.resetMsg(msg);
        }
    }
}
FormValidMsgDirective.decorators = [
    { type: Directive, args: [{
                selector: '[isliFormValidMsg]',
                providers: [FormValidMsgService]
            },] },
];
/** @nocollapse */
FormValidMsgDirective.ctorParameters = () => [
    { type: FormValidMsgService }
];
FormValidMsgDirective.propDecorators = {
    validMsg: [{ type: Input, args: ['isliFormValidMsg',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ ISBN_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IsbnValidtorDirective),
    multi: true
};
class IsbnValidtorDirective {
    constructor() {
        globalValidMsgServ.registerMsg('isbn', '请输入正确的ISBN号');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        if (!(c instanceof FormGroup)) {
            throw new Error('isbn must be a group control');
        }
        const /** @type {?} */ isbn = c.value;
        // 不验证非空
        if (!isbn.isbn1 || !isbn.isbn2 || !isbn.isbn3 || !isbn.isbn4 || !isbn.isbn5) {
            return null;
        }
        if (this.validISBNCode([isbn.isbn1, isbn.isbn2, isbn.isbn3, isbn.isbn4, isbn.isbn5].join(''))) {
            return { isbn: true };
        }
        return null;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    validISBNCode(s) {
        if (s === '9999999999999') {
            return true;
        }
        if (!this.isBarCode(s)) {
            return false;
        }
        let /** @type {?} */ a = 0, /** @type {?} */ b = 0, /** @type {?} */ c = 0, /** @type {?} */ d = 0, /** @type {?} */ e;
        for (let /** @type {?} */ i = 1; i <= 12; i++) {
            const /** @type {?} */ sc = parseInt(s[i - 1], 10);
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
    }
    /**
     * @param {?} s
     * @return {?}
     */
    isBarCode(s) {
        if (s.length !== 13) {
            return false;
        }
        const /** @type {?} */ reg = new RegExp(/^[0-9]{12}$/);
        return reg.exec(s.substring(0, 12)) != null;
    }
}
IsbnValidtorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mprIsbnValid]',
                providers: [ISBN_VALIDTOR]
            },] },
];
/** @nocollapse */
IsbnValidtorDirective.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ ISBN_PART_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IsbnPartValidDirective),
    multi: true
};
class IsbnPartValidDirective {
    constructor() {
        globalValidMsgServ.registerMsg('isbnPart34', '第三组和第四组一共为8位数字');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        if (!(c instanceof FormGroup)) {
            throw new Error('isbn must be a group control');
        }
        const /** @type {?} */ isbn = c.value;
        if (!isbn.isbn3 || !isbn.isbn4) {
            return null;
        }
        // 验证第三组和第四组一共为8位数字
        if (isbn.isbn3.length + isbn.isbn4.length !== 8) {
            return { isbnPart34: true };
        }
        return null;
    }
}
IsbnPartValidDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mprIsbnPartValid]',
                providers: [ISBN_PART_VALIDTOR]
            },] },
];
/** @nocollapse */
IsbnPartValidDirective.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ ISBN_HEADER_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IsbnHeaderValidDirective),
    multi: true
};
class IsbnHeaderValidDirective {
    constructor() {
        globalValidMsgServ.registerMsg('isbnHeader', '第一组必须为978或979');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        if (!c.value) {
            return null;
        }
        if (['999', '978', '979', '000'].indexOf(c.value) < 0) {
            return { isbnHeader: true };
        }
        return null;
    }
}
IsbnHeaderValidDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mprIsbnHeaderValid]',
                providers: [ISBN_HEADER_VALIDTOR]
            },] },
];
/** @nocollapse */
IsbnHeaderValidDirective.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ FLOAT_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FloatValidtor),
    multi: true
};
class FloatValidtor {
    constructor() {
        globalValidMsgServ.registerMsg('float', '请输入浮点数');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        const /** @type {?} */ floatVal = parseFloat('' + c.value);
        if (isNaN(floatVal)) {
            return { float: true };
        }
        return null;
    }
}
FloatValidtor.decorators = [
    { type: Directive, args: [{
                selector: '[mprFloatOnly]',
                providers: [FLOAT_VALIDTOR]
            },] },
];
/** @nocollapse */
FloatValidtor.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ PRICE_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PriceValidtor),
    multi: true
};
class PriceValidtor {
    constructor() {
        globalValidMsgServ.registerMsg('price', '价格为两位小数');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        const /** @type {?} */ price = '' + c.value;
        if (/^\d+(.\d{0,2})?$/.test(price)) {
            return null;
        }
        return { price: true };
    }
}
PriceValidtor.decorators = [
    { type: Directive, args: [{
                selector: '[mprPriceValid]',
                providers: [PRICE_VALIDTOR]
            },] },
];
/** @nocollapse */
PriceValidtor.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ EMAIL_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailValidtor),
    multi: true
};
class EmailValidtor {
    constructor() {
        globalValidMsgServ.registerMsg('emailError', '请输入合法的邮箱');
    }
    /**
     * @param {?} contorl
     * @return {?}
     */
    validate(contorl) {
        const /** @type {?} */ email = contorl.value;
        if (!email) {
            // 允许为空
            return null;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email)) {
            return { emailError: true };
        }
        return null;
    }
}
EmailValidtor.decorators = [
    { type: Directive, args: [{
                selector: '[mprEmailValid]',
                providers: [EMAIL_VALIDTOR]
            },] },
];
/** @nocollapse */
EmailValidtor.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormValidModule {
}
FormValidModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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

export { FormValidModule, GlobalValidService, FloatValidtor, PriceValidtor, EmailValidtor, IsbnHeaderValidDirective, IsbnPartValidDirective, IsbnValidtorDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZm9ybS12YWxpZC9saWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZS50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi12YWxpZHRvci5kaXJlY3RpdmUudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci50cyIsIm5nOi8vZm9ybS12YWxpZC9saWIvdmFsaWR0b3JzL3ByaWNlLXZhbGlkdG9yLnRzIiwibmc6Ly9mb3JtLXZhbGlkL2xpYi92YWxpZHRvcnMvZW1haWwtdmFsaWR0b3IudHMiLCJuZzovL2Zvcm0tdmFsaWQvbGliL2Zvcm0tdmFsaWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDDpcKFwqjDpcKxwoDDqcKqwozDqMKvwoHDpsK2wojDpsKBwq/Dr8K8wowgw6XCrcKYw6XCgsKow6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSB2YWxpZE1zZyA9IG5ldyBNYXA8U3RyaW5nLCBTdHJpbmc+KCk7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogw6jCrsK+w6fCvcKuw6nClMKZw6jCr8Kva2V5w6fCmsKEw6nCu8KYw6jCrsKkw6bCtsKIw6bCgcKvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDDqcKUwpnDqMKvwq9rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUgw6nClMKZw6jCr8Kvw6bCtsKIw6bCgcKvXHJcbiAgICovXHJcbiAgcHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LCBtc2dWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TXNnKG1zZ0tleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ0tleSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnZhbGlkTXNnLmdldChtc2dLZXkpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5XSA9IG1zZ1ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFZhbGlkTXNnKG1zZ1BhdGg6IHN0cmluZywgZXJyb3IpIHtcclxuICAgIGlmICghZXJyb3IgfHwgIW1zZ1BhdGgpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvcltuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkTXNnW21zZ1BhdGggKyAnLicgKyBuYW1lXSB8fCBnbG9iYWxWYWxpZE1zZ1NlcnYuZ2V0TXNnKG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRNc2cobXNnOiBPYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgbXNnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcignZm9ybSB2YWxpZCBtc2cgbXVzdCBiZSBhIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lXSA9IG1zZ1tuYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZvcm1hdE1zZyhtc2dbbmFtZV0sIG5hbWUsIHRoaXMudmFsaWRNc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdE1zZyhtc2c6IE9iamVjdCwgcGF0aDogc3RyaW5nLCByZXN1bHQ6IE9iamVjdCkge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXN1bHRbcGF0aCArICcuJyArIG5hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZFNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkRm9ybXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyVmFsaWRGb3JtKGZvcm06IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbGlkRm9ybXMuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgICByZXR1cm4gZWxlbS5mb3JtID09IGZvcm07XHJcbiAgICB9KTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtc1tpbmRleF0uY291bnQgKz0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmFsaWRGb3Jtcy5wdXNoKHsgZm9ybTogZm9ybSwgY291bnQ6IDEgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRBbGwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMudmFsaWRGb3Jtcy5mb3JFYWNoKGVsZW1Gb3JtID0+IHtcclxuICAgICAgLy8gZWxlbUZvcm0ubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XHJcbiAgICAgIC8vIGlmIChlbGVtRm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAvLyAgIHRoaXMudmFsaWRGb3JtR3JvdXAoZWxlbUZvcm0pO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIGVsZW1Gb3JtLmZvcm0ucGF0Y2hWYWx1ZShlbGVtRm9ybS5mb3JtLnZhbHVlLCB7IGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2UsIG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gICAgICByZXN1bHQgPSBlbGVtRm9ybS5mb3JtLnZhbGlkICYmIHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnJlZ2lzdGVyVmFsaWRGb3JtKGZvcm0pIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWxpZEZvcm1zLmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uZm9ybSA9PSBmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50ID4gMSkge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXNbaW5kZXhdLmNvdW50IC09IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbGlkRm9ybXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgdmFsaWRGb3JtR3JvdXAoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcclxuICAvLyAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAvLyAgIGNvbnN0IGZvcm1Db250cm9scyA9IGZvcm1Hcm91cC5jb250cm9scztcclxuICAvLyAgIGZvciAoY29uc3QgbmFtZSBpbiBmb3JtQ29udHJvbHMpIHtcclxuICAvLyAgICAgaWYgKGZvcm1Db250cm9sc1tuYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gIC8vICAgICAgIHRoaXMudmFsaWRGb3JtR3JvdXAoPEZvcm1Hcm91cD5mb3JtQ29udHJvbHNbbmFtZV0pO1xyXG4gIC8vICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgIGZvcm1Db250cm9sc1tuYW1lXS5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBBdHRyaWJ1dGUsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lciwgQWJzdHJhY3RDb250cm9sLCBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsXHJcbiAgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUdyb3VwTmFtZSwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cbiAgICBjbGFzcz1cImVycm9yXCJcbiAgICBbbmdDbGFzc109XCJlcnJvclByb21wdFwiXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxuPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Vycm9yTXNnOmVycm9yTXNnfVwiXG4gICAgPjwvbmctY29udGFpbmVyPlxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxuPC9zcGFuPlxuYCxcclxuICBzdHlsZXM6IFtgcHt3aWR0aDoxMDAlO2hlaWdodDoxN3B4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6I2UwNmEyZjtmbG9hdDpsZWZ0fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgLy/DpcKPwqrDpsKYwr7Dp8Kkwrpmb3JtZ3JvdXDDpsKcwqzDqMK6wqvDp8KawoTDqcKUwpnDqMKvwq/Dr8K8wozDpMK4wo3DpsKYwr7Dp8Kkwrpncm91cMOkwrjCi2NvbnRyb2zDp8KawoTDqcKUwpnDqMKvwq9cclxuICBASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlcnJvclByb21wdDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBlcnJvck1zZzogc3RyaW5nOyAvL8OpwqrCjMOowq/CgcOlwqTCscOowrTCpcOmwpjCvsOnwqTCusOnwprChMOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG5cclxuICBwcml2YXRlIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgcHJpdmF0ZSBjb250cm9sTmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gIMOlwoXCvMOlwq7CuW5nRnJvbVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuICAgIHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBpZiAodGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpZncm91cMOkwrjCi8Opwp3CosOnwprChMOmwonCgMOmwpzCicOpwqrCjMOowq/CgcOpwpTCmcOowq/Cr8OmwrbCiMOmwoHCr1xyXG4gICAqIEBwYXJhbSBjb250cm9sIFxyXG4gICAqIEBwYXJhbSBwYXRoIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICAgIH1cclxuICAgIGxldCBtc2c7XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgbXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSk7XHJcbiAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGgsIGNvbnRyb2wuZXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyZW50R3JvdXBFTGVtKCk6IEVsZW1lbnQge1xyXG4gICAgbGV0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgLy8gY29uc3QgYXJydHJpYnV0ZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcygpO1xyXG4gICAgY29uc29sZS5sb2cocGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpKTtcclxuICAgIHdoaWxlICghcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1Hcm91cE5hbWUnKVxyXG4gICAgICAmJiAhcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3QtZm9ybScpXHJcbiAgICAgICYmICEocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScpXHJcbiAgICAgICYmICEocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnbmdmb3JtJykpIHtcclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGZpbmQgcGFyZW50RWxlbWVudFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIHdoaWxlIChwcmV2aW91c1NpYmxpbmcgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XHJcbiAgICAgIC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIH1cclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIMOowofCqsOlworCqMOmwp/CpcOmwonCvsOlwr3Ck8OlwonCjcOpwqrCjMOowq/CgcOlwq/CucOlwrrClMOnwprChGZvcm1Db250cm9sTmFtZcOmwojClsOowoDChWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgLy8gw6bCicKLw6XCisKow6jCrsK+w6XCrsKaw6TCusKGY29udHJvbE5hbWVcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xOYW1lO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuICAgICAgY29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuICAgICAgdGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIMOnwpvCtMOmwo7CpcOmwpjCr8OmwqDCucOoworCgsOnwoLCucOlwq/CucOlwrrClMOmwpXCtMOkwrjCqmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG4gICAgICAgIC8vIMOmwpXCtMOkwrjCqmZvcm3DqMKhwqjDpcKNwpXDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkw6/CvMKMw6XCiMKZw6TCu8Klw6XCvcKTw6XCicKNZm9ybUdyb3Vww6XCr8K5w6XCusKUw6fCmsKEw6XCj8KYw6nCh8KPw6XCkMKNw6TCuMK6Y29udHJvbE5hbWVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDDp8KIwrbDqMKKwoLDp8KCwrnDpsKYwq9mb3Jtw6jCocKow6XCjcKVw6TCuMKtw6bCn8KQw6TCuMKqZ3JvdXBcclxuICAgICAgICAvLyDDpsKVwrTDpMK4wqpncm91cMOlwo/CqsOmwpzCicOkwrjCgMOkwrjCqm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDDpMK8wpjDpcKFwojDpcKPwpZmcm9tR3JvdXDDp8KawoTDqcKqwozDqMKvwoFcclxuICAgICAgICBjb250cm9sTmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgfHwgcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zyb21Hcm91cE5hbWUnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8gw6fCiMK2w6jCisKCw6fCgsK5w6bCmMKvZm9ybcOowqHCqMOlwo3ClcOkwrjCrcOmwp/CkMOkwrjCqmdyb3VwXHJcbiAgICAgICAgLy8gw6bClcK0w6TCuMKqZ3JvdXDDpcKPwqrDpsKcwonDpMK4woDDpMK4wqptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8gw6TCvMKYw6XChcKIw6XCj8KWZnJvbUdyb3Vww6fCmsKEw6nCqsKMw6jCr8KBXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSB0aGlzLmNvbnRhaW5lci5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1wci1mb3JtLWNvbnRyb2wtdmFsaWQgw6XCr8K5w6XCusKUw6TCuMKAw6TCuMKqIGZvcm1Db250cm9sTmFtZVxyXG4gICAgICAgIC8vIMOlwpDCkcOlwonCjcOmwp/CpcOmwonCvsOlwoXChMOlwrzCn8OoworCgsOnwoLCuVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmdFbGVtID0gdGhpcy5nZXRTbGliaW5nRm9ybUNvbnRybEVsZW0odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSB8fFxyXG4gICAgICAgICAgc2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGlmKHRoaXMuY29udHJvbE5hbWUgJiYgdGhpcy5jb250cm9sTmFtZSAhPSBjb250cm9sTmFtZSl7XHJcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihgeW91IG1heSBzZXQgYSBlcnJvciBjb250cm9sTmFtZSwgeW91IHNldCBpczogJHt0aGlzLmNvbnRyb2xOYW1lfSwgYnV0IG5lZWQgaXM6ICR7Y29udHJvbE5hbWV9YCk7XHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDDqMKOwrfDpcKPwpbDpcK9wpPDpcKJwo1mb3JtQ29udHJvbMOnwpvCuMOlwq/CucOkwrrCjmZvcm1Hcm91cMOnwprChHBhdGhcclxuICAgKiBAcGFyYW0gZm9ybUNvbnRyb2wgXHJcbiAgICogQHBhcmFtIHJvb3QgXHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UGF0aChmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sLCByb290LCBjb250cm9sTmFtZSkge1xyXG4gICAgaWYgKCEocm9vdCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuICAgICAgaWYgKGZvcm1Db250cm9sID09PSByb290KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGggPSBbXTtcclxuICAgIGZvciAoY29uc3QgY3RybE5hbWUgaW4gcm9vdFsnY29udHJvbHMnXSkge1xyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gPT09IGZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgcmV0dXJuIGN0cmxOYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHRtcFBhdGggPSB0aGlzLmdldFBhdGgoZm9ybUNvbnRyb2wsIHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdLCBjb250cm9sTmFtZSk7XHJcbiAgICAgICAgaWYgKHRtcFBhdGgpIHtcclxuICAgICAgICAgIHBhdGgucHVzaChjdHJsTmFtZSk7XHJcbiAgICAgICAgICBwYXRoLnB1c2godG1wUGF0aCk7XHJcbiAgICAgICAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lzbGlGb3JtVmFsaWRNc2ddJyxcclxuICBwcm92aWRlcnM6IFtGb3JtVmFsaWRNc2dTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCdpc2xpRm9ybVZhbGlkTXNnJykgc2V0IHZhbGlkTXNnKG1zZykge1xyXG4gICAgaWYgKG1zZykge1xyXG4gICAgICB0aGlzLm1zZ1NlcnYucmVzZXRNc2cobXNnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU0JOIHtcbiAgaXNibjE6IHN0cmluZztcbiAgaXNibjI6IHN0cmluZztcbiAgaXNibjM6IHN0cmluZztcbiAgaXNibjQ6IHN0cmluZztcbiAgaXNibjU6IHN0cmluZztcbn1cblxuY29uc3QgSVNCTl9WQUxJRFRPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm4nLCAnw6jCr8K3w6jCvsKTw6XChcKlw6bCrcKjw6fCocKuw6fCmsKESVNCTsOlwo/CtycpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcbiAgICB9XG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XG4gICAgLy8gw6TCuMKNw6nCqsKMw6jCr8KBw6nCncKew6fCqcK6XG4gICAgaWYgKCFpc2JuLmlzYm4xIHx8ICFpc2JuLmlzYm4yIHx8ICFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40IHx8ICFpc2JuLmlzYm41KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcbiAgICAgIHJldHVybiB7IGlzYm46IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xuICAgIGlmIChzID09PSAnOTk5OTk5OTk5OTk5OScpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNCYXJDb2RlKHMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBhID0gMCwgYiA9IDAsIGMgPSAwLCBkID0gMCwgZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XG4gICAgICBpZiAoaSA8PSAxMiAmJiBpICUgMiA9PT0gMCkge1xuICAgICAgICBhICs9IHNjO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XG4gICAgICAgIGIgKz0gc2M7XG4gICAgICB9XG4gICAgfVxuICAgIGMgPSBhICogMztcbiAgICBkID0gYiArIGM7XG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xuICAgICAgZSA9IGQgLSBkO1xuICAgIH0gZWxzZSB7XG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xuICAgIH1cbiAgICByZXR1cm4gZSA9PT0gcGFyc2VJbnQoc1sxMl0sIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNCYXJDb2RlKHMpOiBib29sZWFuIHtcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XG4gICAgcmV0dXJuIHJlZy5leGVjKHMuc3Vic3RyaW5nKDAsIDEyKSkgIT0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSVNCTiB9IGZyb20gJy4vaXNibi12YWxpZHRvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuY29uc3QgSVNCTl9QQVJUX1ZBTElEVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJc2JuUGFydFZhbGlkRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuUGFydFZhbGlkXScsXG4gIHByb3ZpZGVyczogW0lTQk5fUEFSVF9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuUGFydDM0JywgJ8OnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpcnKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoIShjIGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc2JuIG11c3QgYmUgYSBncm91cCBjb250cm9sJyk7XG4gICAgfVxuICAgIGNvbnN0IGlzYm46IElTQk4gPSBjLnZhbHVlO1xuICAgIGlmICghaXNibi5pc2JuMyB8fCAhaXNibi5pc2JuNCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIMOpwqrCjMOowq/CgcOnwqzCrMOkwrjCicOnwrvChMOlwpLCjMOnwqzCrMOlwpvCm8OnwrvChMOkwrjCgMOlwoXCscOkwrjCujjDpMK9wo3DpsKVwrDDpcKtwpdcbiAgICBpZiAoaXNibi5pc2JuMy5sZW5ndGggKyBpc2JuLmlzYm40Lmxlbmd0aCAhPT0gOCkge1xuICAgICAgcmV0dXJuIHsgaXNiblBhcnQzNDogdHJ1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xuXG5jb25zdCBJU0JOX0hFQURFUl9WQUxJRFRPUiA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9IRUFERVJfVkFMSURUT1JdXG59KVxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ8OnwqzCrMOkwrjCgMOnwrvChMOlwr/ChcOpwqHCu8OkwrjCujk3OMOmwojCljk3OScpO1xuICB9XG5cbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgaWYgKCFjLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKFsnOTk5JywgJzk3OCcsICc5NzknLCAnMDAwJ10uaW5kZXhPZihjLnZhbHVlKSA8IDApIHtcbiAgICAgIHJldHVybiB7IGlzYm5IZWFkZXI6IHRydWV9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgRkxPQVRfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmxvYXRWYWxpZHRvciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttcHJGbG9hdE9ubHldJyxcclxuICAgIHByb3ZpZGVyczogW0ZMT0FUX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxvYXRWYWxpZHRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2Zsb2F0JywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOmwrXCrsOnwoLCucOmwpXCsCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICBjb25zdCBmbG9hdFZhbCA9IHBhcnNlRmxvYXQoJycgKyBjLnZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4oZmxvYXRWYWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGZsb2F0OiB0cnVlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBQUklDRV9WQUxJRFRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQcmljZVZhbGlkdG9yKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21wclByaWNlVmFsaWRdJyxcclxuICAgIHByb3ZpZGVyczogW1BSSUNFX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpY2VWYWxpZHRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdwcmljZScsICfDpMK7wrfDpsKgwrzDpMK4wrrDpMK4wqTDpMK9wo3DpcKwwo/DpsKVwrAnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgY29uc3QgcHJpY2UgPSAnJyArIGMudmFsdWU7XHJcbiAgICAgICAgaWYgKC9eXFxkKyguXFxkezAsMn0pPyQvLnRlc3QocHJpY2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBwcmljZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5jb25zdCBFTUFJTF9WQUxJRFRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBFbWFpbFZhbGlkdG9yKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21wckVtYWlsVmFsaWRdJyxcclxuICAgIHByb3ZpZGVyczogW0VNQUlMX1ZBTElEVE9SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZHRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdlbWFpbEVycm9yJywgJ8Oowq/Ct8Oowr7Ck8OlwoXCpcOlwpDCiMOmwrPClcOnwprChMOpwoLCrsOnwq7CsScpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKGNvbnRvcmw6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IGVtYWlsID0gY29udG9ybC52YWx1ZTtcclxuICAgICAgICBpZiAoIWVtYWlsKSB7IC8vIMOlwoXCgcOowq7CuMOkwrjCusOnwqnCulxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEvXlthLXpBLVowLTlfLV0rQFthLXpBLVowLTlfLV0rKFxcLlthLXpBLVowLTlfLV0rKSskL2cudGVzdChlbWFpbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZW1haWxFcnJvcjogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1jb250cm9sLXZhbGlkL2Zvcm0tY29udHJvbC12YWxpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybS12YWxpZC1tc2cuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJc2JuVmFsaWR0b3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElzYm5QYXJ0VmFsaWREaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkdG9ycy9pc2JuLXBhcnQtdmFsaWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZHRvcnMvaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRW1haWxWYWxpZHRvciwgRmxvYXRWYWxpZHRvciwgUHJpY2VWYWxpZHRvciB9IGZyb20gJy4vdmFsaWR0b3JzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db250cm9sVmFsaWRDb21wb25lbnQsXHJcbiAgICBGb3JtVmFsaWRNc2dEaXJlY3RpdmUsXHJcbiAgICBJc2JuVmFsaWR0b3JEaXJlY3RpdmUsXHJcbiAgICBJc2JuUGFydFZhbGlkRGlyZWN0aXZlLFxyXG4gICAgSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlLFxyXG4gICAgRW1haWxWYWxpZHRvcixcclxuICAgIEZsb2F0VmFsaWR0b3IsXHJcbiAgICBQcmljZVZhbGlkdG9yXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50LFxyXG4gICAgRm9ybVZhbGlkTXNnRGlyZWN0aXZlLFxyXG4gICAgSXNiblZhbGlkdG9yRGlyZWN0aXZlLFxyXG4gICAgSXNiblBhcnRWYWxpZERpcmVjdGl2ZSxcclxuICAgIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSxcclxuICAgIEVtYWlsVmFsaWR0b3IsXHJcbiAgICBGbG9hdFZhbGlkdG9yLFxyXG4gICAgUHJpY2VWYWxpZHRvclxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcbiAgICBGb3JtVmFsaWRNc2dTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQTtJQUdFO3dCQURtQixJQUFJLEdBQUcsRUFBa0I7S0FDM0I7Ozs7Ozs7SUFPVixXQUFXLENBQUMsTUFBYyxFQUFFLFFBQWdCO1FBQ2pELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFB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