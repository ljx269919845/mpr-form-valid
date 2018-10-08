/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
var MprFormGroupDirective = /** @class */ (function () {
    function MprFormGroupDirective(elem, render) {
        this.elem = elem;
        this.render = render;
    }
    /**
     * @return {?}
     */
    MprFormGroupDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        if (this.elem.nativeElement && this.elem.nativeElement.setAttribute) {
            this.render.setAttribute(this.elem.nativeElement, 'formgroup', 'formgroup');
        }
        else if (this.elem.nativeElement && this.elem.nativeElement.parentElement) {
            this.render.setAttribute(this.elem.nativeElement.parentElement, 'formgroup', 'formgroup');
        }
    };
    MprFormGroupDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[formGroup]'
                },] },
    ];
    /** @nocollapse */
    MprFormGroupDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MprFormGroupDirective;
}());
export { MprFormGroupDirective };
function MprFormGroupDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MprFormGroupDirective.prototype.elem;
    /** @type {?} */
    MprFormGroupDirective.prototype.render;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ncm91cC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2Zvcm0tZ3JvdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBTS9ELCtCQUFvQixJQUFnQixFQUFVLE1BQWlCO1FBQTNDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO0tBQUs7Ozs7SUFFcEUsd0NBQVE7OztJQUFSOzs7UUFHRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM3RTtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDM0Y7S0FDRjs7Z0JBZEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjs7OztnQkFKbUIsVUFBVTtnQkFBRSxTQUFTOztnQ0FBekM7O1NBS2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2Zvcm1Hcm91cF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNcHJGb3JtR3JvdXBEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gQ2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvciwgaW5pdGlhbGl6aW5nIGlucHV0IHByb3BlcnRpZXMsIGFuZCB0aGUgZmlyc3QgY2FsbCB0byBuZ09uQ2hhbmdlcy5cclxuICAgIC8vIEFkZCAnaW1wbGVtZW50cyBPbkluaXQnIHRvIHRoZSBjbGFzcy5cclxuICAgIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUpIHtcclxuICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LCAnZm9ybWdyb3VwJywgJ2Zvcm1ncm91cCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=