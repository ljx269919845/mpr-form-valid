/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { globalValidMsgServ } from './global-valid-msg.service';
export class FormValidMsgService {
    constructor() {
        this.validMsg = {};
    }
    /**
     * @param {?} msgKey
     * @param {?} msgValue
     * @return {?}
     */
    setValidMsg(msgKey, msgValue) {
        if (!msgValue) {
            return;
        }
        this.validMsg[msgKey] = msgValue;
    }
    /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    getValidMsg(msgPath, error) {
        if (!error || !msgPath) {
            return '';
        }
        for (const /** @type {?} */ name in error) {
            if (error[name]) {
                return this.validMsg[msgPath + '.' + name] || globalValidMsgServ.getMsg(name);
            }
        }
        return '';
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    resetMsg(msg) {
        if (typeof msg !== 'object') {
            throw Error('form valid msg must be a object');
        }
        this.validMsg = {};
        for (const /** @type {?} */ name in msg) {
            if (typeof msg[name] !== 'object') {
                this.validMsg[name] = msg[name];
            }
            else {
                this.formatMsg(msg[name], name, this.validMsg);
            }
        }
    }
    /**
     * @param {?} msg
     * @param {?} path
     * @param {?} result
     * @return {?}
     */
    formatMsg(msg, path, result) {
        for (const /** @type {?} */ name in msg) {
            if (typeof msg[name] !== 'object') {
                result[path + '.' + name] = msg[name];
            }
            else {
                this.formatMsg(msg[name], path + '.' + name, result);
            }
        }
    }
}
FormValidMsgService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormValidMsgService.ctorParameters = () => [];
function FormValidMsgService_tsickle_Closure_declarations() {
    /** @type {?} */
    FormValidMsgService.prototype.validMsg;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC1tc2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zvcm0tdmFsaWQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZm9ybS12YWxpZC1tc2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUdoRSxNQUFNO0lBR0o7d0JBRG1CLEVBQUU7S0FDSjs7Ozs7O0lBRVYsV0FBVyxDQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O0lBRzVCLFdBQVcsQ0FBQyxPQUFlLEVBQUUsS0FBSztRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNYO1FBQ0QsR0FBRyxDQUFDLENBQUMsdUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0U7U0FDRjtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUM7Ozs7OztJQUdMLFFBQVEsQ0FBQyxHQUFXO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNoRDtTQUNGOzs7Ozs7OztJQUdLLFNBQVMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLE1BQWM7UUFDekQsR0FBRyxDQUFDLENBQUMsdUJBQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdEQ7U0FDRjs7OztZQS9DSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2xvYmFsVmFsaWRNc2dTZXJ2IH0gZnJvbSAnLi9nbG9iYWwtdmFsaWQtbXNnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVZhbGlkTXNnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgdmFsaWRNc2cgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBwdWJsaWMgc2V0VmFsaWRNc2cobXNnS2V5OiBzdHJpbmcsIG1zZ1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghbXNnVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWxpZE1zZ1ttc2dLZXldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yW25hbWVdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRNc2dbbXNnUGF0aCArICcuJyArIG5hbWVdIHx8IGdsb2JhbFZhbGlkTXNnU2Vydi5nZXRNc2cobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE1zZyhtc2c6IE9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBtc2cgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdmb3JtIHZhbGlkIG1zZyBtdXN0IGJlIGEgb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbGlkTXNnID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIG1zZykge1xyXG4gICAgICBpZiAodHlwZW9mIG1zZ1tuYW1lXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnZhbGlkTXNnW25hbWVdID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZSwgdGhpcy52YWxpZE1zZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ybWF0TXNnKG1zZzogT2JqZWN0LCBwYXRoOiBzdHJpbmcsIHJlc3VsdDogT2JqZWN0KSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gbXNnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbXNnW25hbWVdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJlc3VsdFtwYXRoICsgJy4nICsgbmFtZV0gPSBtc2dbbmFtZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRNc2cobXNnW25hbWVdLCBwYXRoICsgJy4nICsgbmFtZSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=