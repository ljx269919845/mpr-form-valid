import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class GlobalValidService {
  private validForms: Array<any> = [];

  constructor() { }

  public registerValidForm(form: AbstractControl, errorHook: Function) {
    let index = this.validForms.findIndex((elem) => {
      return elem.form == form;
    });
    if (index >= 0) {
      this.validForms[index].count += 1;
    } else {
      index = this.validForms.length;
      this.validForms.push({ form: form, count: 1, errorHooks: [] });
    }
    if(errorHook){
      this.validForms[index].errorHooks.push(errorHook);
    }

  }

  public resetNull() {
    this.validForms.forEach((elemForm) => {
      if (elemForm.form instanceof FormControl) {
        elemForm.form.reset(null, { emitEvent: false, onlySelf: true });
        elemForm.form.setErrors(null, { emitEvent: true });
      } else {
        elemForm.form.reset({}, { emitEvent: false, onlySelf: true });
        elemForm.form.setErrors(null, { emitEvent: false });
        this.resetGroup(elemForm.form);
      }
      if (elemForm['sub']) {
        elemForm['sub'].unsubscribe();
      }
      elemForm.form['_reset'] = true;
      const sub = elemForm.form.valueChanges.subscribe(() => {
        elemForm.form['_reset'] = false;
        elemForm['sub'].unsubscribe();
        elemForm['sub'] = null;
      });
      elemForm['sub'] = sub;
    });
  }

  public validAll() {
    let result = true;
    this.validForms.forEach((elemForm) => {
      if (!elemForm.form.valid || elemForm.form['_reset']) {
        //  if (elemForm.form['_reset']) {
        //   elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
        //  }
        //  elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
        if (elemForm.form instanceof FormControl) {
          console.log(elemForm.form.status, elemForm.form);
          if (elemForm.form['_reset']) {
            elemForm.form['_reset'] = false;
            elemForm.form.setValue(elemForm.form.value,
              { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true, emitEvent: false });
          }
          elemForm.form.statusChanges.emit(elemForm.form.status);
        } else {
          this.validFormGroup(elemForm.form);
        }
        if(!elemForm.form.valid){
          elemForm.errorHooks.forEach(errorHook => {
            errorHook(elemForm.form);
          });
        }
      }
      result = elemForm.form.valid && result;
    });
    return result;
  }

  public unregisterValidForm(form, errorHook: Function) {
    const index = this.validForms.findIndex((elem) => {
      return elem.form == form;
    });
    if (index >= 0 && this.validForms[index].count > 1) {
      this.validForms[index].count -= 1;
      if(errorHook){
        const fIndex = this.validForms[index].errorHooks.indexOf(errorHook);
        if(fIndex != -1){
          this.validForms[index].errorHooks.splice(fIndex, 1);
        }
      }
    } else {
      this.validForms.splice(index, 1);
    }
  }

  private validFormGroup(formGroup: FormGroup) {
    const formControls = formGroup.controls;
    for (const name in formControls) {
      if (!formControls.hasOwnProperty(name)) {
        continue;
      }
      if (formControls[name] instanceof FormGroup) {
        this.validFormGroup(<FormGroup>formControls[name]);
      }
      if (!formControls[name].valid || formControls[name]['_reset']) {
        console.log(formControls[name].status, formControls[name]);
        if (formControls[name]['_reset']) {
          formControls[name]['_reset'] = false;
          formControls[name].setValue(formControls[name].value,
            { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true, emitEvent: false });
        }
        (formControls[name].statusChanges as EventEmitter<string>).emit(formControls[name].status);
      }
      if (!formGroup.valid || formGroup['_reset']) {
        if (formGroup['_reset']) {
          formGroup['_reset'] = false;
          formGroup.setValue(formGroup.value,
            { onlySelf: true, emitEvent: false });
        }
        (formGroup.statusChanges as EventEmitter<string>).emit(formControls[name].status);
      }
    }

  }

  private resetGroup(formGroup: FormGroup) {
    const formControls = formGroup.controls;
    for (const name in formControls) {
      if (!formControls.hasOwnProperty(name)) {
        continue;
      }
      if (formControls[name] instanceof FormGroup) {
        formControls[name].setErrors(null, { emitEvent: false });
        this.resetGroup(<FormGroup>formControls[name]);
      } else {
        formControls[name].setErrors(null, { emitEvent: true });
      }
      formControls[name]['_reset'] = true;
    }
  }
}
