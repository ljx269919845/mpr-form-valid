/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
var /** @type {?} */ ISBN_HEADER_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return IsbnHeaderValidDirective; }),
    multi: true
};
var IsbnHeaderValidDirective = /** @class */ (function () {
    function IsbnHeaderValidDirective() {
        globalValidMsgServ.registerMsg('isbnHeader', '第一组必须为978或979');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    IsbnHeaderValidDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if (!c.value) {
            return null;
        }
        if (['999', '978', '979', '000'].indexOf(c.value) < 0) {
            return { isbnHeader: true };
        }
        return null;
    };
    IsbnHeaderValidDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprIsbnHeaderValid]',
                    providers: [ISBN_HEADER_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    IsbnHeaderValidDirective.ctorParameters = function () { return []; };
    return IsbnHeaderValidDirective;
}());
export { IsbnHeaderValidDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXByLWZvcm0tdmFsaWQvIiwic291cmNlcyI6WyJsaWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxxQkFBTSxvQkFBb0IsR0FBRztJQUN6QixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBUUE7UUFDRSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQy9EOzs7OztJQUVELDJDQUFROzs7O0lBQVIsVUFBUyxDQUFrQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO1NBQzVCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNsQzs7OzttQ0FkRDs7U0FlYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9IRUFERVJfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX0hFQURFUl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ+esrOS4gOe7hOW/hemhu+S4ujk3OOaIljk3OScpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIWMudmFsdWUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoWyc5OTknLCAnOTc4JywgJzk3OScsICcwMDAnXS5pbmRleE9mKGMudmFsdWUpIDwgMCkge1xyXG4gICAgICByZXR1cm4geyBpc2JuSGVhZGVyOiB0cnVlfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIl19