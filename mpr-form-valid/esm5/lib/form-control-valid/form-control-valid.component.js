/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, TemplateRef, Input, ElementRef, Attribute, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupName, FormGroupDirective, NgModelGroup } from '@angular/forms';
import { FormValidMsgService } from '../services/form-valid-msg.service';
import { GlobalValidService } from '../services/global-valid.service';
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
    function () { };
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
        var /** @type {?} */ isFormControl = this.container.control.get(this.controlName) &&
            this.container.control.get(this.controlName) instanceof FormControl;
        if (!isFormControl) {
            // from root or from formGroupName
            this.formControl = this.container.control;
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(function () {
                if (_this.formControl.pristine) {
                    return;
                }
                if (_this.onlyGroup) {
                    _this.errorMsg = _this.errMsgServ.getValidMsg(path || _this.controlName, _this.formControl.errors)['errorMsg'];
                }
                else {
                    _this.errorMsg = _this.getGroupControlValidMsg(/** @type {?} */ (_this.formControl), path || _this.controlName, {
                        minWeight: Number.MAX_VALUE,
                        errorMsg: ''
                    })['errorMsg'];
                }
            });
        }
        else {
            this.formControl = this.container.control.get(this.controlName);
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(function () {
                if (_this.formControl.pristine) {
                    return;
                }
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
        if (this.formControl) {
            this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
        }
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
        if (control instanceof FormGroup) {
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
        if (control instanceof FormControl && !control.pristine) {
            return this.errMsgServ.getValidMsg(path, control.errors);
        }
        else if (control instanceof FormControl && control.pristine) {
            return '';
        }
        var /** @type {?} */ tmpErrorInfo;
        for (var /** @type {?} */ name_2 in control.controls) {
            tmpErrorInfo = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name_2)), path + '.' + name_2, errorInfo);
            if (tmpErrorInfo && tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
                errorInfo = tmpErrorInfo;
            }
        }
        if (!control.pristine) {
            tmpErrorInfo = this.errMsgServ.getValidMsg(path, control.errors);
        }
        if (tmpErrorInfo && tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
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
            !parentElement.getAttribute('formgroupname') &&
            !parentElement.getAttribute('formGroupName') &&
            !parentElement.getAttribute('formgroup')) {
            if (parentElement.nodeName.toLocaleLowerCase() === 'form' ||
                parentElement.nodeName.toLocaleLowerCase() === 'ngform') {
                break;
            }
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            console.log(this.elemRef.nativeElement);
            throw new Error('can not find parentElement');
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
                controlName =
                    parentElement.getAttribute('formgroupname') || parentElement.getAttribute('fromGroupName');
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
                controlName =
                    siblingElem.getAttribute('formcontrolname') ||
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
        controlName: [{ type: Input }],
        errorHook: [{ type: Input }],
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return FormControlValidComponent;
}());
export { FormControlValidComponent };
function FormControlValidComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormControlValidComponent.prototype.onlyGroup;
    /** @type {?} */
    FormControlValidComponent.prototype.errorPrompt;
    /** @type {?} */
    FormControlValidComponent.prototype.controlName;
    /** @type {?} */
    FormControlValidComponent.prototype.errorHook;
    /** @type {?} */
    FormControlValidComponent.prototype.template;
    /** @type {?} */
    FormControlValidComponent.prototype.errorMsg;
    /** @type {?} */
    FormControlValidComponent.prototype.formControl;
    /** @type {?} */
    FormControlValidComponent.prototype.groupValidControlLength;
    /** @type {?} */
    FormControlValidComponent.prototype.container;
    /** @type {?} */
    FormControlValidComponent.prototype.errMsgServ;
    /** @type {?} */
    FormControlValidComponent.prototype.globalValidServ;
    /** @type {?} */
    FormControlValidComponent.prototype.elemRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ04sU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUdMLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTixnQkFBZ0IsRUFHaEIsV0FBVyxFQUNYLFNBQVMsRUFDVCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLHFCQUFNLG9CQUFvQixHQUFHLHdCQUF3QixDQUFDOztJQWdDckQsbUNBQzJCLFdBQW1CLEVBQ3pCLFNBQTJCLEVBQ3ZDLFlBQ0EsaUJBQ0E7UUFIWSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLG9CQUFlLEdBQWYsZUFBZTtRQUNmLFlBQU8sR0FBUCxPQUFPOzt5QkFqQkssS0FBSzt1Q0FVUSxDQUFDO1FBU2xDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNqRDtLQUNEOzs7O0lBRUQsNENBQVE7OztJQUFSLGVBQWE7Ozs7SUFFYixzREFBa0I7OztJQUFsQjtRQUFBLGlCQUtDOztRQUhBLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFB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LE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ25GLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0Q7U0FDRDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Z0JBdFF2QixTQUFTLFNBQUM7b0JBQ1YsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLCtSQVdWO29CQUNBLE1BQU0sRUFBRSxDQUFDLHFFQUFxRSxDQUFDO2lCQUMvRTs7Ozs2Q0FnQkUsU0FBUyxTQUFDLGFBQWE7Z0JBOUN6QixnQkFBZ0IsdUJBK0NkLFFBQVE7Z0JBckNGLG1CQUFtQjtnQkFDbkIsa0JBQWtCO2dCQWhCMUIsVUFBVTs7OzRCQXNDVCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUVMLFlBQVksU0FBQyxXQUFXOztvQ0FuRDFCOztTQTRDYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdENvbXBvbmVudCxcclxuXHRPbkluaXQsXHJcblx0Q29udGVudENoaWxkLFxyXG5cdFRlbXBsYXRlUmVmLFxyXG5cdElucHV0LFxyXG5cdEluamVjdCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdEVsZW1lbnRSZWYsXHJcblx0QXR0cmlidXRlLFxyXG5cdE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcblx0Q29udHJvbENvbnRhaW5lcixcclxuXHRBYnN0cmFjdENvbnRyb2wsXHJcblx0QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG5cdEZvcm1Db250cm9sLFxyXG5cdEZvcm1Hcm91cCxcclxuXHRGb3JtR3JvdXBOYW1lLFxyXG5cdEZvcm1Hcm91cERpcmVjdGl2ZSxcclxuXHROZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG5cdHRlbXBsYXRlOiBgPHNwYW5cclxuICAgIGNsYXNzPVwiZXJyb3JcIlxyXG4gICAgW25nQ2xhc3NdPVwiZXJyb3JQcm9tcHRcIlxyXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxyXG4+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcclxuICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxyXG48L3NwYW4+XHJcbmAsXHJcblx0c3R5bGVzOiBbYHB7d2lkdGg6MTAwJTtoZWlnaHQ6MTdweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiNlMDZhMmY7ZmxvYXQ6bGVmdH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblx0Ly/lj6rmmL7npLpmb3JtZ3JvdXDmnKzouqvnmoTplJnor6/vvIzkuI3mmL7npLpncm91cOS4i2NvbnRyb2znmoTplJnor69cclxuXHRASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBlcnJvclByb21wdDtcclxuXHRASW5wdXQoKSBjb250cm9sTmFtZTtcclxuXHRASW5wdXQoKSBlcnJvckhvb2s6IEZ1bmN0aW9uO1xyXG5cclxuXHRAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcblx0cHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8v6aqM6K+B5aSx6LSl5pi+56S655qE6ZSZ6K+v5raI5oGvXHJcblxyXG5cdHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuXHRwcml2YXRlIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gMTtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRAQXR0cmlidXRlKCdjb250cm9sTmFtZScpIGNvbnRyb2xOYW1lOiBzdHJpbmcsXHJcblx0XHRAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcixcclxuXHRcdHByaXZhdGUgZXJyTXNnU2VydjogRm9ybVZhbGlkTXNnU2VydmljZSxcclxuXHRcdHByaXZhdGUgZ2xvYmFsVmFsaWRTZXJ2OiBHbG9iYWxWYWxpZFNlcnZpY2UsXHJcblx0XHRwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWZcclxuXHQpIHtcclxuXHRcdGlmIChjb250cm9sTmFtZSkge1xyXG5cdFx0XHR0aGlzLmNvbnRyb2xOYW1lID0gY29udHJvbE5hbWUucmVwbGFjZSgvJy9nLCAnJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdC8vICDlhbzlrrluZ0Zyb21cclxuXHRcdFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuXHRcdFx0dGhpcy5iaW5kQ29udHJvbEVycm9yTXNnKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJpbmRDb250cm9sRXJyb3JNc2coKSB7XHJcblx0XHR0aGlzLmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoKTtcclxuXHRcdGlmICghdGhpcy5jb250cm9sTmFtZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBmaW5kIGNvbnRyb2xOYW1lXCIpO1xyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5sb2codGhpcy5jb250cm9sTmFtZSk7XHJcblx0XHRsZXQgcGF0aCA9ICcnO1xyXG5cdFx0Y29uc3QgaXNGb3JtQ29udHJvbCA9XHJcblx0XHRcdHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpICYmXHJcblx0XHRcdHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2w7XHJcblx0XHRpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuXHRcdFx0Ly8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuXHRcdFx0cGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuXHRcdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbXHJcblx0XHRcdFx0XHRcdCdlcnJvck1zZydcclxuXHRcdFx0XHRcdF07XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB7XHJcblx0XHRcdFx0XHRcdG1pbldlaWdodDogTnVtYmVyLk1BWF9WQUxVRSxcclxuXHRcdFx0XHRcdFx0ZXJyb3JNc2c6ICcnXHJcblx0XHRcdFx0XHR9KVsnZXJyb3JNc2cnXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG5cdFx0XHRwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmZvcm1Db250cm9sLnByaXN0aW5lKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbXHJcblx0XHRcdFx0XHQnZXJyb3JNc2cnXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuZm9ybUNvbnRyb2wpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdmb3JtQ29udHJvbCBpbnN0YW5jZSBub3QgZmluZCcpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5nbG9iYWxWYWxpZFNlcnYucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JIb29rKTtcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cdFx0Ly9DYWxsZWQgb25jZSwgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXHJcblx0XHQvL0FkZCAnaW1wbGVtZW50cyBPbkRlc3Ryb3knIHRvIHRoZSBjbGFzcy5cclxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sKSB7XHJcblx0XHRcdHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnVucmVnaXN0ZXJWYWxpZEZvcm0odGhpcy5mb3JtQ29udHJvbFsncm9vdCddIHx8IHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZXJyb3JIb29rKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2V0Rm9ybUNvbnRyb2xNc2dMaXN0ZW5lcihjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aCkge1xyXG5cdFx0Y29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0bGV0IGVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIGNvbnRyb2wuZXJyb3JzKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuXHRcdFx0Zm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICog6I635Y+WZ3JvdXDkuIvpnaLnmoTmiYDmnInpqozor4HplJnor6/mtojmga9cclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICovXHJcblx0cHJpdmF0ZSBnZXRHcm91cENvbnRyb2xWYWxpZE1zZyhjb250cm9sOiBhbnksIHBhdGg6IHN0cmluZywgZXJyb3JJbmZvKSB7XHJcblx0XHRpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sICYmICFjb250cm9sLnByaXN0aW5lKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG5cdFx0fSBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wgJiYgY29udHJvbC5wcmlzdGluZSkge1xyXG5cdFx0XHRyZXR1cm4gJyc7XHJcblx0XHR9XHJcblx0XHRsZXQgdG1wRXJyb3JJbmZvO1xyXG5cdFx0Zm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcblx0XHRcdHRtcEVycm9ySW5mbyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUsIGVycm9ySW5mbyk7XHJcblx0XHRcdGlmICh0bXBFcnJvckluZm8gJiYgdG1wRXJyb3JJbmZvWydtaW5XZWlnaHQnXSA8IGVycm9ySW5mb1snbWluV2VpZ2h0J10pIHtcclxuXHRcdFx0XHRlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghY29udHJvbC5wcmlzdGluZSkge1xyXG5cdFx0XHR0bXBFcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRtcEVycm9ySW5mbyAmJiB0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSkge1xyXG5cdFx0XHRlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZXJyb3JJbmZvO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcblx0XHRsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblx0XHQvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG5cdFx0d2hpbGUgKFxyXG5cdFx0XHRwYXJlbnRFbGVtZW50ICYmXHJcblx0XHRcdCFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpICYmXHJcblx0XHRcdCFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpICYmXHJcblx0XHRcdCFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwJylcclxuXHRcdCkge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScgfHxcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICduZ2Zvcm0nXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblx0XHR9XHJcblx0XHRpZiAoIXBhcmVudEVsZW1lbnQpIHtcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50Jyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGFyZW50RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHNlYXJjaEVsZW06IEVsZW1lbnQpIHtcclxuXHRcdGxldCBwcmV2aW91c1NpYmxpbmc6IEVsZW1lbnQgPSBzZWFyY2hFbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblx0XHR3aGlsZSAoXHJcblx0XHRcdHByZXZpb3VzU2libGluZyAmJlxyXG5cdFx0XHQhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuXHRcdFx0IXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcblx0XHRcdCFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJylcclxuXHRcdCkge1xyXG5cdFx0XHQvLyBpZihwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiZm9ybUdyb3VwTmFtZVwiKSB8fCBwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiW2Zvcm1Hcm91cF1cIikpe1xyXG5cdFx0XHQvLyAgIHRocm93IG5ldyBFcnJvcihcImhhdmUgc2VhcmNoIHRvIHJvb3RcIik7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0cHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblx0XHR9XHJcblx0XHRpZiAoIXByZXZpb3VzU2libGluZykge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQgbXVzdCBoYXZlIGEgZm9ybWNvbnRyb2wgc2liaWxpbmcnKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwcmV2aW91c1NpYmxpbmc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgKiDoh6rliqjmn6Xmib7lvZPliY3pqozor4Hlr7nlupTnmoRmb3JtQ29udHJvbE5hbWXmiJbogIVmb3JtR3JvdXBOYW1lXHJcbiAgICovXHJcblx0cHJpdmF0ZSBnZXRGb3JtQ29udHJvbE5hbWUoKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLmNvbnRyb2xOYW1lKSB7XHJcblx0XHRcdC8vIOaJi+WKqOiuvuWumuS6hmNvbnRyb2xOYW1lXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRyb2xOYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjb250cm9sTmFtZTtcclxuXHRcdGlmICghdGhpcy5jb250YWluZXIpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdvbmx5IG9uZSBbZm9ybUNvbnRyb2xdIG5vdCBzdXBwb3J0LCBUaGVyZSBtdXN0IGJlIGEgZm9ybUdyb3VwTmFtZSBvciBbZm9ybUdyb3VwXScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50R3JvdXBFTGVtKCk7XHJcblx0XHRcdGNvbnN0IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFZBTElEX0NPTVBPTkVOVF9OQU1FKS5sZW5ndGg7XHJcblx0XHRcdHRoaXMuZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBncm91cFZhbGlkQ29udHJvbExlbmd0aDtcclxuXHRcdFx0aWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwRGlyZWN0aXZlICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuXHRcdFx0XHQvLyDnm7TmjqXmmK/moLnoioLngrnlr7nlupTmlbTkuKpmcm9tIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCJcclxuXHRcdFx0XHQvLyDmlbTkuKpmb3Jt6KGo5Y2V5Y+q5pyJ5LiA5LiqbXByLWZvcm0tY29udHJvbC12YWxpZO+8jOWImeS7peW9k+WJjWZvcm1Hcm91cOWvueW6lOeahOWPmOmHj+WQjeS4umNvbnRyb2xOYW1lXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHNldCBjb250cm9sTmFtZSBieSB5b3Vyc2VsZicpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwTmFtZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcblx0XHRcdFx0Ly8g54i26IqC54K55pivZm9ybeihqOWNleS4reafkOS4qmdyb3VwXHJcblx0XHRcdFx0Ly8g5pW05LiqZ3JvdXDlj6rmnInkuIDkuKptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcblx0XHRcdFx0Ly8g5LyY5YWI5Y+WZnJvbUdyb3Vw55qE6aqM6K+BXHJcblx0XHRcdFx0Y29udHJvbE5hbWUgPVxyXG5cdFx0XHRcdFx0cGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKSB8fCBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZnJvbUdyb3VwTmFtZScpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgTmdNb2RlbEdyb3VwICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuXHRcdFx0XHQvLyDniLboioLngrnmmK9mb3Jt6KGo5Y2V5Lit5p+Q5LiqZ3JvdXBcclxuXHRcdFx0XHQvLyDmlbTkuKpncm91cOWPquacieS4gOS4qm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuXHRcdFx0XHQvLyDkvJjlhYjlj5Zmcm9tR3JvdXDnmoTpqozor4FcclxuXHRcdFx0XHRjb250cm9sTmFtZSA9IHRoaXMuY29udGFpbmVyLm5hbWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gbXByLWZvcm0tY29udHJvbC12YWxpZCDlr7nlupTkuIDkuKogZm9ybUNvbnRyb2xOYW1lXHJcblx0XHRcdFx0Ly8g5ZCR5YmN5p+l5om+5YWE5byf6IqC54K5XHJcblx0XHRcdFx0Y29uc3Qgc2libGluZ0VsZW0gPSB0aGlzLmdldFNsaWJpbmdGb3JtQ29udHJsRWxlbSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcblx0XHRcdFx0Y29udHJvbE5hbWUgPVxyXG5cdFx0XHRcdFx0c2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSB8fFxyXG5cdFx0XHRcdFx0c2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSB8fFxyXG5cdFx0XHRcdFx0c2libGluZ0VsZW0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIGlmKHRoaXMuY29udHJvbE5hbWUgJiYgdGhpcy5jb250cm9sTmFtZSAhPSBjb250cm9sTmFtZSl7XHJcblx0XHQvLyAgIHRocm93IG5ldyBFcnJvcihgeW91IG1heSBzZXQgYSBlcnJvciBjb250cm9sTmFtZSwgeW91IHNldCBpczogJHt0aGlzLmNvbnRyb2xOYW1lfSwgYnV0IG5lZWQgaXM6ICR7Y29udHJvbE5hbWV9YCk7XHJcblx0XHQvLyB9XHJcblx0XHRyZXR1cm4gY29udHJvbE5hbWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgKiDojrflj5blvZPliY1mb3JtQ29udHJvbOebuOWvueS6jmZvcm1Hcm91cOeahHBhdGhcclxuICAgKiBAcGFyYW0gZm9ybUNvbnRyb2xcclxuICAgKiBAcGFyYW0gcm9vdFxyXG4gICAqIEBwYXJhbSBjb250cm9sTmFtZVxyXG4gICAqL1xyXG5cdHByaXZhdGUgZ2V0UGF0aChmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sLCByb290LCBjb250cm9sTmFtZSkge1xyXG5cdFx0aWYgKCEocm9vdCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkpIHtcclxuXHRcdFx0aWYgKGZvcm1Db250cm9sID09PSByb290KSB7XHJcblx0XHRcdFx0cmV0dXJuIGNvbnRyb2xOYW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHRcdGNvbnN0IHBhdGggPSBbXTtcclxuXHRcdGZvciAoY29uc3QgY3RybE5hbWUgaW4gcm9vdFsnY29udHJvbHMnXSkge1xyXG5cdFx0XHRpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gPT09IGZvcm1Db250cm9sKSB7XHJcblx0XHRcdFx0cmV0dXJuIGN0cmxOYW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG5cdFx0XHRcdGNvbnN0IHRtcFBhdGggPSB0aGlzLmdldFBhdGgoZm9ybUNvbnRyb2wsIHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdLCBjb250cm9sTmFtZSk7XHJcblx0XHRcdFx0aWYgKHRtcFBhdGgpIHtcclxuXHRcdFx0XHRcdHBhdGgucHVzaChjdHJsTmFtZSk7XHJcblx0XHRcdFx0XHRwYXRoLnB1c2godG1wUGF0aCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGF0aC5qb2luKCcuJyk7XHJcblx0fVxyXG59XHJcbiJdfQ==