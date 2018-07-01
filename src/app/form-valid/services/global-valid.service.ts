import { Injectable } from '@angular/core';
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
    this.validForms.forEach(elemForm => {
      // elemForm.markAsDirty({onlySelf: true});
      // if (elemForm instanceof FormGroup) {
      //   this.validFormGroup(elemForm);
      // }
      elemForm.form.patchValue(elemForm.form.value, { emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true });
    });
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

  // private validFormGroup(formGroup: FormGroup) {
  //   formGroup.markAsDirty({onlySelf: true});
  //   const formControls = formGroup.controls;
  //   for (const name in formControls) {
  //     if (formControls[name] instanceof FormGroup) {
  //       this.validFormGroup(<FormGroup>formControls[name]);
  //     } else {
  //       formControls[name].markAsDirty({onlySelf: true});
  //     }
  //   }
  // }

}
