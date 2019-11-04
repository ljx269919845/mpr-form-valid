/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { globalValidMsgServ } from './global-valid-msg.service';
var FormValidMsgService = /** @class */ (function () {
    function FormValidMsgService() {
        this.validMsg = {};
    }
    /**
     * @param {?} msgKey
     * @param {?} msgValue
     * @return {?}
     */
    FormValidMsgService.prototype.setValidMsg = /**
     * @param {?} msgKey
     * @param {?} msgValue
     * @return {?}
     */
    function (msgKey, msgValue) {
        if (!msgValue) {
            return;
        }
        this.validMsg[msgKey.toLowerCase()] = msgValue;
    };
    /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    FormValidMsgService.prototype.getValidMsg = /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    function (msgPath, error) {
        var /** @type {?} */ minWeight = Number.MAX_VALUE;
        var /** @type {?} */ errorMsg = '';
        var /** @type {?} */ tmpMsg;
        var /** @type {?} */ tmpWeight;
        msgPath = (msgPath || '').toLowerCase();
        if (!error || !msgPath) {
            return { errorMsg: errorMsg, minWeight: minWeight };
        }
        for (var /** @type {?} */ name_1 in error) {
            if (!error.hasOwnProperty(name_1)) {
                continue;
            }
            var /** @type {?} */ orgName = name_1;
            name_1 = name_1.toLowerCase();
            tmpMsg = this.formartMsg(this.validMsg[msgPath + '.' + name_1] || globalValidMsgServ.getMsg(name_1), error[orgName]);
            if (!tmpMsg) {
                continue;
            }
            if (Number.isNaN(Number(error[name_1]))) {
                tmpWeight = 1000;
            }
            else {
                tmpWeight = Number(error[name_1]);
            }
            if (tmpWeight < minWeight) {
                minWeight = tmpWeight;
                errorMsg = tmpMsg;
            }
        }
        return { errorMsg: errorMsg, minWeight: minWeight };
    };
    /**
     * @param {?} msg
     * @param {?} value
     * @return {?}
     */
    FormValidMsgService.prototype.formartMsg = /**
     * @param {?} msg
     * @param {?} value
     * @return {?}
     */
    function (msg, value) {
        if (typeof value !== 'object' || !value) {
            return msg;
        }
        return msg.replace(/\{(.+)\}/g, function (match, p1) {
            return value[p1] || '';
        });
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    FormValidMsgService.prototype.resetMsg = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        if (typeof msg !== 'object') {
            throw Error('form valid msg must be a object');
        }
        //this.validMsg = {};
        for (var /** @type {?} */ name_2 in msg) {
            if (typeof msg[name_2] !== 'object') {
                this.validMsg[name_2.toLowerCase()] = msg[name_2];
            }
            else {
                this.formatMsg(msg[name_2], name_2.toLowerCase(), this.validMsg);
            }
        }
    };
    /**
     * @param {?} msg
     * @param {?} path
     * @param {?} result
     * @return {?}
     */
    FormValidMsgService.prototype.formatMsg = /**
     * @param {?} msg
     * @param {?} path
     * @param {?} result
     * @return {?}
     */
    function (msg, path, result) {
        for (var /** @type {?} */ name_3 in msg) {
            if (typeof msg[name_3] !== 'object') {
                result[path + '.' + name_3.toLowerCase()] = msg[name_3];
            }
            else {
                this.formatMsg(msg[name_3], path + '.' + name_3.toLowerCase(), result);
            }
        }
    };
    FormValidMsgService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormValidMsgService.ctorParameters = function () { return []; };
    return FormValidMsgService;
}());
export { FormValidMsgService };
function FormValidMsgService_tsickle_Closure_declarations() {
    /** @type {?} */
    FormValidMsgService.prototype.validMsg;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC1tc2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBSzlEO3dCQURtQixFQUFFO0tBQ0w7Ozs7OztJQUVULHlDQUFXOzs7OztjQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O0lBRzFDLHlDQUFXOzs7OztjQUFDLE9BQWUsRUFBRSxLQUFLO1FBQ3ZDLHFCQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2pDLHFCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIscUJBQUksTUFBTSxDQUFDO1FBQ1gscUJBQUksU0FBUyxDQUFDO1FBQ2QsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDO1NBQ2hDO1FBRUQsR0FBRyxDQUFDLENBQUMscUJBQUksTUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQUksQ0FBQyxD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LE1BQUksQ0FBQyxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3BFO1NBQ0Y7OztnQkE1RUosVUFBVTs7Ozs4QkFKWDs7U0FLYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxWYWxpZE1zZ1NlcnYgfSBmcm9tICcuL2dsb2JhbC12YWxpZC1tc2cuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRNc2dTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgc2V0VmFsaWRNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZ1ttc2dLZXkudG9Mb3dlckNhc2UoKV0gPSBtc2dWYWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWYWxpZE1zZyhtc2dQYXRoOiBzdHJpbmcsIGVycm9yKSB7XHJcbiAgICBsZXQgbWluV2VpZ2h0ID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIGxldCBlcnJvck1zZyA9ICcnO1xyXG4gICAgbGV0IHRtcE1zZztcclxuICAgIGxldCB0bXBXZWlnaHQ7XHJcbiAgICBtc2dQYXRoID0gKG1zZ1BhdGggfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoIWVycm9yIHx8ICFtc2dQYXRoKSB7XHJcbiAgICAgIHJldHVybiB7IGVycm9yTXNnLCBtaW5XZWlnaHQgfTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBuYW1lIGluIGVycm9yKSB7XHJcbiAgICAgIGlmICghZXJyb3IuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvcmdOYW1lID0gbmFtZTtcclxuICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdG1wTXNnID0gdGhpcy5mb3JtYXJ0TXNnKHRoaXMudmFsaWRNc2dbbXNnUGF0aCArICcuJyArIG5hbWVdIHx8IGdsb2JhbFZhbGlkTXNnU2Vydi5nZXRNc2cobmFtZSksIGVycm9yW29yZ05hbWVdKTtcclxuICAgICAgaWYgKCF0bXBNc2cpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoTnVtYmVyLmlzTmFOKE51bWJlcihlcnJvcltuYW1lXSkpKSB7XHJcbiAgICAgICAgdG1wV2VpZ2h0ID0gMTAwMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0bXBXZWlnaHQgPSBOdW1iZXIoZXJyb3JbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0bXBXZWlnaHQgPCBtaW5XZWlnaHQpIHtcclxuICAgICAgICBtaW5XZWlnaHQgPSB0bXBXZWlnaHQ7XHJcbiAgICAgICAgZXJyb3JNc2cgPSB0bXBNc2c7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7IGVycm9yTXNnLCBtaW5XZWlnaHQgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmb3JtYXJ0TXNnKG1zZzogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyB8fCAhdmFsdWUpIHtcclxuICAgICAgcmV0dXJuIG1zZztcclxuICAgIH1cclxuICAgIHJldHVybiBtc2cucmVwbGFjZSgvXFx7KC4rKVxcfS9nLCBmdW5jdGlvbihtYXRjaCwgcDEpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlW3AxXSB8fCAnJztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0TXNnKG1zZzogT2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ2Zvcm0gdmFsaWQgbXNnIG11c3QgYmUgYSBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIC8vdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lLnRvTG93ZXJDYXNlKCldID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZS50b0xvd2VyQ2FzZSgpLCB0aGlzLnZhbGlkTXNnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRNc2cobXNnOiBPYmplY3QsIHBhdGg6IHN0cmluZywgcmVzdWx0OiBPYmplY3QpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmVzdWx0W3BhdGggKyAnLicgKyBuYW1lLnRvTG93ZXJDYXNlKCldID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUudG9Mb3dlckNhc2UoKSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=