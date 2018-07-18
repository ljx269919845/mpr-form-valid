import {
  Component, OnInit, ContentChild, TemplateRef, Input, Inject,
  AfterContentInit, ElementRef, Attribute, Optional
} from '@angular/core';
import {
  ControlContainer, AbstractControl, AbstractControlDirective,
  FormControl, FormGroup, FormGroupName, FormGroupDirective, NgModelGroup
} from '@angular/forms';

import { FormValidMsgService } from '../services/form-valid-msg.service';
import { GlobalValidService } from '../services/global-valid.service';

const VALID_COMPONENT_NAME = 'mpr-form-control-valid';

@Component({
  selector: VALID_COMPONENT_NAME,
  templateUrl: './form-control-valid.component.html',
  styleUrls: ['./form-control-valid.component.css']
})
export class FormControlValidComponent implements OnInit, AfterContentInit {

  //只显示formgroup本身的错误，不显示group下control的错误
  @Input() onlyGroup = false;
  @Input() errorPrompt;

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  public errorMsg: string; //验证失败显示的错误消息

  private formControl: AbstractControl;
  private controlName: string;
  private groupValidControlLength = 1;

  constructor(
    @Attribute('controlName') controlName: string,
    @Optional() private container: ControlContainer,
    private errMsgServ: FormValidMsgService,
    private globalValidServ: GlobalValidService,
    private elemRef: ElementRef) {
    if (controlName) {
      this.controlName = controlName.replace(/'/g, '');
    }
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    //  兼容ngFrom
    Promise.resolve(null).then(() => {
      this.bindControlErrorMsg();
    });
  }

  bindControlErrorMsg() {
    this.controlName = this.getFormControlName();
    if (!this.controlName) {
      throw new Error("can't find controlName");
    }
    console.log(this.controlName);
    let path = '';
    if (this.groupValidControlLength <= 1) {
      // from root or from formGroupName
      this.formControl = this.container.control;
      path = this.getPath(this.formControl, this.formControl.root, this.controlName);
      this.formControl.valueChanges.subscribe(() => {
        if (this.onlyGroup) {
          this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors);
        } else {
          this.errorMsg = this.getGroupControlValidMsg(<any>this.formControl, path || this.controlName);
        }
      });
    } else {
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl);
  }

  /**
   * 获取group下面的所有验证错误消息
   * @param control 
   * @param path 
   */
  private getGroupControlValidMsg(control: FormGroup | FormControl, path: string) {
    if (control instanceof FormControl) {
      return this.errMsgServ.getValidMsg(path, control.errors);
    }
    let msg;
    for (let name in control.controls) {
      msg = this.getGroupControlValidMsg(<any>control.get(name), path + '.' + name);
      if (msg) {
        return msg;
      }
    }
    return this.errMsgServ.getValidMsg(path, control.errors);
  }

  private getParentGroupELem(): Element {
    let parentElement: Element = this.elemRef.nativeElement.parentElement;
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

  private getSlibingFormContrlElem(searchElem: Element) {
    let previousSibling: Element = searchElem.previousElementSibling;
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
   */
  private getFormControlName(): string {
    if (this.controlName) {
      // 手动设定了controlName
      return this.controlName;
    }

    let controlName;
    if (!this.container) {
      throw new Error('only one [formControl] not support, There must be a formGroupName or [formGroup]');
    } else {
      const parentElement: Element = this.getParentGroupELem();
      const groupValidControlLength = parentElement.querySelectorAll(VALID_COMPONENT_NAME).length;
      this.groupValidControlLength = groupValidControlLength;
      if (this.container instanceof FormGroupDirective && groupValidControlLength <= 1) {
        // 直接是根节点对应整个from [formGroup]="formGroup"
        // 整个form表单只有一个mpr-form-control-valid，则以当前formGroup对应的变量名为controlName
        throw new Error('you should set controlName by yourself');
      } else if (this.container instanceof FormGroupName && groupValidControlLength <= 1) {
        // 父节点是form表单中某个group
        // 整个group只有一个mpr-form-control-valid
        // 优先取fromGroup的验证
        controlName = parentElement.getAttribute('formgroupname') || parentElement.getAttribute('fromGroupName');
      } else if (this.container instanceof NgModelGroup && groupValidControlLength <= 1) {
        // 父节点是form表单中某个group
        // 整个group只有一个mpr-form-control-valid
        // 优先取fromGroup的验证
        controlName = this.container.name;
      } else {
        // mpr-form-control-valid 对应一个 formControlName
        // 向前查找兄弟节点
        const siblingElem = this.getSlibingFormContrlElem(this.elemRef.nativeElement);
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
   * @param formControl 
   * @param root 
   * @param controlName 
   */
  private getPath(formControl: AbstractControl, root, controlName) {
    if (!(root instanceof FormGroup)) {
      if (formControl === root) {
        return controlName;
      }
      return '';
    }
    const path = [];
    for (const ctrlName in root['controls']) {
      if (root['controls'][ctrlName] === formControl) {
        return ctrlName;
      }
      if (root['controls'][ctrlName] instanceof FormGroup) {
        const tmpPath = this.getPath(formControl, root['controls'][ctrlName], controlName);
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
