import {
  Component,
  OnInit,
  ContentChild,
  TemplateRef,
  Input,
  Inject,
  AfterContentInit,
  ElementRef,
  Attribute,
  Optional
} from '@angular/core';
import {
  ControlContainer,
  AbstractControl,
  AbstractControlDirective,
  FormControl,
  FormGroup,
  FormGroupName,
  FormGroupDirective,
  NgModelGroup
} from '@angular/forms';

import { FormValidMsgService } from '../services/form-valid-msg.service';
import { GlobalValidService } from '../services/global-valid.service';

const VALID_COMPONENT_NAME = 'mpr-form-control-valid';

@Component({
  selector: VALID_COMPONENT_NAME,
  templateUrl: './form-control-valid.component.html',
  styleUrls: [ './form-control-valid.component.css' ]
})
export class FormControlValidComponent implements OnInit {
  //只显示formgroup本身的错误，不显示group下control的错误
  @Input() onlyGroup = false;
  @Input() errorPrompt;
  @Input() controlName;
  @Input() errorHook: Function;

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  public errorMsg: string; //验证失败显示的错误消息

  private formControl: AbstractControl;
  private groupValidControlLength = 1;
  private delete = false;

  constructor(
    @Attribute('controlName') controlName: string,
    @Optional() private container: ControlContainer,
    private errMsgServ: FormValidMsgService,
    private globalValidServ: GlobalValidService,
    private elemRef: ElementRef
  ) {
    if (controlName) {
      this.controlName = controlName.replace(/'/g, '');
    }
  }

  ngOnInit() {}

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

  bindControlErrorMsg() {
    this.controlName = this.getFormControlName();
    if (!this.controlName) {
      throw new Error("can't find controlName");
    }
    console.log(this.controlName);
    let path = '';
    const isFormControl =
      this.container.control.get(this.controlName) &&
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
        } else {
          this.errorMsg = this.getGroupControlValidMsg(<any>this.formControl, path || this.controlName, {
            minWeight: Number.MAX_VALUE,
            errorMsg: ''
          })['errorMsg'];
        }
      });
    } else {
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.formControl) {
      this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl, this.errorHook);
    }
    this.delete = true;
  }

  private setFormControlMsgListener(control: FormGroup | FormControl, path) {
    control.valueChanges.subscribe(() => {
      let errorInfo = this.errMsgServ.getValidMsg(path || this.controlName, control.errors);
    });
    if (control instanceof FormGroup) {
      for (let name in control.controls) {
        this.setFormControlMsgListener(<any>control.get(name), path + '.' + name);
      }
    }
  }

  /**
   * 获取group下面的所有验证错误消息
   * @param control
   * @param path
   */
  private getGroupControlValidMsg(control: any, path: string, errorInfo) {
    if (control instanceof FormControl && !control.pristine) {
      return this.errMsgServ.getValidMsg(path, control.errors);
    } else if (control instanceof FormControl && control.pristine) {
      return '';
    }
    let tmpErrorInfo;
    for (let name in control.controls) {
      tmpErrorInfo = this.getGroupControlValidMsg(<any>control.get(name), path + '.' + name, errorInfo);
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

  private getParentGroupELem(): Element {
    let parentElement: Element = this.elemRef.nativeElement.parentElement;
    // const arrtributeNames: Array<string> = parentElement.getAttributeNames();
    // console.log(parentElement.getAttribute('ng-reflect-form'));
    while (
      parentElement &&
      !parentElement.getAttribute('formgroupname') &&
      !parentElement.getAttribute('formGroupName') &&
      !parentElement.getAttribute('formgroup')
    ) {
      if (
        parentElement.nodeName.toLocaleLowerCase() === 'form' ||
        parentElement.nodeName.toLocaleLowerCase() === 'ngform'
      ) {
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

  private getSlibingFormContrlElem(searchElem: Element) {
    let previousSibling: Element = searchElem.previousElementSibling;
    while (
      previousSibling &&
      !previousSibling.hasAttribute('formcontrolname') &&
      !previousSibling.hasAttribute('formControlName') &&
      !previousSibling.hasAttribute('name')
    ) {
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
