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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2UtdmFsaWR0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi92YWxpZHRvcnMvcHJpY2UtdmFsaWR0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBOEIsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsdUJBQU0sY0FBYyxHQUFHO0lBQ25CLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQU1GLE1BQU07SUFFRjtRQUNJLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDdEQ7Ozs7O0lBRU0sUUFBUSxDQUFDLENBQWtCO1FBQzlCLHVCQUFNLEtBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OztZQWY5QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IFBSSUNFX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFByaWNlVmFsaWR0b3IpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbXByUHJpY2VWYWxpZF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbUFJJQ0VfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcmljZVZhbGlkdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ3ByaWNlJywgJ+S7t+agvOS4uuS4pOS9jeWwj+aVsCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICBjb25zdCBwcmljZSA9ICcnICsgYy52YWx1ZTtcclxuICAgICAgICBpZiAoL15cXGQrKC5cXGR7MCwyfSk/JC8udGVzdChwcmljZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHByaWNlOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuIl19