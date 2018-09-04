import { OnInit, TemplateRef, AfterContentInit, ElementRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FormValidMsgService } from '../services/form-valid-msg.service';
import { GlobalValidService } from '../services/global-valid.service';
export declare class FormControlValidComponent implements OnInit, AfterContentInit {
    private container;
    private errMsgServ;
    private globalValidServ;
    private elemRef;
    onlyGroup: boolean;
    errorPrompt: any;
    controlName: any;
    template: TemplateRef<any>;
    errorMsg: string;
    private formControl;
    private groupValidControlLength;
    constructor(controlName: string, container: ControlContainer, errMsgServ: FormValidMsgService, globalValidServ: GlobalValidService, elemRef: ElementRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    bindControlErrorMsg(): void;
    ngOnDestroy(): void;
    private setFormControlMsgListener(control, path);
    /**
     * 获取group下面的所有验证错误消息
     * @param control
     * @param path
     */
    private getGroupControlValidMsg(control, path, errorInfo);
    private getParentGroupELem();
    private getSlibingFormContrlElem(searchElem);
    /**
     * 自动查找当前验证对应的formControlName或者formGroupName
     */
    private getFormControlName();
    /**
     * 获取当前formControl相对于formGroup的path
     * @param formControl
     * @param root
     * @param controlName
     */
    private getPath(formControl, root, controlName);
}
