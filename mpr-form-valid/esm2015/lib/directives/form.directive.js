/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
export class MprFormDirective {
    /**
     * @param {?} elem
     * @param {?} render
     */
    constructor(elem, render) {
        this.elem = elem;
        this.render = render;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        if (this.elem.nativeElement && this.elem.nativeElement.setAttribute) {
            this.render.setAttribute(this.elem.nativeElement, 'formgroup', 'formgroup');
        }
        else if (this.elem.nativeElement && this.elem.nativeElement.parentElement) {
            this.render.setAttribute(this.elem.nativeElement.parentElement, 'formgroup', 'formgroup');
        }
    }
}
MprFormDirective.decorators = [
    { type: Directive, args: [{
                selector: 'form,ngForm,[ngForm]'
            },] },
];
/** @nocollapse */
MprFormDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
function MprFormDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MprFormDirective.prototype.elem;
    /** @type {?} */
    MprFormDirective.prototype.render;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2Zvcm0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLakUsTUFBTTs7Ozs7SUFDSixZQUFvQixJQUFnQixFQUFVLE1BQWlCO1FBQTNDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO0tBQUs7Ozs7SUFFcEUsUUFBUTs7O1FBR04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDN0U7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzNGO0tBQ0Y7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2FBQ2pDOzs7O1lBSm1CLFVBQVU7WUFBRSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZm9ybSxuZ0Zvcm0sW25nRm9ybV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNcHJGb3JtRGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIENhbGxlZCBhZnRlciB0aGUgY29uc3RydWN0b3IsIGluaXRpYWxpemluZyBpbnB1dCBwcm9wZXJ0aWVzLCBhbmQgdGhlIGZpcnN0IGNhbGwgdG8gbmdPbkNoYW5nZXMuXHJcbiAgICAvLyBBZGQgJ2ltcGxlbWVudHMgT25Jbml0JyB0byB0aGUgY2xhc3MuXHJcbiAgICBpZiAodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgJ2Zvcm1ncm91cCcsICdmb3JtZ3JvdXAnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aGlzLnJlbmRlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCwgJ2Zvcm1ncm91cCcsICdmb3JtZ3JvdXAnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19