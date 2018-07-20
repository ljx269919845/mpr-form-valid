/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
var /** @type {?} */ FLOAT_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return FloatOnlyValidtorDirective; }),
    multi: true
};
var FloatOnlyValidtorDirective = /** @class */ (function () {
    function FloatOnlyValidtorDirective() {
        globalValidMsgServ.registerMsg('float', '请输入浮点数');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    FloatOnlyValidtorDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        var /** @type {?} */ floatVal = parseFloat('' + c.value);
        if (isNaN(floatVal)) {
            return { float: true };
        }
        return null;
    };
    FloatOnlyValidtorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprFloatOnlyValidtor]',
                    providers: [FLOAT_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    FloatOnlyValidtorDirective.ctorParameters = function () { return []; };
    return FloatOnlyValidtorDirective;
}());
export { FloatOnlyValidtorDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tcHItZm9ybS12YWxpZC8iLCJzb3VyY2VzIjpbImxpYi92YWxpZHRvcnMvZmxvYXQtb25seS12YWxpZHRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBOEIsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUscUJBQU0sY0FBYyxHQUFHO0lBQ3JCLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLDBCQUEwQixFQUExQixDQUEwQixDQUFDO0lBQ3pELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUFRQTtRQUNFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRU0sNkNBQVE7Ozs7Y0FBQyxDQUFrQjtRQUNoQyxxQkFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDeEI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Z0JBZmYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztpQkFDNUI7Ozs7cUNBZEQ7O1NBZWEsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuY29uc3QgRkxPQVRfVkFMSURUT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZsb2F0T25seVZhbGlkdG9yRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJGbG9hdE9ubHlWYWxpZHRvcl0nLFxuICBwcm92aWRlcnM6IFtGTE9BVF9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRPbmx5VmFsaWR0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnZmxvYXQnLCAn6K+36L6T5YWl5rWu54K55pWwJyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgY29uc3QgZmxvYXRWYWwgPSBwYXJzZUZsb2F0KCcnICsgYy52YWx1ZSk7XG4gICAgaWYgKGlzTmFOKGZsb2F0VmFsKSkge1xuICAgICAgcmV0dXJuIHsgZmxvYXQ6IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==