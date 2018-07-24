/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
const /** @type {?} */ ISBN_HEADER_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IsbnHeaderValidDirective),
    multi: true
};
export class IsbnHeaderValidDirective {
    constructor() {
        globalValidMsgServ.registerMsg('isbnHeader', '第一组必须为978或979');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        if (!c.value) {
            return null;
        }
        if (['999', '978', '979', '000'].indexOf(c.value) < 0) {
            return { isbnHeader: true };
        }
        return null;
    }
}
IsbnHeaderValidDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mprIsbnHeaderValid]',
                providers: [ISBN_HEADER_VALIDTOR]
            },] },
];
/** @nocollapse */
IsbnHeaderValidDirective.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNibi1oZWFkZXItdmFsaWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXByLWZvcm0tdmFsaWQvIiwic291cmNlcyI6WyJsaWIvdmFsaWR0b3JzL2lzYm4taGVhZGVyLXZhbGlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSx1QkFBTSxvQkFBb0IsR0FBRztJQUN6QixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUF3QixDQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQU1GLE1BQU07SUFFSjtRQUNFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7S0FDL0Q7Ozs7O0lBRUQsUUFBUSxDQUFDLENBQWtCO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7U0FDNUI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2I7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgSVNCTl9IRUFERVJfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNibkhlYWRlclZhbGlkRGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttcHJJc2JuSGVhZGVyVmFsaWRdJyxcclxuICBwcm92aWRlcnM6IFtJU0JOX0hFQURFUl9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzYm5IZWFkZXJWYWxpZERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZ2xvYmFsVmFsaWRNc2dTZXJ2LnJlZ2lzdGVyTXNnKCdpc2JuSGVhZGVyJywgJ+esrOS4gOe7hOW/hemhu+S4ujk3OOaIljk3OScpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICBpZiAoIWMudmFsdWUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoWyc5OTknLCAnOTc4JywgJzk3OScsICcwMDAnXS5pbmRleE9mKGMudmFsdWUpIDwgMCkge1xyXG4gICAgICByZXR1cm4geyBpc2JuSGVhZGVyOiB0cnVlfTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIl19