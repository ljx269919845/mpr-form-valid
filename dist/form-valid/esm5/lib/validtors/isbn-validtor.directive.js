/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { FormGroup, NG_VALIDATORS } from '@angular/forms';
import { globalValidMsgServ } from '../services/global-valid-msg.service';
/**
 * @record
 */
export function ISBN() { }
function ISBN_tsickle_Closure_declarations() {
    /** @type {?} */
    ISBN.prototype.isbn1;
    /** @type {?} */
    ISBN.prototype.isbn2;
    /** @type {?} */
    ISBN.prototype.isbn3;
    /** @type {?} */
    ISBN.prototype.isbn4;
    /** @type {?} */
    ISBN.prototype.isbn5;
}
var /** @type {?} */ ISBN_VALIDTOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return IsbnValidtorDirective; }),
    multi: true
};
var IsbnValidtorDirective = /** @class */ (function () {
    function IsbnValidtorDirective() {
        globalValidMsgServ.registerMsg('isbn', '请输入正确的ISBN号');
    }
    /**
     * @param {?} c
     * @return {?}
     */
    IsbnValidtorDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if (!(c instanceof FormGroup)) {
            throw new Error('isbn must be a group control');
        }
        var /** @type {?} */ isbn = c.value;
        // 不验证非空
        if (!isbn.isbn1 || !isbn.isbn2 || !isbn.isbn3 || !isbn.isbn4 || !isbn.isbn5) {
            return null;
        }
        if (this.validISBNCode([isbn.isbn1, isbn.isbn2, isbn.isbn3, isbn.isbn4, isbn.isbn5].join(''))) {
            return { isbn: true };
        }
        return null;
    };
    /**
     * @param {?} s
     * @return {?}
     */
    IsbnValidtorDirective.prototype.validISBNCode = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        if (s === '9999999999999') {
            return true;
        }
        if (!this.isBarCode(s)) {
            return false;
        }
        var /** @type {?} */ a = 0, /** @type {?} */ b = 0, /** @type {?} */ c = 0, /** @type {?} */ d = 0, /** @type {?} */ e;
        for (var /** @type {?} */ i = 1; i <= 12; i++) {
            var /** @type {?} */ sc = parseInt(s[i - 1], 10);
            if (i <= 12 && i % 2 === 0) {
                a += sc;
            }
            else if (i <= 11 && i % 2 === 1) {
                b += sc;
            }
        }
        c = a * 3;
        d = b + c;
        if (d % 10 === 0) {
            e = d - d;
        }
        else {
            e = d + (10 - d % 10) - d;
        }
        return e === parseInt(s[12], 10);
    };
    /**
     * @param {?} s
     * @return {?}
     */
    IsbnValidtorDirective.prototype.isBarCode = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        if (s.length !== 13) {
            return false;
        }
        var /** @type {?} */ reg = new RegExp(/^[0-9]{12}$/);
        return reg.exec(s.substring(0, 12)) != null;
    };
    IsbnValidtorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mprIsbnValid]',
                    providers: [ISBN_VALIDTOR]
                },] },
    ];
    /** @nocollapse */
    IsbnValidtorDirective.ctorParameters = function () { return []; };
    return IsbnValidtorDirective;
}());
export { IsbnValidtorDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNibi12YWxpZHRvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkdG9ycy9pc2JuLXZhbGlkdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUE4QixTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVTFFLHFCQUFNLGFBQWEsR0FBRztJQUNwQixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0lBUUE7UUFDRSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQ3ZEOzs7OztJQUVNLHdDQUFROzs7O2NBQUMsQ0FBa0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QscUJBQU0sSUFBSSxHQUFTLENBQUMsQ0FBQyxLQUFLLENBQUM7O1FBRTNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUYsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR04sNkNBQWE7Ozs7Y0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO1FBQ0QscUJBQUksQ0FBQyxHQUFHLENBQUMsbUJBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQUUsQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzdCLHFCQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNUO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1Q7U0FDRjtRQUNELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDWDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsTUFBTSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFHM0IseUNBQVM7Ozs7Y0FBQyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxxQkFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7OztnQkF6RC9DLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7aUJBQzNCOzs7O2dDQXJCRDs7U0FzQmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU0JOIHtcbiAgaXNibjE6IHN0cmluZztcbiAgaXNibjI6IHN0cmluZztcbiAgaXNibjM6IHN0cmluZztcbiAgaXNibjQ6IHN0cmluZztcbiAgaXNibjU6IHN0cmluZztcbn1cblxuY29uc3QgSVNCTl9WQUxJRFRPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSXNiblZhbGlkdG9yRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcHJJc2JuVmFsaWRdJyxcbiAgcHJvdmlkZXJzOiBbSVNCTl9WQUxJRFRPUl1cbn0pXG5leHBvcnQgY2xhc3MgSXNiblZhbGlkdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBnbG9iYWxWYWxpZE1zZ1NlcnYucmVnaXN0ZXJNc2coJ2lzYm4nLCAn6K+36L6T5YWl5q2j56Gu55qESVNCTuWPtycpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmICghKGMgaW5zdGFuY2VvZiBGb3JtR3JvdXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzYm4gbXVzdCBiZSBhIGdyb3VwIGNvbnRyb2wnKTtcbiAgICB9XG4gICAgY29uc3QgaXNibjogSVNCTiA9IGMudmFsdWU7XG4gICAgLy8g5LiN6aqM6K+B6Z2e56m6XG4gICAgaWYgKCFpc2JuLmlzYm4xIHx8ICFpc2JuLmlzYm4yIHx8ICFpc2JuLmlzYm4zIHx8ICFpc2JuLmlzYm40IHx8ICFpc2JuLmlzYm41KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWxpZElTQk5Db2RlKFtpc2JuLmlzYm4xLCBpc2JuLmlzYm4yLCBpc2JuLmlzYm4zLCBpc2JuLmlzYm40LCBpc2JuLmlzYm41XS5qb2luKCcnKSkpIHtcbiAgICAgIHJldHVybiB7IGlzYm46IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkSVNCTkNvZGUocykge1xuICAgIGlmIChzID09PSAnOTk5OTk5OTk5OTk5OScpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNCYXJDb2RlKHMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBhID0gMCwgYiA9IDAsIGMgPSAwLCBkID0gMCwgZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XG4gICAgICBjb25zdCBzYyA9IHBhcnNlSW50KHNbaSAtIDFdLCAxMCk7XG4gICAgICBpZiAoaSA8PSAxMiAmJiBpICUgMiA9PT0gMCkge1xuICAgICAgICBhICs9IHNjO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDExICYmIGkgJSAyID09PSAxKSB7XG4gICAgICAgIGIgKz0gc2M7XG4gICAgICB9XG4gICAgfVxuICAgIGMgPSBhICogMztcbiAgICBkID0gYiArIGM7XG4gICAgaWYgKGQgJSAxMCA9PT0gMCkge1xuICAgICAgZSA9IGQgLSBkO1xuICAgIH0gZWxzZSB7XG4gICAgICBlID0gZCArICgxMCAtIGQgJSAxMCkgLSBkO1xuICAgIH1cbiAgICByZXR1cm4gZSA9PT0gcGFyc2VJbnQoc1sxMl0sIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNCYXJDb2RlKHMpOiBib29sZWFuIHtcbiAgICBpZiAocy5sZW5ndGggIT09IDEzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoL15bMC05XXsxMn0kLyk7XG4gICAgcmV0dXJuIHJlZy5leGVjKHMuc3Vic3RyaW5nKDAsIDEyKSkgIT0gbnVsbDtcbiAgfVxufVxuIl19