/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, TemplateRef, Input, ElementRef, Attribute, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupName, FormGroupDirective, NgModelGroup } from '@angular/forms';
import { FormValidMsgService } from '../services/form-valid-msg.service';
import { GlobalValidService } from '../services/global-valid.service';
const /** @type {?} */ VALID_COMPONENT_NAME = 'mpr-form-control-valid';
export class FormControlValidComponent {
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
        this.delete = false;
        if (controlName) {
            this.controlName = controlName.replace(/'/g, '');
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        //  兼容ngFrom
        // Promise.resolve(null).then(() => {
        //   this.bindControlErrorMsg();
        // });
        setTimeout(() => {
            if (!this.delete) {
                this.bindControlErrorMsg();
            }
        }, 500);
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
        const /** @type {?} */ isFormControl = this.container.control.get(this.controlName) &&
            this.container.control.get(this.controlName) instanceof FormControl;
        if (!isFormControl) {
            // from root or from formGroupName
            this.formControl = this.container.control;
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(() => {
                // if (this.formControl.pristine) {
                //   return;
                // }
                if (this.onlyGroup) {
                    this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors)['errorMsg'];
                }
                else {
                    this.errorMsg = this.getGroupControlValidMsg(/** @type {?} */ (this.formControl), path || this.controlName, {
                        minWeight: Number.MAX_VALUE,
                        errorMsg: ''
                    })['errorMsg'];
                }
            });
        }
        else {
            this.formControl = this.container.control.get(this.controlName);
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(() => {
                // if (this.formControl.pristine) {
                //   return;
                // }
                this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors)['errorMsg'];
                if (this.errorMsg) {
                    Promise.resolve(null).then(() => {
                        this.globalValidServ.scrollTo(this.elemRef.nativeElement);
                    });
                }
            });
        }
        if (!this.formControl) {
            throw new Error('formControl instance not find');
        }
        this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl, this.errorHook);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        if (this.formControl) {
            this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
        }
        this.delete = true;
    }
    /**
     * @param {?} control
     * @param {?} path
     * @return {?}
     */
    setFormControlMsgListener(control, path) {
        control.valueChanges.subscribe(() => {
            let /** @type {?} */ errorInfo = this.errMsgServ.getValidMsg(path || this.controlName, control.errors);
        });
        if (control instanceof FormGroup) {
            for (let /** @type {?} */ name in control.controls) {
                this.setFormControlMsgListener(/** @type {?} */ (control.get(name)), path + '.' + name);
            }
        }
    }
    /**
     * 获取group下面的所有验证错误消息
     * @param {?} control
     * @param {?} path
     * @param {?} errorInfo
     * @return {?}
     */
    getGroupControlValidMsg(control, path, errorInfo) {
        if (control instanceof FormControl && !control.pristine) {
            return this.errMsgServ.getValidMsg(path, control.errors);
        }
        else if (control instanceof FormControl && control.pristine) {
            return '';
        }
        let /** @type {?} */ tmpErrorInfo;
        for (let /** @type {?} */ name in control.controls) {
            tmpErrorInfo = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name)), path + '.' + name, errorInfo);
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
    }
    /**
     * @return {?}
     */
    getParentGroupELem() {
        let /** @type {?} */ parentElement = this.elemRef.nativeElement.parentElement;
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
    controlName: [{ type: Input }],
    errorHook: [{ type: Input }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};
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
    FormControlValidComponent.prototype.delete;
    /** @type {?} */
    FormControlValidComponent.prototype.container;
    /** @type {?} */
    FormControlValidComponent.prototype.errMsgServ;
    /** @type {?} */
    FormControlValidComponent.prototype.globalValidServ;
    /** @type {?} */
    FormControlValidComponent.prototype.elemRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUdMLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxnQkFBZ0IsRUFHaEIsV0FBVyxFQUNYLFNBQVMsRUFDVCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLFlBQVksRUFDYixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLHVCQUFNLG9CQUFvQixHQUFHLHdCQUF3QixDQUFDO0FBa0J0RCxNQUFNOzs7Ozs7OztJQWVKLFlBQzRCLFdBQW1CLEVBQ3pCLFNBQTJCLEVBQ3ZDLFlBQ0EsaUJBQ0E7UUFIWSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLG9CQUFlLEdBQWYsZUFBZTtRQUNmLFlBQU8sR0FBUCxPQUFPOzt5QkFsQkksS0FBSzt1Q0FVUSxDQUFDO3NCQUNsQixLQUFLO1FBU3BCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRDtLQUNGOzs7O0lBRUQsUUFBUSxNQUFLOzs7O0lBRWIsZUFBZTs7Ozs7UUFLYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsRUFBRSxDQUFDLENB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Q0FBQzthQUNqQjtZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNuRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7OztZQTdRekIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Q0FXWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxxRUFBcUUsQ0FBQzthQUNoRjs7Ozt5Q0FpQkksU0FBUyxTQUFDLGFBQWE7WUEvQzFCLGdCQUFnQix1QkFnRGIsUUFBUTtZQXRDSixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBaEJ6QixVQUFVOzs7d0JBc0NULEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBRUwsWUFBWSxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIElucHV0LFxyXG4gIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQXR0cmlidXRlLFxyXG4gIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lcixcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIEZvcm1Hcm91cCxcclxuICBGb3JtR3JvdXBOYW1lLFxyXG4gIEZvcm1Hcm91cERpcmVjdGl2ZSxcclxuICBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cclxuICAgIGNsYXNzPVwiZXJyb3JcIlxyXG4gICAgW25nQ2xhc3NdPVwiZXJyb3JQcm9tcHRcIlxyXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxyXG4+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcclxuICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxyXG48L3NwYW4+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYHB7d2lkdGg6MTAwJTtoZWlnaHQ6MTdweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiNlMDZhMmY7ZmxvYXQ6bGVmdH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLy/lj6rmmL7npLpmb3JtZ3JvdXDmnKzouqvnmoTplJnor6/vvIzkuI3mmL7npLpncm91cOS4i2NvbnRyb2znmoTplJnor69cclxuICBASW5wdXQoKSBvbmx5R3JvdXAgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlcnJvclByb21wdDtcclxuICBASW5wdXQoKSBjb250cm9sTmFtZTtcclxuICBASW5wdXQoKSBlcnJvckhvb2s6IEZ1bmN0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIGVycm9yTXNnOiBzdHJpbmc7IC8v6aqM6K+B5aSx6LSl5pi+56S655qE6ZSZ6K+v5raI5oGvXHJcblxyXG4gIHByaXZhdGUgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICBwcml2YXRlIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gMTtcclxuICBwcml2YXRlIGRlbGV0ZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZlxyXG4gICkge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gIOWFvOWuuW5nRnJvbVxyXG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIC8vIH0pO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5kZWxldGUpIHtcclxuICAgICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgICAgfVxyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIGJpbmRDb250cm9sRXJyb3JNc2coKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoKTtcclxuICAgIGlmICghdGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBmaW5kIGNvbnRyb2xOYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgY29uc3QgaXNGb3JtQ29udHJvbCA9XHJcbiAgICAgIHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpICYmXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2w7XHJcbiAgICBpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuICAgICAgLy8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAvLyBpZiAodGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSkge1xyXG4gICAgICAgIC8vICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB7XHJcbiAgICAgICAgICAgIG1pbldlaWdodDogTnVtYmVyLk1BWF9WQUxVRSxcclxuICAgICAgICAgICAgZXJyb3JNc2c6ICcnXHJcbiAgICAgICAgICB9KVsnZXJyb3JNc2cnXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmZvcm1Db250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgICAgLy8gICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JNc2cpIHtcclxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYuc2Nyb2xsVG8odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuICAgIC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG4gICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcclxuICAgICAgdGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWxldGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoKSB7XHJcbiAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBsZXQgZXJyb3JJbmZvID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG4gICAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgICB0aGlzLnNldEZvcm1Db250cm9sTXNnTGlzdGVuZXIoPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5Zncm91cOS4i+mdoueahOaJgOaciemqjOivgemUmeivr+a2iOaBr1xyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICogQHBhcmFtIHBhdGhcclxuICAgKi9cclxuICBwcml2YXRlIGdldEdyb3VwQ29udHJvbFZhbGlkTXNnKGNvbnRyb2w6IGFueSwgcGF0aDogc3RyaW5nLCBlcnJvckluZm8pIHtcclxuICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wgJiYgIWNvbnRyb2wucHJpc3RpbmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCAmJiBjb250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGxldCB0bXBFcnJvckluZm87XHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuICAgICAgdG1wRXJyb3JJbmZvID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSwgZXJyb3JJbmZvKTtcclxuICAgICAgaWYgKHRtcEVycm9ySW5mbyAmJiB0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSkge1xyXG4gICAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFjb250cm9sLnByaXN0aW5lKSB7XHJcbiAgICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9XHJcbiAgICBpZiAodG1wRXJyb3JJbmZvICYmIHRtcEVycm9ySW5mb1snbWluV2VpZ2h0J10gPCBlcnJvckluZm9bJ21pbldlaWdodCddKSB7XHJcbiAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvckluZm87XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhcmVudEdyb3VwRUxlbSgpOiBFbGVtZW50IHtcclxuICAgIGxldCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIC8vIGNvbnN0IGFycnRyaWJ1dGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKSk7XHJcbiAgICB3aGlsZSAoXHJcbiAgICAgIHBhcmVudEVsZW1lbnQgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtR3JvdXBOYW1lJykgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXAnKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJyB8fFxyXG4gICAgICAgIHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ25nZm9ybSdcclxuICAgICAgKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCBmaW5kIHBhcmVudEVsZW1lbnQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIHdoaWxlIChcclxuICAgICAgcHJldmlvdXNTaWJsaW5nICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ25hbWUnKVxyXG4gICAgKSB7XHJcbiAgICAgIC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuICAgICAgLy8gfVxyXG4gICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIH1cclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiHquWKqOafpeaJvuW9k+WJjemqjOivgeWvueW6lOeahGZvcm1Db250cm9sTmFtZeaIluiAhWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgLy8g5omL5Yqo6K6+5a6a5LqGY29udHJvbE5hbWVcclxuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xOYW1lO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuICAgICAgY29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuICAgICAgdGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIOebtOaOpeaYr+agueiKgueCueWvueW6lOaVtOS4qmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG4gICAgICAgIC8vIOaVtOS4qmZvcm3ooajljZXlj6rmnInkuIDkuKptcHItZm9ybS1jb250cm9sLXZhbGlk77yM5YiZ5Lul5b2T5YmNZm9ybUdyb3Vw5a+55bqU55qE5Y+Y6YeP5ZCN5Li6Y29udHJvbE5hbWVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDniLboioLngrnmmK9mb3Jt6KGo5Y2V5Lit5p+Q5LiqZ3JvdXBcclxuICAgICAgICAvLyDmlbTkuKpncm91cOWPquacieS4gOS4qm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDkvJjlhYjlj5Zmcm9tR3JvdXDnmoTpqozor4FcclxuICAgICAgICBjb250cm9sTmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgfHwgcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zyb21Hcm91cE5hbWUnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8g54i26IqC54K55pivZm9ybeihqOWNleS4reafkOS4qmdyb3VwXHJcbiAgICAgICAgLy8g5pW05LiqZ3JvdXDlj6rmnInkuIDkuKptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8g5LyY5YWI5Y+WZnJvbUdyb3Vw55qE6aqM6K+BXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSB0aGlzLmNvbnRhaW5lci5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1wci1mb3JtLWNvbnRyb2wtdmFsaWQg5a+55bqU5LiA5LiqIGZvcm1Db250cm9sTmFtZVxyXG4gICAgICAgIC8vIOWQkeWJjeafpeaJvuWFhOW8n+iKgueCuVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmdFbGVtID0gdGhpcy5nZXRTbGliaW5nRm9ybUNvbnRybEVsZW0odGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnRyb2xOYW1lID1cclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpZih0aGlzLmNvbnRyb2xOYW1lICYmIHRoaXMuY29udHJvbE5hbWUgIT0gY29udHJvbE5hbWUpe1xyXG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYHlvdSBtYXkgc2V0IGEgZXJyb3IgY29udHJvbE5hbWUsIHlvdSBzZXQgaXM6ICR7dGhpcy5jb250cm9sTmFtZX0sIGJ1dCBuZWVkIGlzOiAke2NvbnRyb2xOYW1lfWApO1xyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5b2T5YmNZm9ybUNvbnRyb2znm7jlr7nkuo5mb3JtR3JvdXDnmoRwYXRoXHJcbiAgICogQHBhcmFtIGZvcm1Db250cm9sXHJcbiAgICogQHBhcmFtIHJvb3RcclxuICAgKiBAcGFyYW0gY29udHJvbE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhdGgoZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcm9vdCwgY29udHJvbE5hbWUpIHtcclxuICAgIGlmICghKHJvb3QgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbCA9PT0gcm9vdCkge1xyXG4gICAgICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGN0cmxOYW1lIGluIHJvb3RbJ2NvbnRyb2xzJ10pIHtcclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdID09PSBmb3JtQ29udHJvbCkge1xyXG4gICAgICAgIHJldHVybiBjdHJsTmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBjb25zdCB0bXBQYXRoID0gdGhpcy5nZXRQYXRoKGZvcm1Db250cm9sLCByb290Wydjb250cm9scyddW2N0cmxOYW1lXSwgY29udHJvbE5hbWUpO1xyXG4gICAgICAgIGlmICh0bXBQYXRoKSB7XHJcbiAgICAgICAgICBwYXRoLnB1c2goY3RybE5hbWUpO1xyXG4gICAgICAgICAgcGF0aC5wdXNoKHRtcFBhdGgpO1xyXG4gICAgICAgICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gIH1cclxufVxyXG4iXX0=