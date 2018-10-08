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
        const /** @type {?} */ isFormControl = this.container.control.get(this.controlName)
            && (this.container.control.get(this.controlName) instanceof FormControl);
        if (!isFormControl) {
            // from root or from formGroupName
            this.formControl = this.container.control;
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(() => {
                if (this.onlyGroup) {
                    this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors)['errorMsg'];
                }
                else {
                    this.errorMsg = this.getGroupControlValidMsg(/** @type {?} */ (this.formControl), path || this.controlName, { minWeight: Number.MAX_VALUE, errorMsg: '' })['errorMsg'];
                }
            });
        }
        else {
            this.formControl = this.container.control.get(this.controlName);
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(() => {
                this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors)['errorMsg'];
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
        if (control instanceof FormControl) {
            return this.errMsgServ.getValidMsg(path, control.errors);
        }
        let /** @type {?} */ tmpErrorInfo;
        for (let /** @type {?} */ name in control.controls) {
            tmpErrorInfo = this.getGroupControlValidMsg(/** @type {?} */ (control.get(name)), path + '.' + name, errorInfo);
            if (tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
                errorInfo = tmpErrorInfo;
            }
        }
        tmpErrorInfo = this.errMsgServ.getValidMsg(path, control.errors);
        if (tmpErrorInfo['minWeight'] < errorInfo['minWeight']) {
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
            !parentElement.getAttribute('formgroupname')
            && !parentElement.getAttribute('formGroupName')
            && !parentElement.getAttribute('formgroup')) {
            if (parentElement.nodeName.toLocaleLowerCase() === 'form' || parentElement.nodeName.toLocaleLowerCase() === 'ngform') {
                break;
            }
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            console.log(this.elemRef.nativeElement);
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
    controlName: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFVLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUNqQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFDbEQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQ3hFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEUsdUJBQU0sb0JBQW9CLEdBQUcsd0JBQXdCLENBQUM7QUFrQnRELE1BQU07Ozs7Ozs7O0lBY0osWUFDNEIsV0FBbUIsRUFDekIsU0FBMkIsRUFDdkMsWUFDQSxpQkFDQTtRQUhZLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQ3ZDLGVBQVUsR0FBVixVQUFVO1FBQ1Ysb0JBQWUsR0FBZixlQUFlO1FBQ2YsWUFBTyxHQUFQLE9BQU87O3lCQWhCSSxLQUFLO3VDQVNRLENBQUM7UUFRakMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0Y7Ozs7SUFFRCxRQUFRO0tBQ1A7Ozs7SUFFRCxrQkFBa0I7O1FBRWhCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdB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QVE7WUFyQ0osbUJBQW1CO1lBQ25CLGtCQUFrQjtZQVJQLFVBQVU7Ozt3QkErQjNCLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUVMLFlBQVksU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBBdHRyaWJ1dGUsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lciwgQWJzdHJhY3RDb250cm9sLCBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsXHJcbiAgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUdyb3VwTmFtZSwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cclxuICAgIGNsYXNzPVwiZXJyb3JcIlxyXG4gICAgW25nQ2xhc3NdPVwiZXJyb3JQcm9tcHRcIlxyXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxyXG4+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcclxuICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxyXG48L3NwYW4+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYHB7d2lkdGg6MTAwJTtoZWlnaHQ6MTdweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiNlMDZhMmY7ZmxvYXQ6bGVmdH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gIC8v5Y+q5pi+56S6Zm9ybWdyb3Vw5pys6Lqr55qE6ZSZ6K+v77yM5LiN5pi+56S6Z3JvdXDkuItjb250cm9s55qE6ZSZ6K+vXHJcbiAgQElucHV0KCkgb25seUdyb3VwID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZXJyb3JQcm9tcHQ7XHJcbiAgQElucHV0KCkgY29udHJvbE5hbWU7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwdWJsaWMgZXJyb3JNc2c6IHN0cmluZzsgLy/pqozor4HlpLHotKXmmL7npLrnmoTplJnor6/mtojmga9cclxuXHJcbiAgcHJpdmF0ZSBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xyXG4gIHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG4gICAgcHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gIOWFvOWuuW5nRnJvbVxyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuICAgIHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICBjb25zdCBpc0Zvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSlcclxuICAgICAgJiYgKHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpO1xyXG4gICAgaWYgKCFpc0Zvcm1Db250cm9sKSB7XHJcbiAgICAgIC8vIGZyb20gcm9vdCBvciBmcm9tIGZvcm1Hcm91cE5hbWVcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XHJcbiAgICAgIHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub25seUdyb3VwKSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpWydlcnJvck1zZyddO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PnRoaXMuZm9ybUNvbnRyb2wsIHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSxcclxuICAgICAgICAgICAge21pbldlaWdodDogTnVtYmVyLk1BWF9WQUxVRSwgZXJyb3JNc2c6ICcnfSlbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKTtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpWydlcnJvck1zZyddO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIC8vQ2FsbGVkIG9uY2UsIGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxyXG4gICAgLy9BZGQgJ2ltcGxlbWVudHMgT25EZXN0cm95JyB0byB0aGUgY2xhc3MuXHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi51bnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0Rm9ybUNvbnRyb2xNc2dMaXN0ZW5lcihjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aCl7XHJcbiAgICBjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCk9PntcclxuICAgICAgbGV0IGVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIGNvbnRyb2wuZXJyb3JzKVxyXG4gICAgfSk7XHJcbiAgICBpZihjb250cm9sIGluc3RhbmNlb2YgRm9ybUdyb3VwKXtcclxuICAgICAgZm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKXtcclxuICAgICAgICB0aGlzLnNldEZvcm1Db250cm9sTXNnTGlzdGVuZXIoPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5Zncm91cOS4i+mdoueahOaJgOaciemqjOivgemUmeivr+a2iOaBr1xyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICogQHBhcmFtIHBhdGhcclxuICAgKi9cclxuICBwcml2YXRlIGdldEdyb3VwQ29udHJvbFZhbGlkTXNnKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoOiBzdHJpbmcsIGVycm9ySW5mbykge1xyXG5cclxuICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICB9XHJcbiAgICBsZXQgdG1wRXJyb3JJbmZvO1xyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBjb250cm9sLmNvbnRyb2xzKSB7XHJcbiAgICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUsIGVycm9ySW5mbyk7XHJcbiAgICAgIGlmKHRtcEVycm9ySW5mb1snbWluV2VpZ2h0J10gPCBlcnJvckluZm9bJ21pbldlaWdodCddKXtcclxuICAgICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRtcEVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcbiAgICBpZih0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSl7XHJcbiAgICAgIGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvckluZm87XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhcmVudEdyb3VwRUxlbSgpOiBFbGVtZW50IHtcclxuICAgIGxldCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIC8vIGNvbnN0IGFycnRyaWJ1dGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKSk7XHJcbiAgICB3aGlsZSAoXHJcbiAgICAgIHBhcmVudEVsZW1lbnQgJiZcclxuICAgICAgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJylcclxuICAgICAgJiYgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtR3JvdXBOYW1lJylcclxuICAgICAgJiYgIXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXAnKSkge1xyXG4gICAgICBpZihwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJyB8fCBwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICduZ2Zvcm0nKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBmaW5kIHBhcmVudEVsZW1lbnRcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHNlYXJjaEVsZW06IEVsZW1lbnQpIHtcclxuICAgIGxldCBwcmV2aW91c1NpYmxpbmc6IEVsZW1lbnQgPSBzZWFyY2hFbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB3aGlsZSAocHJldmlvdXNTaWJsaW5nICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkge1xyXG4gICAgICAvLyBpZihwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiZm9ybUdyb3VwTmFtZVwiKSB8fCBwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKFwiW2Zvcm1Hcm91cF1cIikpe1xyXG4gICAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcImhhdmUgc2VhcmNoIHRvIHJvb3RcIik7XHJcbiAgICAgIC8vIH1cclxuICAgICAgcHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgICBpZiAoIXByZXZpb3VzU2libGluZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQgbXVzdCBoYXZlIGEgZm9ybWNvbnRyb2wgc2liaWxpbmcnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDoh6rliqjmn6Xmib7lvZPliY3pqozor4Hlr7nlupTnmoRmb3JtQ29udHJvbE5hbWXmiJbogIVmb3JtR3JvdXBOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRGb3JtQ29udHJvbE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbnRyb2xOYW1lKSB7XHJcbiAgICAgIC8vIOaJi+WKqOiuvuWumuS6hmNvbnRyb2xOYW1lXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sTmFtZTtcclxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IG9uZSBbZm9ybUNvbnRyb2xdIG5vdCBzdXBwb3J0LCBUaGVyZSBtdXN0IGJlIGEgZm9ybUdyb3VwTmFtZSBvciBbZm9ybUdyb3VwXScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50R3JvdXBFTGVtKCk7XHJcbiAgICAgIGNvbnN0IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFZBTElEX0NPTVBPTkVOVF9OQU1FKS5sZW5ndGg7XHJcbiAgICAgIHRoaXMuZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBncm91cFZhbGlkQ29udHJvbExlbmd0aDtcclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwRGlyZWN0aXZlICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDnm7TmjqXmmK/moLnoioLngrnlr7nlupTmlbTkuKpmcm9tIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCJcclxuICAgICAgICAvLyDmlbTkuKpmb3Jt6KGo5Y2V5Y+q5pyJ5LiA5LiqbXByLWZvcm0tY29udHJvbC12YWxpZO+8jOWImeS7peW9k+WJjWZvcm1Hcm91cOWvueW6lOeahOWPmOmHj+WQjeS4umNvbnRyb2xOYW1lXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHNldCBjb250cm9sTmFtZSBieSB5b3Vyc2VsZicpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRm9ybUdyb3VwTmFtZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8g54i26IqC54K55pivZm9ybeihqOWNleS4reafkOS4qmdyb3VwXHJcbiAgICAgICAgLy8g5pW05LiqZ3JvdXDlj6rmnInkuIDkuKptcHItZm9ybS1jb250cm9sLXZhbGlkXHJcbiAgICAgICAgLy8g5LyY5YWI5Y+WZnJvbUdyb3Vw55qE6aqM6K+BXHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpIHx8IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmcm9tR3JvdXBOYW1lJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXAgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIOeItuiKgueCueaYr2Zvcm3ooajljZXkuK3mn5DkuKpncm91cFxyXG4gICAgICAgIC8vIOaVtOS4qmdyb3Vw5Y+q5pyJ5LiA5LiqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIOS8mOWFiOWPlmZyb21Hcm91cOeahOmqjOivgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gdGhpcy5jb250YWluZXIubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtcHItZm9ybS1jb250cm9sLXZhbGlkIOWvueW6lOS4gOS4qiBmb3JtQ29udHJvbE5hbWVcclxuICAgICAgICAvLyDlkJHliY3mn6Xmib7lhYTlvJ/oioLngrlcclxuICAgICAgICBjb25zdCBzaWJsaW5nRWxlbSA9IHRoaXMuZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBjb250cm9sTmFtZSA9IHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgfHxcclxuICAgICAgICAgIHNpYmxpbmdFbGVtLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpZih0aGlzLmNvbnRyb2xOYW1lICYmIHRoaXMuY29udHJvbE5hbWUgIT0gY29udHJvbE5hbWUpe1xyXG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYHlvdSBtYXkgc2V0IGEgZXJyb3IgY29udHJvbE5hbWUsIHlvdSBzZXQgaXM6ICR7dGhpcy5jb250cm9sTmFtZX0sIGJ1dCBuZWVkIGlzOiAke2NvbnRyb2xOYW1lfWApO1xyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIGNvbnRyb2xOYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5b2T5YmNZm9ybUNvbnRyb2znm7jlr7nkuo5mb3JtR3JvdXDnmoRwYXRoXHJcbiAgICogQHBhcmFtIGZvcm1Db250cm9sXHJcbiAgICogQHBhcmFtIHJvb3RcclxuICAgKiBAcGFyYW0gY29udHJvbE5hbWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhdGgoZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcm9vdCwgY29udHJvbE5hbWUpIHtcclxuICAgIGlmICghKHJvb3QgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XHJcbiAgICAgIGlmIChmb3JtQ29udHJvbCA9PT0gcm9vdCkge1xyXG4gICAgICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGN0cmxOYW1lIGluIHJvb3RbJ2NvbnRyb2xzJ10pIHtcclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdID09PSBmb3JtQ29udHJvbCkge1xyXG4gICAgICAgIHJldHVybiBjdHJsTmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcclxuICAgICAgICBjb25zdCB0bXBQYXRoID0gdGhpcy5nZXRQYXRoKGZvcm1Db250cm9sLCByb290Wydjb250cm9scyddW2N0cmxOYW1lXSwgY29udHJvbE5hbWUpO1xyXG4gICAgICAgIGlmICh0bXBQYXRoKSB7XHJcbiAgICAgICAgICBwYXRoLnB1c2goY3RybE5hbWUpO1xyXG4gICAgICAgICAgcGF0aC5wdXNoKHRtcFBhdGgpO1xyXG4gICAgICAgICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGguam9pbignLicpO1xyXG4gIH1cclxufVxyXG4iXX0=