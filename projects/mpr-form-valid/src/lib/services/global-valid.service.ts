import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class GlobalValidService {

  private validForms: Array<any> = [];

  constructor() { }

  public registerValidForm(form: AbstractControl) {
    const index = this.validForms.findIndex(elem => {
      return elem.form == form;
    });
    if (index >= 0) {
      this.validForms[index].count += 1;
    } else {
      this.validForms.push({ form: form, count: 1 });
    }
  }

  public validAll() {
    let result = true;
    this.validForms.forEach(elemForm => {
      if (!elemForm.form.valid) {
        //  elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
        if (elemForm.form instanceof FormControl) {
          console.log(elemForm.form.status, elemForm.form);
          elemForm.form.statusChanges.emit(elemForm.form.status);
        } else {
          this.validFormGroup(elemForm.form);
        }
      }
      result = elemForm.form.valid && result;
    });
    return result;
  }

  public unregisterValidForm(form) {
    const index = this.validForms.findIndex(elem => {
      return elem.form == form;
    });
    if (index >= 0 && this.validForms[index].count > 1) {
      this.validForms[index].count -= 1;
    } else {
      this.validForms.splice(index, 1);
    }
  }

  private validFormGroup(formGroup: FormGroup) {
    const formControls = formGroup.controls;
    for (const name in formControls) {
      if (formControls[name] instanceof FormGroup) {
        this.validFormGroup(<FormGroup>formControls[name]);
      } else {
        console.log(formControls[name].status, formControls[name]);
        (formControls[name].statusChanges as EventEmitter<string>).emit(formControls[name].status);
      }
    }
  }

}
