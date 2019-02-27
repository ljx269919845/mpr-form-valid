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
            name_1 = name_1.toLowerCase();
            tmpMsg = this.validMsg[msgPath + '.' + name_1] || globalValidMsgServ.getMsg(name_1);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC1tc2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBTTlEO3dCQURtQixFQUFFO0tBQ0o7Ozs7OztJQUVWLHlDQUFXOzs7OztjQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O0lBRzFDLHlDQUFXOzs7OztjQUFDLE9BQWUsRUFBRSxLQUFLO1FBQ3ZDLHFCQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2pDLHFCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIscUJBQUksTUFBTSxDQUFDO1FBQ1gscUJBQUksU0FBUyxDQUFDO1FBQ2QsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsRUFBQyxRQUFRLFVBQUEsRUFBRSxTQUFTLFdBQUEsRUFBQyxDQUFDO1NBQzlCO1FBRUQsR0FBRyxDQUFDLENBQUMscUJBQUksTUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBSSxHQUFHLE1BQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLE1BQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFJLENBQUMsQ0FBQztZQUNoRixFQUFFLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQ1YsUUFBUSxDQUFDO2FBQ1Y7WUFDRCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDcEMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNKLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQUksQ0FBQyxDQUFDLENBQUM7YUFDakM7WUFDRCxFQUFFLENBQUEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFDeEIsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDdEIsUUFBUSxHQUFHLE1BQU0sQ0FBQzthQUNuQjtTQUNGO1FBQ0QsTUFBTSxDQUFDLEVBQUMsUUFBUSxVQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUMsQ0FBQzs7Ozs7O0lBR3hCLHNDQUFROzs7O2NBQUMsR0FBVztRQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDaEQ7O1FBR0QsR0FBRyxDQUFDLENBQUMscUJBQU0sTUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBSSxDQUFDLENBQUM7YUFDL0M7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFJLENBQUMsRUFBRSxNQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlEO1NBQ0Y7Ozs7Ozs7O0lBR0ssdUNBQVM7Ozs7OztjQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsTUFBYztRQUN6RCxHQUFHLENBQUMsQ0FBQyxxQkFBTSxNQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBSSxDQUFDLENBQUM7YUFDckQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNwRTtTQUNGOzs7Z0JBaEVKLFVBQVU7Ozs7OEJBSlg7O1NBS2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgc2V0VmFsaWRNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZ1ttc2dLZXkudG9Mb3dlckNhc2UoKV0gPSBtc2dWYWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRWYWxpZE1zZyhtc2dQYXRoOiBzdHJpbmcsIGVycm9yKSB7XHJcbiAgICBsZXQgbWluV2VpZ2h0ID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIGxldCBlcnJvck1zZyA9ICcnO1xyXG4gICAgbGV0IHRtcE1zZztcclxuICAgIGxldCB0bXBXZWlnaHQ7XHJcbiAgICBtc2dQYXRoID0gKG1zZ1BhdGggfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoIWVycm9yIHx8ICFtc2dQYXRoKSB7XHJcbiAgICAgIHJldHVybiB7ZXJyb3JNc2csIG1pbldlaWdodH07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBlcnJvcikge1xyXG4gICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0bXBNc2cgPSB0aGlzLnZhbGlkTXNnW21zZ1BhdGggKyAnLicgKyBuYW1lXSB8fCBnbG9iYWxWYWxpZE1zZ1NlcnYuZ2V0TXNnKG5hbWUpO1xyXG4gICAgICBpZighdG1wTXNnKXtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZihOdW1iZXIuaXNOYU4oTnVtYmVyKGVycm9yW25hbWVdKSkpe1xyXG4gICAgICAgIHRtcFdlaWdodCA9IDEwMDA7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHRtcFdlaWdodCA9IE51bWJlcihlcnJvcltuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYodG1wV2VpZ2h0IDwgbWluV2VpZ2h0KXtcclxuICAgICAgICBtaW5XZWlnaHQgPSB0bXBXZWlnaHQ7XHJcbiAgICAgICAgZXJyb3JNc2cgPSB0bXBNc2c7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7ZXJyb3JNc2csIG1pbldlaWdodH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRNc2cobXNnOiBPYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgbXNnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcignZm9ybSB2YWxpZCBtc2cgbXVzdCBiZSBhIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgLy90aGlzLnZhbGlkTXNnID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnZhbGlkTXNnW25hbWUudG9Mb3dlckNhc2UoKV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBuYW1lLnRvTG93ZXJDYXNlKCksIHRoaXMudmFsaWRNc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvcm1hdE1zZyhtc2c6IE9iamVjdCwgcGF0aDogc3RyaW5nLCByZXN1bHQ6IE9iamVjdCkge1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXN1bHRbcGF0aCArICcuJyArIG5hbWUudG9Mb3dlckNhc2UoKV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBwYXRoICsgJy4nICsgbmFtZS50b0xvd2VyQ2FzZSgpLCByZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==