import { Component, OnInit, ContentChild, TemplateRef, Input, Inject, AfterContentInit, ElementRef, Attribute, Optional } from '@angular/core';
import {
  ControlContainer, AbstractControl, AbstractControlDirective,
  FormControl, FormGroup, FormGroupName, FormGroupDirective
} from '@angular/forms';

import { FormValidMsgService } from '../form-valid-msg.service';
import { GlobalValidService } from '../global-valid.service';

@Component({
  selector: 'mpr-form-control-valid',
  templateUrl: './form-control-valid.component.html',
  styleUrls: ['./form-control-valid.component.css']
})
export class FormControlValidComponent implements OnInit, AfterContentInit {

  /**
   * 自定义errorMsg的template
   * @type {TemplateRef}
   * @example
   * <mpr-form-control-valid>
   *  <ng-template>
   *    <span>{{errorMsg}}</span>
   *  </ng-template>
   * </mpr-form-control-valid>
   */
  @ContentChild(TemplateRef) template;

  public errorMsg: string; //验证失败显示的错误消息

  private formControl: AbstractControl;
  private controlName:string;
  private groupValidControlLength = 1;

  constructor(
    @Attribute('controlName') controlName:string,
    @Optional() private container: ControlContainer,
    private errMsgServ: FormValidMsgService,
    private globalValidServ: GlobalValidService,
    private elemRef: ElementRef) {
      if(controlName){
        this.controlName = controlName.replace(/'/g, '');
      }
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.controlName = this.getFormControlName();
    let path = '';
    if(this.groupValidControlLength <= 1){
      // from root or from formGroupName
      this.formControl = this.container.control;
      path = this.getPath(this.formControl, this.formControl.root, this.controlName);
      this.formControl.valueChanges.subscribe(()=>{
        for (const controlName in this.formControl['controls']) {
          const msg = this.errMsgServ.getValidMsg(path ? path + '.' + controlName : controlName,
            this.formControl['controls'][controlName].errors);
          if (!msg) {
            continue;
          } else {
            this.errorMsg = msg;
            return;
          }
        }
        this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors);
      });
    }else{
      this.formControl = this.container.control.get(this.controlName);
      path = this.getPath(this.formControl, this.formControl.root, this.controlName);
      this.formControl.valueChanges.subscribe(()=>{
        this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors);
      })
    }
    if(!this.formControl){
      throw new Error('formControl instance not find');
    }
    this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.globalValidServ.unregisterValidForm(this.formControl['root'] || this.formControl);
  }


  private getParentGroupELem(): Element {
    let parentElement: Element = this.elemRef.nativeElement.parentElement;
    while (!parentElement.getAttribute('formGroupName') || !parentElement.getAttribute('[formGroup]')) {
      parentElement = parentElement.parentElement;
    }
    if(!parentElement){
      throw new Error("can not find parentElement");
    }
    return parentElement;
  }

  private getSlibingFormContrlElem(searchElem: Element){
    let previousSibling:Element = searchElem.previousElementSibling;
    while(previousSibling && !previousSibling.hasAttribute('formControlName')){
      // if(previousSibling.hasAttribute("formGroupName") || previousSibling.hasAttribute("[formGroup]")){
      //   throw new Error("have search to root");
      // }
      previousSibling = previousSibling.previousElementSibling;
    }
    if(!previousSibling){
      throw new Error("mpr-form-control-valid must have a formcontrol sibiling");
    }
    return previousSibling;
  }

  /**
   * 检查一个formGroup下有多个mpr-form-control-valid, 是否专门为formGroup配置了一个验证
   * 要求formGroup的验证为最后面一个
   */
  private checkOnluForGroupValid(){
    let previousSibling:Element = this.elemRef.nativeElement.previousElementSibling;
    while(previousSibling && !previousSibling.hasAttribute('formControlName') 
      && previousSibling.nodeName != 'mpr-form-control-valid'){
        //向前查找一个fromControlName， 如果再次找到 mpr-form-control-valid 则为true
        previousSibling = previousSibling.previousElementSibling;
    }
    if(!previousSibling){
      return false;
    }
    if(previousSibling.hasAttribute('formControlName')){
      return false;
    }
    return true;
  }


  /**
   * 自动查找当前验证对应的formControlName或者formGroupName
   */
  private getFormControlName(): string{
    if(this.controlName){ 
      //手动设定了controlName
      return this.controlName;
    }

    let controlName;
    if(!this.container){
      throw new Error('only one [formControl] not support, There must be a formGroupName or [formGroup]');
    }else{
      let parentElement: Element = this.getParentGroupELem();
      let groupValidControlLength = parentElement.querySelectorAll('mpr-form-control-valid').length;
      this.groupValidControlLength = groupValidControlLength;
      let controlsLength = 0;
      if(this.container instanceof FormGroupDirective && groupValidControlLength <= 1){
        //直接是根节点对应整个from [formGroup]="formGroup"
        //整个form表单只有一个mpr-form-control-valid，则以当前formGroup对应的变量名为controlName
        controlName = parentElement.getAttribute('[formGroup]');
        controlsLength = Object.keys((<FormGroupName|FormGroupDirective>this.container).control.controls).length;
      }else if(this.container instanceof FormGroupName && groupValidControlLength <= 1){
        //父节点是form表单中某个group
        //整个group只有一个mpr-form-control-valid
        //优先取fromGroup的验证
        controlName =  parentElement.getAttribute('fromGroupName');
        controlsLength = Object.keys((<FormGroupName|FormGroupDirective>this.container).control.controls).length;
      }else{
        // mpr-form-control-valid 对应一个 formControlName
        // 向前查找兄弟节点
        let siblingElem = this.getSlibingFormContrlElem(this.elemRef.nativeElement);
        controlName = siblingElem.getAttribute('formControlName');
      }
      //每一个formControlName只能配置一个 mpr-form-control-valid
      if(controlsLength < groupValidControlLength){
        throw new Error('mpr-contorl-valid is too many');
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
  private getPath(formControl:AbstractControl, root, controlName) {
    if (!(root instanceof FormGroup)) {
      if (formControl === root) {
        return controlName;
      }
      return '';
    }
    const path = [];
    for (const ctrlName in root['controls']) {
      if (root['controls'][ctrlName] instanceof FormGroup) {
        const tmpPath = this.getPath(formControl, root['controls'][ctrlName], controlName);
        if (tmpPath) {
          path.push(ctrlName);
          path.push(tmpPath);
          return path.join('.');
        }
      } else if (root['controls'][ctrlName] === formControl) {
        return ctrlName;
      }
    }
    return path.join('.');
  }
}
