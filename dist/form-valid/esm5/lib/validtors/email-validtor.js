/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
var /** @type {?} */ EMAIL_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return EmailValidtor; }),
    multi: true
};
var EmailValidtor = /** @class */ (function () {
    function EmailValidtor() {
        globalValidMsgServ.registerMsg('emailError', '请输入合法的邮箱');
    }
    /**
     * @param {?} contorl
     * @return {?}
     */
    EmailValidtor.prototype.validate = /**
     * @param {?} contorl
     * @return {?}
     */
    function (contorl) {
        var /** @type {?} */ email = contorl.value;
        if (!email) {
            // 允许为空
            return null;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email)) {
            return { emailError: true };
        }
        return null;
    };
    EmailValidtor.decorators = [
        { type: Directive, args: [{
                    selector: '[mprEmailValid]',
                    providers: [EMAIL_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    EmailValidtor.ctorParameters = function () { return []; };
    return EmailValidtor;
}());
export { EmailValidtor };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtdmFsaWR0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkdG9ycy9lbWFpbC12YWxpZHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxxQkFBTSxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBUUU7UUFDSSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzVEOzs7OztJQUVELGdDQUFROzs7O0lBQVIsVUFBUyxPQUF3QjtRQUM3QixxQkFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1lBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxxREFBcUQsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Z0JBbkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzlCOzs7O3dCQWREOztTQWVhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgRU1BSUxfVkFMSURUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRW1haWxWYWxpZHRvciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttcHJFbWFpbFZhbGlkXScsXHJcbiAgICBwcm92aWRlcnM6IFtFTUFJTF9WQUxJRFRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWR0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGdsb2JhbFZhbGlkTXNnU2Vydi5yZWdpc3Rlck1zZygnZW1haWxFcnJvcicsICfor7fovpPlhaXlkIjms5XnmoTpgq7nrrEnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZShjb250b3JsOiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICBjb25zdCBlbWFpbCA9IGNvbnRvcmwudmFsdWU7XHJcbiAgICAgICAgaWYgKCFlbWFpbCkgeyAvLyDlhYHorrjkuLrnqbpcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghL15bYS16QS1aMC05Xy1dK0BbYS16QS1aMC05Xy1dKyhcXC5bYS16QS1aMC05Xy1dKykrJC9nLnRlc3QoZW1haWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGVtYWlsRXJyb3I6IHRydWUgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19