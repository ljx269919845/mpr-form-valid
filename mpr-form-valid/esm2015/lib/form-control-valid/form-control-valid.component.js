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
    ngOnInit() { }
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
        const /** @type {?} */ isFormControl = this.container.control.get(this.controlName) &&
            this.container.control.get(this.controlName) instanceof FormControl;
        if (!isFormControl) {
            // from root or from formGroupName
            this.formControl = this.container.control;
            path = this.getPath(this.formControl, this.formControl.root, this.controlName);
            this.formControl.statusChanges.subscribe(() => {
                if (this.formControl.pristine) {
                    return;
                }
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
                if (this.formControl.pristine) {
                    return;
                }
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
        if (this.formControl) {
            this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
        }
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
    FormControlValidComponent.prototype.container;
    /** @type {?} */
    FormControlValidComponent.prototype.errMsgServ;
    /** @type {?} */
    FormControlValidComponent.prototype.globalValidServ;
    /** @type {?} */
    FormControlValidComponent.prototype.elemRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLXZhbGlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL2Zvcm0tY29udHJvbC12YWxpZC9mb3JtLWNvbnRyb2wtdmFsaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ04sU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUdMLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTixnQkFBZ0IsRUFHaEIsV0FBVyxFQUNYLFNBQVMsRUFDVCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLHVCQUFNLG9CQUFvQixHQUFHLHdCQUF3QixDQUFDO0FBa0J0RCxNQUFNOzs7Ozs7OztJQWNMLFlBQzJCLFdBQW1CLEVBQ3pCLFNBQTJCLEVBQ3ZDLFlBQ0EsaUJBQ0E7UUFIWSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLG9CQUFlLEdBQWYsZUFBZTtRQUNmLFlBQU8sR0FBUCxPQUFPOzt5QkFqQkssS0FBSzt1Q0FVUSxDQUFDO1FBU2xDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNqRDtLQUNEOzs7O0lBRUQsUUFBUSxNQUFLOzs7O0lBRWIsa0JBQWtCOztRQUVqQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFH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QUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ25GLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0Q7U0FDRDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7O1lBdFF2QixTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztDQVdWO2dCQUNBLE1BQU0sRUFBRSxDQUFDLHFFQUFxRSxDQUFDO2FBQy9FOzs7O3lDQWdCRSxTQUFTLFNBQUMsYUFBYTtZQTlDekIsZ0JBQWdCLHVCQStDZCxRQUFRO1lBckNGLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFoQjFCLFVBQVU7Ozt3QkFzQ1QsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFFTCxZQUFZLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0Q29tcG9uZW50LFxyXG5cdE9uSW5pdCxcclxuXHRDb250ZW50Q2hpbGQsXHJcblx0VGVtcGxhdGVSZWYsXHJcblx0SW5wdXQsXHJcblx0SW5qZWN0LFxyXG5cdEFmdGVyQ29udGVudEluaXQsXHJcblx0RWxlbWVudFJlZixcclxuXHRBdHRyaWJ1dGUsXHJcblx0T3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuXHRDb250cm9sQ29udGFpbmVyLFxyXG5cdEFic3RyYWN0Q29udHJvbCxcclxuXHRBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsXHJcblx0Rm9ybUNvbnRyb2wsXHJcblx0Rm9ybUdyb3VwLFxyXG5cdEZvcm1Hcm91cE5hbWUsXHJcblx0Rm9ybUdyb3VwRGlyZWN0aXZlLFxyXG5cdE5nTW9kZWxHcm91cFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm1WYWxpZE1zZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2xvYmFsVmFsaWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgVkFMSURfQ09NUE9ORU5UX05BTUUgPSAnbXByLWZvcm0tY29udHJvbC12YWxpZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogVkFMSURfQ09NUE9ORU5UX05BTUUsXHJcblx0dGVtcGxhdGU6IGA8c3BhblxyXG4gICAgY2xhc3M9XCJlcnJvclwiXHJcbiAgICBbbmdDbGFzc109XCJlcnJvclByb21wdFwiXHJcbiAgICBbaGlkZGVuXT1cIiFlcnJvck1zZ1wiXHJcbj5cclxuICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntlcnJvck1zZzplcnJvck1zZ31cIlxyXG4gICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgPHAgKm5nSWY9XCIhdGVtcGxhdGVcIj57e2Vycm9yTXNnfX08L3A+XHJcbjwvc3Bhbj5cclxuYCxcclxuXHRzdHlsZXM6IFtgcHt3aWR0aDoxMDAlO2hlaWdodDoxN3B4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6I2UwNmEyZjtmbG9hdDpsZWZ0fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbFZhbGlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHQvL+WPquaYvuekumZvcm1ncm91cOacrOi6q+eahOmUmeivr++8jOS4jeaYvuekumdyb3Vw5LiLY29udHJvbOeahOmUmeivr1xyXG5cdEBJbnB1dCgpIG9ubHlHcm91cCA9IGZhbHNlO1xyXG5cdEBJbnB1dCgpIGVycm9yUHJvbXB0O1xyXG5cdEBJbnB1dCgpIGNvbnRyb2xOYW1lO1xyXG5cdEBJbnB1dCgpIGVycm9ySG9vazogRnVuY3Rpb247XHJcblxyXG5cdEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuXHRwdWJsaWMgZXJyb3JNc2c6IHN0cmluZzsgLy/pqozor4HlpLHotKXmmL7npLrnmoTplJnor6/mtojmga9cclxuXHJcblx0cHJpdmF0ZSBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xyXG5cdHByaXZhdGUgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSAxO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdEBBdHRyaWJ1dGUoJ2NvbnRyb2xOYW1lJykgY29udHJvbE5hbWU6IHN0cmluZyxcclxuXHRcdEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxyXG5cdFx0cHJpdmF0ZSBlcnJNc2dTZXJ2OiBGb3JtVmFsaWRNc2dTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSBnbG9iYWxWYWxpZFNlcnY6IEdsb2JhbFZhbGlkU2VydmljZSxcclxuXHRcdHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZlxyXG5cdCkge1xyXG5cdFx0aWYgKGNvbnRyb2xOYW1lKSB7XHJcblx0XHRcdHRoaXMuY29udHJvbE5hbWUgPSBjb250cm9sTmFtZS5yZXBsYWNlKC8nL2csICcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge31cclxuXHJcblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG5cdFx0Ly8gIOWFvOWuuW5nRnJvbVxyXG5cdFx0UHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmJpbmRDb250cm9sRXJyb3JNc2coKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YmluZENvbnRyb2xFcnJvck1zZygpIHtcclxuXHRcdHRoaXMuY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZSgpO1xyXG5cdFx0aWYgKCF0aGlzLmNvbnRyb2xOYW1lKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImNhbid0IGZpbmQgY29udHJvbE5hbWVcIik7XHJcblx0XHR9XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnRyb2xOYW1lKTtcclxuXHRcdGxldCBwYXRoID0gJyc7XHJcblx0XHRjb25zdCBpc0Zvcm1Db250cm9sID1cclxuXHRcdFx0dGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSkgJiZcclxuXHRcdFx0dGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSkgaW5zdGFuY2VvZiBGb3JtQ29udHJvbDtcclxuXHRcdGlmICghaXNGb3JtQ29udHJvbCkge1xyXG5cdFx0XHQvLyBmcm9tIHJvb3Qgb3IgZnJvbSBmb3JtR3JvdXBOYW1lXHJcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmNvbnRhaW5lci5jb250cm9sO1xyXG5cdFx0XHRwYXRoID0gdGhpcy5nZXRQYXRoKHRoaXMuZm9ybUNvbnRyb2wsIHRoaXMuZm9ybUNvbnRyb2wucm9vdCwgdGhpcy5jb250cm9sTmFtZSk7XHJcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmZvcm1Db250cm9sLnByaXN0aW5lKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLm9ubHlHcm91cCkge1xyXG5cdFx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKVtcclxuXHRcdFx0XHRcdFx0J2Vycm9yTXNnJ1xyXG5cdFx0XHRcdFx0XTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0R3JvdXBDb250cm9sVmFsaWRNc2coPGFueT50aGlzLmZvcm1Db250cm9sLCBwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHtcclxuXHRcdFx0XHRcdFx0bWluV2VpZ2h0OiBOdW1iZXIuTUFYX1ZBTFVFLFxyXG5cdFx0XHRcdFx0XHRlcnJvck1zZzogJydcclxuXHRcdFx0XHRcdH0pWydlcnJvck1zZyddO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sID0gdGhpcy5jb250YWluZXIuY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSk7XHJcblx0XHRcdHBhdGggPSB0aGlzLmdldFBhdGgodGhpcy5mb3JtQ29udHJvbCwgdGhpcy5mb3JtQ29udHJvbC5yb290LCB0aGlzLmNvbnRyb2xOYW1lKTtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2wucHJpc3RpbmUpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoIHx8IHRoaXMuY29udHJvbE5hbWUsIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzKVtcclxuXHRcdFx0XHRcdCdlcnJvck1zZydcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1Db250cm9sIGluc3RhbmNlIG5vdCBmaW5kJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmdsb2JhbFZhbGlkU2Vydi5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcblx0XHQvL0NhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cclxuXHRcdC8vQWRkICdpbXBsZW1lbnRzIE9uRGVzdHJveScgdG8gdGhlIGNsYXNzLlxyXG5cdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcclxuXHRcdFx0dGhpcy5nbG9iYWxWYWxpZFNlcnYudW5yZWdpc3RlclZhbGlkRm9ybSh0aGlzLmZvcm1Db250cm9sWydyb290J10gfHwgdGhpcy5mb3JtQ29udHJvbCwgdGhpcy5lcnJvckhvb2spO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzZXRGb3JtQ29udHJvbE1zZ0xpc3RlbmVyKGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1Db250cm9sLCBwYXRoKSB7XHJcblx0XHRjb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRsZXQgZXJyb3JJbmZvID0gdGhpcy5lcnJNc2dTZXJ2LmdldFZhbGlkTXNnKHBhdGggfHwgdGhpcy5jb250cm9sTmFtZSwgY29udHJvbC5lcnJvcnMpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xyXG5cdFx0XHRmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuXHRcdFx0XHR0aGlzLnNldEZvcm1Db250cm9sTXNnTGlzdGVuZXIoPGFueT5jb250cm9sLmdldChuYW1lKSwgcGF0aCArICcuJyArIG5hbWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgKiDojrflj5Zncm91cOS4i+mdoueahOaJgOaciemqjOivgemUmeivr+a2iOaBr1xyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICogQHBhcmFtIHBhdGhcclxuICAgKi9cclxuXHRwcml2YXRlIGdldEdyb3VwQ29udHJvbFZhbGlkTXNnKGNvbnRyb2w6IGFueSwgcGF0aDogc3RyaW5nLCBlcnJvckluZm8pIHtcclxuXHRcdGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wgJiYgIWNvbnRyb2wucHJpc3RpbmUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcblx0XHR9IGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCAmJiBjb250cm9sLnByaXN0aW5lKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHRcdGxldCB0bXBFcnJvckluZm87XHJcblx0XHRmb3IgKGxldCBuYW1lIGluIGNvbnRyb2wuY29udHJvbHMpIHtcclxuXHRcdFx0dG1wRXJyb3JJbmZvID0gdGhpcy5nZXRHcm91cENvbnRyb2xWYWxpZE1zZyg8YW55PmNvbnRyb2wuZ2V0KG5hbWUpLCBwYXRoICsgJy4nICsgbmFtZSwgZXJyb3JJbmZvKTtcclxuXHRcdFx0aWYgKHRtcEVycm9ySW5mbyAmJiB0bXBFcnJvckluZm9bJ21pbldlaWdodCddIDwgZXJyb3JJbmZvWydtaW5XZWlnaHQnXSkge1xyXG5cdFx0XHRcdGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKCFjb250cm9sLnByaXN0aW5lKSB7XHJcblx0XHRcdHRtcEVycm9ySW5mbyA9IHRoaXMuZXJyTXNnU2Vydi5nZXRWYWxpZE1zZyhwYXRoLCBjb250cm9sLmVycm9ycyk7XHJcblx0XHR9XHJcblx0XHRpZiAodG1wRXJyb3JJbmZvICYmIHRtcEVycm9ySW5mb1snbWluV2VpZ2h0J10gPCBlcnJvckluZm9bJ21pbldlaWdodCddKSB7XHJcblx0XHRcdGVycm9ySW5mbyA9IHRtcEVycm9ySW5mbztcclxuXHRcdH1cclxuXHRcdHJldHVybiBlcnJvckluZm87XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFBhcmVudEdyb3VwRUxlbSgpOiBFbGVtZW50IHtcclxuXHRcdGxldCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuXHRcdC8vIGNvbnN0IGFycnRyaWJ1dGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduZy1yZWZsZWN0LWZvcm0nKSk7XHJcblx0XHR3aGlsZSAoXHJcblx0XHRcdHBhcmVudEVsZW1lbnQgJiZcclxuXHRcdFx0IXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXBuYW1lJykgJiZcclxuXHRcdFx0IXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtR3JvdXBOYW1lJykgJiZcclxuXHRcdFx0IXBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3JtZ3JvdXAnKVxyXG5cdFx0KSB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICdmb3JtJyB8fFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ25nZm9ybSdcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0cGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuXHRcdH1cclxuXHRcdGlmICghcGFyZW50RWxlbWVudCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCk7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignY2FuIG5vdCBmaW5kIHBhcmVudEVsZW1lbnQnKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJlbnRFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRTbGliaW5nRm9ybUNvbnRybEVsZW0oc2VhcmNoRWxlbTogRWxlbWVudCkge1xyXG5cdFx0bGV0IHByZXZpb3VzU2libGluZzogRWxlbWVudCA9IHNlYXJjaEVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHRcdHdoaWxlIChcclxuXHRcdFx0cHJldmlvdXNTaWJsaW5nICYmXHJcblx0XHRcdCFwcmV2aW91c1NpYmxpbmcuaGFzQXR0cmlidXRlKCdmb3JtY29udHJvbG5hbWUnKSAmJlxyXG5cdFx0XHQhcHJldmlvdXNTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgJiZcclxuXHRcdFx0IXByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoJ25hbWUnKVxyXG5cdFx0KSB7XHJcblx0XHRcdC8vIGlmKHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJmb3JtR3JvdXBOYW1lXCIpIHx8IHByZXZpb3VzU2libGluZy5oYXNBdHRyaWJ1dGUoXCJbZm9ybUdyb3VwXVwiKSl7XHJcblx0XHRcdC8vICAgdGhyb3cgbmV3IEVycm9yKFwiaGF2ZSBzZWFyY2ggdG8gcm9vdFwiKTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHRcdH1cclxuXHRcdGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignbXByLWZvcm0tY29udHJvbC12YWxpZCBtdXN0IGhhdmUgYSBmb3JtY29udHJvbCBzaWJpbGluZycpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHByZXZpb3VzU2libGluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAqIOiHquWKqOafpeaJvuW9k+WJjemqjOivgeWvueW6lOeahGZvcm1Db250cm9sTmFtZeaIluiAhWZvcm1Hcm91cE5hbWVcclxuICAgKi9cclxuXHRwcml2YXRlIGdldEZvcm1Db250cm9sTmFtZSgpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuY29udHJvbE5hbWUpIHtcclxuXHRcdFx0Ly8g5omL5Yqo6K6+5a6a5LqGY29udHJvbE5hbWVcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udHJvbE5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNvbnRyb2xOYW1lO1xyXG5cdFx0aWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIFtmb3JtQ29udHJvbF0gbm90IHN1cHBvcnQsIFRoZXJlIG11c3QgYmUgYSBmb3JtR3JvdXBOYW1lIG9yIFtmb3JtR3JvdXBdJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBwYXJlbnRFbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnRHcm91cEVMZW0oKTtcclxuXHRcdFx0Y29uc3QgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoVkFMSURfQ09NUE9ORU5UX05BTUUpLmxlbmd0aDtcclxuXHRcdFx0dGhpcy5ncm91cFZhbGlkQ29udHJvbExlbmd0aCA9IGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoO1xyXG5cdFx0XHRpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBEaXJlY3RpdmUgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG5cdFx0XHRcdC8vIOebtOaOpeaYr+agueiKgueCueWvueW6lOaVtOS4qmZyb20gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIlxyXG5cdFx0XHRcdC8vIOaVtOS4qmZvcm3ooajljZXlj6rmnInkuIDkuKptcHItZm9ybS1jb250cm9sLXZhbGlk77yM5YiZ5Lul5b2T5YmNZm9ybUdyb3Vw5a+55bqU55qE5Y+Y6YeP5ZCN5Li6Y29udHJvbE5hbWVcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgc2V0IGNvbnRyb2xOYW1lIGJ5IHlvdXJzZWxmJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBGb3JtR3JvdXBOYW1lICYmIGdyb3VwVmFsaWRDb250cm9sTGVuZ3RoIDw9IDEpIHtcclxuXHRcdFx0XHQvLyDniLboioLngrnmmK9mb3Jt6KGo5Y2V5Lit5p+Q5LiqZ3JvdXBcclxuXHRcdFx0XHQvLyDmlbTkuKpncm91cOWPquacieS4gOS4qm1wci1mb3JtLWNvbnRyb2wtdmFsaWRcclxuXHRcdFx0XHQvLyDkvJjlhYjlj5Zmcm9tR3JvdXDnmoTpqozor4FcclxuXHRcdFx0XHRjb250cm9sTmFtZSA9XHJcblx0XHRcdFx0XHRwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9ybWdyb3VwbmFtZScpIHx8IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmcm9tR3JvdXBOYW1lJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXAgJiYgZ3JvdXBWYWxpZENvbnRyb2xMZW5ndGggPD0gMSkge1xyXG5cdFx0XHRcdC8vIOeItuiKgueCueaYr2Zvcm3ooajljZXkuK3mn5DkuKpncm91cFxyXG5cdFx0XHRcdC8vIOaVtOS4qmdyb3Vw5Y+q5pyJ5LiA5LiqbXByLWZvcm0tY29udHJvbC12YWxpZFxyXG5cdFx0XHRcdC8vIOS8mOWFiOWPlmZyb21Hcm91cOeahOmqjOivgVxyXG5cdFx0XHRcdGNvbnRyb2xOYW1lID0gdGhpcy5jb250YWluZXIubmFtZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBtcHItZm9ybS1jb250cm9sLXZhbGlkIOWvueW6lOS4gOS4qiBmb3JtQ29udHJvbE5hbWVcclxuXHRcdFx0XHQvLyDlkJHliY3mn6Xmib7lhYTlvJ/oioLngrlcclxuXHRcdFx0XHRjb25zdCBzaWJsaW5nRWxlbSA9IHRoaXMuZ2V0U2xpYmluZ0Zvcm1Db250cmxFbGVtKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KTtcclxuXHRcdFx0XHRjb250cm9sTmFtZSA9XHJcblx0XHRcdFx0XHRzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1jb250cm9sbmFtZScpIHx8XHJcblx0XHRcdFx0XHRzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHx8XHJcblx0XHRcdFx0XHRzaWJsaW5nRWxlbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Ly8gaWYodGhpcy5jb250cm9sTmFtZSAmJiB0aGlzLmNvbnRyb2xOYW1lICE9IGNvbnRyb2xOYW1lKXtcclxuXHRcdC8vICAgdGhyb3cgbmV3IEVycm9yKGB5b3UgbWF5IHNldCBhIGVycm9yIGNvbnRyb2xOYW1lLCB5b3Ugc2V0IGlzOiAke3RoaXMuY29udHJvbE5hbWV9LCBidXQgbmVlZCBpczogJHtjb250cm9sTmFtZX1gKTtcclxuXHRcdC8vIH1cclxuXHRcdHJldHVybiBjb250cm9sTmFtZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAqIOiOt+WPluW9k+WJjWZvcm1Db250cm9s55u45a+55LqOZm9ybUdyb3Vw55qEcGF0aFxyXG4gICAqIEBwYXJhbSBmb3JtQ29udHJvbFxyXG4gICAqIEBwYXJhbSByb290XHJcbiAgICogQHBhcmFtIGNvbnRyb2xOYW1lXHJcbiAgICovXHJcblx0cHJpdmF0ZSBnZXRQYXRoKGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHJvb3QsIGNvbnRyb2xOYW1lKSB7XHJcblx0XHRpZiAoIShyb290IGluc3RhbmNlb2YgRm9ybUdyb3VwKSkge1xyXG5cdFx0XHRpZiAoZm9ybUNvbnRyb2wgPT09IHJvb3QpIHtcclxuXHRcdFx0XHRyZXR1cm4gY29udHJvbE5hbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgcGF0aCA9IFtdO1xyXG5cdFx0Zm9yIChjb25zdCBjdHJsTmFtZSBpbiByb290Wydjb250cm9scyddKSB7XHJcblx0XHRcdGlmIChyb290Wydjb250cm9scyddW2N0cmxOYW1lXSA9PT0gZm9ybUNvbnRyb2wpIHtcclxuXHRcdFx0XHRyZXR1cm4gY3RybE5hbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHJvb3RbJ2NvbnRyb2xzJ11bY3RybE5hbWVdIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XHJcblx0XHRcdFx0Y29uc3QgdG1wUGF0aCA9IHRoaXMuZ2V0UGF0aChmb3JtQ29udHJvbCwgcm9vdFsnY29udHJvbHMnXVtjdHJsTmFtZV0sIGNvbnRyb2xOYW1lKTtcclxuXHRcdFx0XHRpZiAodG1wUGF0aCkge1xyXG5cdFx0XHRcdFx0cGF0aC5wdXNoKGN0cmxOYW1lKTtcclxuXHRcdFx0XHRcdHBhdGgucHVzaCh0bXBQYXRoKTtcclxuXHRcdFx0XHRcdHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXRoLmpvaW4oJy4nKTtcclxuXHR9XHJcbn1cclxuIl19