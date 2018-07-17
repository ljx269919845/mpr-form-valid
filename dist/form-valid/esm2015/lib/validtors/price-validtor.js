/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
const /** @type {?} */ PRICE_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PriceValidtor),
    multi: true
};
export class PriceValidtor {
    constructor() {
        globalValidMsgServ.registerMsg('price', '价格为两位小数');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        const /** @type {?} */ price = '' + c.value;
        if (/^\d+(.\d{0,2})?$/.test(price)) {
            return null;
        }
        return { price: true };
    }
}
PriceValidtor.decorators = [
    { type: Directive, args: [{
                selector: '[mprPriceValid]',
                providers: [PRICE_VALIDTOR]
            },] },
];
/** @nocollapse */
PriceValidtor.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2UtdmFsaWR0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkdG9ycy9wcmljZS12YWxpZHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSx1QkFBTSxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBTUYsTUFBTTtJQUVGO1FBQ0ksa0JBQWtCLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztLQUN0RDs7Ozs7SUFFTSxRQUFRLENBQUMsQ0FBa0I7UUFDOUIsdUJBQU0sS0FBSyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDOzs7O1lBZjlCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7YUFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgUFJJQ0VfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHJpY2VWYWxpZHRvciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttcHJQcmljZVZhbGlkXScsXHJcbiAgICBwcm92aWRlcnM6IFtQUklDRV9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByaWNlVmFsaWR0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygncHJpY2UnLCAn5Lu35qC85Li65Lik5L2N5bCP5pWwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IHByaWNlID0gJycgKyBjLnZhbHVlO1xyXG4gICAgICAgIGlmICgvXlxcZCsoLlxcZHswLDJ9KT8kLy50ZXN0KHByaWNlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgcHJpY2U6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG4iXX0=