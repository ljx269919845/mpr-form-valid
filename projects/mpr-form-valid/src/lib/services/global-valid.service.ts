import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import scrollIntoView from 'dom-scroll-into-view';

function computedStyle(el, prop) {
  const getComputedStyle = window.getComputedStyle;
  const style =
    // If we have getComputedStyle
    getComputedStyle
      ? // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        getComputedStyle(el)
      : // Otherwise, we are in IE and use currentStyle
        el.currentStyle;
  if (style) {
    return style[
      // Switch to camelCase for CSSOM
      // DEV: Grabbed from jQuery
      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
      prop.replace(/-(\w)/gi, (word, letter) => {
        return letter.toUpperCase();
      })
    ];
  }
  return undefined;
}

function getScrollableContainer(n) {
  let node = n;
  let nodeName;
  /* eslint no-cond-assign:0 */
  while (node && (nodeName = node.nodeName.toLowerCase()) !== 'body') {
    const overflowY = computedStyle(node, 'overflowY');
    // https://stackoverflow.com/a/36900407/3040605
    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentNode;
  }
  return nodeName === 'body' ? node.ownerDocument : node;
}

@Injectable()
export class GlobalValidService {
  private validForms: Array<any> = [];
  private needScroll = false;
  private scrollElem: Array<Element> = [];
  private doScrollObserv: Observable<any> = Observable.create((observer) => {
    this.scrollObserver = observer;
  });
  private scrollObserver: Observer<any>;
  private scrollOptions = null;

  constructor() {
    this.doScrollObserv.pipe(debounceTime(500)).subscribe(() => {
      if (!this.needScroll || !this.scrollElem.length) {
        return;
      }
      this.needScroll = false;
      let minScrollTop = Number.MAX_VALUE;
      let scrollElem: Element;
      this.scrollElem.forEach((elem) => {
        const top = elem.getBoundingClientRect().top;
        if (minScrollTop > top) {
          minScrollTop = top;
          scrollElem = elem;
        }
      });
      if (!scrollElem) {
        return;
      }
      const c = getScrollableContainer(scrollElem);
      if (!c) {
        return;
      }
      scrollIntoView(
        scrollElem,
        c,
        Object.assign(
          {},
          {
            onlyScrollIfNeeded: true,
            offsetTop: 200
          },
          this.scrollOptions || {}
        )
      );
    });
  }

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
    if (errorHook) {
      this.validForms[index].errorHooks.push(errorHook);
    }
  }

  public resetNull() {
    this.validForms.forEach((elemForm) => {
      if (elemForm.form instanceof FormControl) {
        elemForm.form.reset(null, { emitEvent: false, onlySelf: true });
        elemForm.form.setErrors(null, { emitEvent: true });
        elemForm.form.markAsPristine();
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

  public scrollTo(elem: Element) {
    if (!this.needScroll) {
      return;
    }
    this.scrollElem.push(elem);
    this.scrollObserver.next(elem);
  }

  public validAll(needScroll = false, scrollOptions = null) {
    this.needScroll = needScroll;
    this.scrollOptions = scrollOptions;
    this.scrollElem = [];
    let result = true;
    this.validForms.forEach((elemForm) => {
      if (elemForm.form.disabled) {
        return;
      }
      if (!elemForm.form.valid || elemForm.form['_reset']) {
        elemForm.form.markAsDirty();
        if (elemForm.form instanceof FormControl) {
          console.log(elemForm.form.status, elemForm.form);
          if (elemForm.form['_reset']) {
            elemForm.form['_reset'] = false;
            elemForm.form.setValue(elemForm.form.value, {
              emitModelToViewChange: false,
              emitViewToModelChange: false,
              onlySelf: true,
              emitEvent: false
            });
          }
          elemForm.form.statusChanges.emit(elemForm.form.status);
        } else {
          this.validFormGroup(elemForm.form);
        }
        if (!elemForm.form.valid) {
          elemForm.errorHooks.forEach((errorHook) => {
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
      if (errorHook) {
        const fIndex = this.validForms[index].errorHooks.indexOf(errorHook);
        if (fIndex != -1) {
          this.validForms[index].errorHooks.splice(fIndex, 1);
        }
      }
    } else {
      this.validForms.splice(index, 1);
    }
  }

  private validFormGroup(formGroup: FormGroup) {
    if (formGroup.disabled) {
      return;
    }
    const formControls = formGroup.controls;
    for (const name in formControls) {
      if (!formControls.hasOwnProperty(name)) {
        continue;
      }
      if (formControls[name].disabled) {
        continue;
      }
      if (formControls[name] instanceof FormGroup) {
        this.validFormGroup(<FormGroup>formControls[name]);
      }
      if (!formControls[name].valid || formControls[name]['_reset']) {
        formControls[name].markAsDirty();
        console.log(formControls[name].status, formControls[name]);
        if (formControls[name]['_reset']) {
          formControls[name]['_reset'] = false;
          formControls[name].setValue(formControls[name].value, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
            emitEvent: false
          });
        }
        (formControls[name].statusChanges as EventEmitter<string>).emit(formControls[name].status);
      }
      if (!formGroup.valid || formGroup['_reset']) {
        formGroup.markAsDirty();
        if (formGroup['_reset']) {
          formGroup['_reset'] = false;
          formGroup.setValue(formGroup.value, { onlySelf: true, emitEvent: false });
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
      formControls[name].markAsPristine();
    }
  }
}
