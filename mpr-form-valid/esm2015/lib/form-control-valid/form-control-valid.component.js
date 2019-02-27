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
        this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl, this.errorHook);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
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
    FormControlValidComponent.prototype.container;
    /** @type {?} */
    FormControlValidComponent.prototype.errMsgServ;
    /** @type {?} */
    FormControlValidComponent.prototype.globalValidServ;
    /** @type {?} */
    FormControlValidComponent.prototype.elemRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFVLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUNqQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFDbEQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQ3hFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEUsdUJBQU0sb0JBQW9CLEdBQUcsd0JBQXdCLENBQUM7QUFrQnRELE1BQU07Ozs7Ozs7O0lBZUosWUFDNEIsV0FBbUIsRUFDekIsU0FBMkIsRUFDdkMsWUFDQSxpQkFDQTtRQUhZLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQ3ZDLGVBQVUsR0FBVixVQUFVO1FBQ1Ysb0JBQWUsR0FBZixlQUFlO1FBQ2YsWUFBTyxHQUFQLE9BQU87O3lCQWpCSSxLQUFLO3VDQVVRLENBQUM7UUFRakMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0Y7Ozs7SUFFRCxRQUFRO0tBQ1A7Ozs7SUFFRCxrQkFBa0I7O1FBRWhCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdB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SSxTQUFTLFNBQUMsYUFBYTtZQXpDMUIsZ0JBQWdCLHVCQTBDYixRQUFRO1lBdENKLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFSUCxVQUFVOzs7d0JBK0IzQixLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUVMLFlBQVksU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBBdHRyaWJ1dGUsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbENvbnRhaW5lciwgQWJzdHJhY3RDb250cm9sLCBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsXHJcbiAgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUdyb3VwTmFtZSwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ01vZGVsR3JvdXBcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtVmFsaWRNc2dTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZSc7XHJcbmltcG9ydCB7IEdsb2JhbFZhbGlkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC12YWxpZC5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFZBTElEX0NPTVBPTkVOVF9OQU1FID0gJ21wci1mb3JtLWNvbnRyb2wtdmFsaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFZBTElEX0NPTVBPTkVOVF9OQU1FLFxyXG4gIHRlbXBsYXRlOiBgPHNwYW5cclxuICAgIGNsYXNzPVwiZXJyb3JcIlxyXG4gICAgW25nQ2xhc3NdPVwiZXJyb3JQcm9tcHRcIlxyXG4gICAgW2hpZGRlbl09XCIhZXJyb3JNc2dcIlxyXG4+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZXJyb3JNc2c6ZXJyb3JNc2d9XCJcclxuICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tlcnJvck1zZ319PC9wPlxyXG48L3NwYW4+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYHB7d2lkdGg6MTAwJTtoZWlnaHQ6MTdweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiNlMDZhMmY7ZmxvYXQ6bGVmdH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xWYWxpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gIC8v5Y+q5pi+56S6Zm9ybWdyb3Vw5pys6Lqr55qE6ZSZ6K+v77yM5LiN5pi+56S6Z3JvdXDkuItjb250cm9s55qE6ZSZ6K+vXHJcbiAgQElucHV0KCkgb25seUdyb3VwID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZXJyb3JQcm9tcHQ7XHJcbiAgQElucHV0KCkgY29udHJvbE5hbWU7XHJcbiAgQElucHV0KCkgZXJyb3JIb29rOiBGdW5jdGlvbjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHB1YmxpYyBlcnJvck1zZzogc3RyaW5nOyAvL+mqjOivgeWksei0peaYvuekuueahOmUmeivr+a2iOaBr1xyXG5cclxuICBwcml2YXRlIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgcHJpdmF0ZSBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEF0dHJpYnV0ZSgnY29udHJvbE5hbWUnKSBjb250cm9sTmFtZTogc3RyaW5nLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXHJcbiAgICBwcml2YXRlIGVyck1zZ1NlcnY6IEZvcm1WYWxpZE1zZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdsb2JhbFZhbGlkU2VydjogR2xvYmFsVmFsaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhpcy5jb250cm9sTmFtZSA9IGNvbnRyb2xOYW1lLnJlcGxhY2UoLycvZywgJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyAg5YW85a65bmdGcm9tXHJcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuYmluZENvbnRyb2xFcnJvck1zZygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kQ29udHJvbEVycm9yTXNnKCkge1xyXG4gICAgdGhpcy5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKCk7XHJcbiAgICBpZiAoIXRoaXMuY29udHJvbE5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgZmluZCBjb250cm9sTmFtZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgbGV0IHBhdGggPSAnJztcclxuICAgIGNvbnN0IGlzRm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sLmdldCh0aGlzLmNvbnRyb2xOYW1lKVxyXG4gICAgICAmJiAodGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSkgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCk7XHJcbiAgICBpZiAoIWlzRm9ybUNvbnRyb2wpIHtcclxuICAgICAgLy8gZnJvbSByb290IG9yIGZyb20gZm9ybUdyb3VwTmFtZVxyXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbDtcclxuICAgICAgcGF0aCA9IHRoaXMuZ2V0UGF0aCh0aGlzLmZvcm1Db250cm9sLCB0aGlzLmZvcm1Db250cm9sLnJvb3QsIHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vbmx5R3JvdXApIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+dGhpcy5mb3JtQ29udHJvbCwgcGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLFxyXG4gICAgICAgICAgICB7bWluV2VpZ2h0OiBOdW1iZXIuTUFYX1ZBTFVFLCBlcnJvck1zZzogJyd9KVsnZXJyb3JNc2cnXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuY29udGFpbmVyLmNvbnRyb2wuZ2V0KHRoaXMuY29udHJvbE5hbWUpO1xyXG4gICAgICBwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCB0aGlzLmZvcm1Db250cm9sLmVycm9ycylbJ2Vycm9yTXNnJ107XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZvcm1Db250cm9sKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybUNvbnRyb2wgaW5zdGFuY2Ugbm90IGZpbmQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsVmFsaWRTZXJ2LnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sLCB0aGlzLmVycm9ySG9vayk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIC8vQ2FsbGVkIG9uY2UsIGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxyXG4gICAgLy9BZGQgJ2ltcGxlbWVudHMgT25EZXN0cm95JyB0byB0aGUgY2xhc3MuXHJcbiAgICB0aGlzLmdsb2JhbFZhbGlkU2Vydi51bnJlZ2lzdGVyVmFsaWRGb3JtKHRoaXMuZm9ybUNvbnRyb2xbJ3Jvb3QnXSB8fCB0aGlzLmZvcm1Db250cm9sLCB0aGlzLmVycm9ySG9vayk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEZvcm1Db250cm9sTXNnTGlzdGVuZXIoY29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUNvbnRyb2wsIHBhdGgpe1xyXG4gICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpPT57XHJcbiAgICAgIGxldCBlcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCB8fCB0aGlzLmNvbnRyb2xOYW1lLCBjb250cm9sLmVycm9ycylcclxuICAgIH0pO1xyXG4gICAgaWYoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cCl7XHJcbiAgICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scyl7XHJcbiAgICAgICAgdGhpcy5zZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+WZ3JvdXDkuIvpnaLnmoTmiYDmnInpqozor4HplJnor6/mtojmga9cclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRHcm91cENvbnRyb2xWYWxpZE1zZyhjb250cm9sOiBGb3JtR3JvdXAgfCBGb3JtQ29udHJvbCwgcGF0aDogc3RyaW5nLCBlcnJvckluZm8pIHtcclxuXHJcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgbGV0IHRtcEVycm9ySW5mbztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gY29udHJvbC5jb250cm9scykge1xyXG4gICAgICB0bXBFcnJvckluZm8gPSB0aGlzLmdldEdyb3VwQ29udHJvbFZhbGlkTXNnKDxhbnk+Y29udHJvbC5nZXQobmFtZSksIHBhdGggKyAnLicgKyBuYW1lLCBlcnJvckluZm8pO1xyXG4gICAgICBpZih0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSl7XHJcbiAgICAgICAgZXJyb3JJbmZvID0gdG1wRXJyb3JJbmZvO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0bXBFcnJvckluZm8gPSB0aGlzLmVyck1zZ1NlcnYuZ2V0VmFsaWRNc2cocGF0aCwgY29udHJvbC5lcnJvcnMpO1xyXG4gICAgaWYodG1wRXJyb3JJbmZvWydtaW5XZWlnaHQnXSA8IGVycm9ySW5mb1snbWluV2VpZ2h0J10pe1xyXG4gICAgICBlcnJvckluZm8gPSB0bXBFcnJvckluZm87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JJbmZvO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJlbnRHcm91cEVMZW0oKTogRWxlbWVudCB7XHJcbiAgICBsZXQgcGFyZW50RWxlbWVudDogRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zdCBhcnJ0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1mb3JtJykpO1xyXG4gICAgd2hpbGUgKFxyXG4gICAgICBwYXJlbnRFbGVtZW50ICYmXHJcbiAgICAgICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybUdyb3VwTmFtZScpXHJcbiAgICAgICYmICFwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwJykpIHtcclxuICAgICAgaWYocGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnZm9ybScgfHwgcGFyZW50RWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnbmdmb3JtJyl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICghcGFyZW50RWxlbWVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgZmluZCBwYXJlbnRFbGVtZW50XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNsaWJpbmdGb3JtQ29udHJsRWxlbShzZWFyY2hFbGVtOiBFbGVtZW50KSB7XHJcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nOiBFbGVtZW50ID0gc2VhcmNoRWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgd2hpbGUgKHByZXZpb3VzU2libGluZyAmJlxyXG4gICAgICAhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybWNvbnRyb2xuYW1lJykgJiZcclxuICAgICAgIXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpICYmXHJcbiAgICAgICFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcclxuICAgICAgLy8gaWYocHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcImZvcm1Hcm91cE5hbWVcIikgfHwgcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZShcIltmb3JtR3JvdXBdXCIpKXtcclxuICAgICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJoYXZlIHNlYXJjaCB0byByb290XCIpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtcHItZm9ybS1jb250cm9sLXZhbGlkIG11c3QgaGF2ZSBhIGZvcm1jb250cm9sIHNpYmlsaW5nJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6Ieq5Yqo5p+l5om+5b2T5YmN6aqM6K+B5a+55bqU55qEZm9ybUNvbnRyb2xOYW1l5oiW6ICFZm9ybUdyb3VwTmFtZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybUNvbnRyb2xOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb250cm9sTmFtZSkge1xyXG4gICAgICAvLyDmiYvliqjorr7lrprkuoZjb250cm9sTmFtZVxyXG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbE5hbWU7XHJcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25seSBvbmUgW2Zvcm1Db250cm9sXSBub3Qgc3VwcG9ydCwgVGhlcmUgbXVzdCBiZSBhIGZvcm1Hcm91cE5hbWUgb3IgW2Zvcm1Hcm91cF0nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldFBhcmVudEdyb3VwRUxlbSgpO1xyXG4gICAgICBjb25zdCBncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChWQUxJRF9DT01QT05FTlRfTkFNRSkubGVuZ3RoO1xyXG4gICAgICB0aGlzLmdyb3VwVmFsaWRDb250cm9sTGVuZ3RoID0gZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGg7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cERpcmVjdGl2ZSAmJiBncm91cFZhbGlkQ29udHJvbExlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgLy8g55u05o6l5piv5qC56IqC54K55a+55bqU5pW05LiqZnJvbSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXHJcbiAgICAgICAgLy8g5pW05LiqZm9ybeihqOWNleWPquacieS4gOS4qm1wci1mb3JtLWNvbnRyb2wtdmFsaWTvvIzliJnku6XlvZPliY1mb3JtR3JvdXDlr7nlupTnmoTlj5jph4/lkI3kuLpjb250cm9sTmFtZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IHNob3VsZCBzZXQgY29udHJvbE5hbWUgYnkgeW91cnNlbGYnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEZvcm1Hcm91cE5hbWUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG4gICAgICAgIC8vIOeItuiKgueCueaYr2Zvcm3ooajljZXkuK3mn5DkuKpncm91cFxyXG4gICAgICAgIC8vIOaVtOS4qmdyb3Vw5Y+q5pyJ5LiA5LiqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG4gICAgICAgIC8vIOS8mOWFiOWPlmZyb21Hcm91cOeahOmqjOivgVxyXG4gICAgICAgIGNvbnRyb2xOYW1lID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Zvcm1ncm91cG5hbWUnKSB8fCBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZnJvbUdyb3VwTmFtZScpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgTmdNb2RlbEdyb3VwICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAvLyDniLboioLngrnmmK9mb3Jt6KGo5Y2V5Lit5p+Q5LiqZ3JvdXBcclxuICAgICAgICAvLyDmlbTkuKpncm91cOWPquacieS4gOS4qm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuICAgICAgICAvLyDkvJjlhYjlj5Zmcm9tR3JvdXDnmoTpqozor4FcclxuICAgICAgICBjb250cm9sTmFtZSA9IHRoaXMuY29udGFpbmVyLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbXByLWZvcm0tY29udHJvbC12YWxpZCDlr7nlupTkuIDkuKogZm9ybUNvbnRyb2xOYW1lXHJcbiAgICAgICAgLy8g5ZCR5YmN5p+l5om+5YWE5byf6IqC54K5XHJcbiAgICAgICAgY29uc3Qgc2libGluZ0VsZW0gPSB0aGlzLmdldFNsaWJpbmdGb3JtQ29udHJsRWxlbSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgY29udHJvbE5hbWUgPSBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcbiAgICAgICAgICBzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBjb250cm9sTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluW9k+WJjWZvcm1Db250cm9s55u45a+55LqOZm9ybUdyb3Vw55qEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbFxyXG4gICAqIEBwYXJhbSByb290XHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcbiAgICBpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG4gICAgICBpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuICAgICAgICByZXR1cm4gY29udHJvbE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcbiAgICAgIGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuICAgICAgICByZXR1cm4gY3RybE5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuICAgICAgICBpZiAodG1wUGF0aCkge1xyXG4gICAgICAgICAgcGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuICAgICAgICAgIHBhdGgucHVzaCh0bXBQYXRoKTtcclxuICAgICAgICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuICB9XHJcbn1cclxuIl19