/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
const /** @type {?} */ EMAIL_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailValidtor),
    multi: true
};
export class EmailValidtor {
    constructor() {
        globalValidMsgServ.registerMsg('emailError', '请输入合法的邮箱');
    }
    /**
     * @param {?} contorl
     * @return {?}
     */
    validate(contorl) {
        const /** @type {?} */ email = contorl.value;
        if (!email) {
            // 允许为空
            return null;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email)) {
            return { emailError: true };
        }
        return null;
    }
}
EmailValidtor.decorators = [
    { type: Directive, args: [{
                selector: '[mprEmailValid]',
                providers: [EMAIL_VALIDTOR]
            },] },
];
/** @nocollapse */
EmailValidtor.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtdmFsaWR0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkdG9ycy9lbWFpbC12YWxpZHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSx1QkFBTSxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBTUYsTUFBTTtJQUVGO1FBQ0ksa0JBQWtCLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM1RDs7Ozs7SUFFRCxRQUFRLENBQUMsT0FBd0I7UUFDN0IsdUJBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMscURBQXFELENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDL0I7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7OztZQW5CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEVNQUlMX1ZBTElEVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEVtYWlsVmFsaWR0b3IpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbXByRW1haWxWYWxpZF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbRU1BSUxfVkFMSURUT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2VtYWlsRXJyb3InLCAn6K+36L6T5YWl5ZCI5rOV55qE6YKu566xJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGUoY29udG9ybDogQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWwgPSBjb250b3JsLnZhbHVlO1xyXG4gICAgICAgIGlmICghZW1haWwpIHsgLy8g5YWB6K645Li656m6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9eW2EtekEtWjAtOV8tXStAW2EtekEtWjAtOV8tXSsoXFwuW2EtekEtWjAtOV8tXSspKyQvZy50ZXN0KGVtYWlsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBlbWFpbEVycm9yOiB0cnVlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==