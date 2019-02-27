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
        this.validMsg[msgKey.toLowerCase()] = msgValue;
    }
    /**
     * @param {?} msgPath
     * @param {?} error
     * @return {?}
     */
    getValidMsg(msgPath, error) {
        let /** @type {?} */ minWeight = Number.MAX_VALUE;
        let /** @type {?} */ errorMsg = '';
        let /** @type {?} */ tmpMsg;
        let /** @type {?} */ tmpWeight;
        msgPath = (msgPath || '').toLowerCase();
        if (!error || !msgPath) {
            return { errorMsg, minWeight };
        }
        for (let /** @type {?} */ name in error) {
            name = name.toLowerCase();
            tmpMsg = this.validMsg[msgPath + '.' + name] || globalValidMsgServ.getMsg(name);
            if (!tmpMsg) {
                continue;
            }
            if (Number.isNaN(Number(error[name]))) {
                tmpWeight = 1000;
            }
            else {
                tmpWeight = Number(error[name]);
            }
            if (tmpWeight < minWeight) {
                minWeight = tmpWeight;
                errorMsg = tmpMsg;
            }
        }
        return { errorMsg, minWeight };
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    resetMsg(msg) {
        if (typeof msg !== 'object') {
            throw Error('form valid msg must be a object');
        }
        //this.validMsg = {};
        for (const /** @type {?} */ name in msg) {
            if (typeof msg[name] !== 'object') {
                this.validMsg[name.toLowerCase()] = msg[name];
            }
            else {
                this.formatMsg(msg[name], name.toLowerCase(), this.validMsg);
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
                result[path + '.' + name.toLowerCase()] = msg[name];
            }
            else {
                this.formatMsg(msg[name], path + '.' + name.toLowerCase(), result);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZC1tc2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21wci1mb3JtLXZhbGlkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Zvcm0tdmFsaWQtbXNnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHaEUsTUFBTTtJQUdKO3dCQURtQixFQUFFO0tBQ0o7Ozs7OztJQUVWLFdBQVcsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7UUFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQzs7Ozs7OztJQUcxQyxXQUFXLENBQUMsT0FBZSxFQUFFLEtBQUs7UUFDdkMscUJBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDakMscUJBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixxQkFBSSxNQUFNLENBQUM7UUFDWCxxQkFBSSxTQUFTLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQztTQUM5QjtRQUVELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEYsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUNWLFFBQVEsQ0FBQzthQUNWO1lBQ0QsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDbEI7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDSixTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsRUFBRSxDQUFBLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3hCLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQ3RCLFFBQVEsR0FBRyxNQUFNLENBQUM7YUFDbkI7U0FDRjtRQUNELE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQzs7Ozs7O0lBR3hCLFFBQVEsQ0FBQyxHQUFXO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUNoRDs7UUFHRCxHQUFHLENBQUMsQ0FBQyx1QkFBTSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUQ7U0FDRjs7Ozs7Ozs7SUFHSyxTQUFTLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxNQUFjO1FBQ3pELEdBQUcsQ0FBQyxDQUFDLHVCQUFNLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3BFO1NBQ0Y7Ozs7WUFoRUosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdsb2JhbFZhbGlkTXNnU2VydiB9IGZyb20gJy4vZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1WYWxpZE1zZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHZhbGlkTXNnID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgcHVibGljIHNldFZhbGlkTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIW1zZ1ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRNc2dbbXNnS2V5LnRvTG93ZXJDYXNlKCldID0gbXNnVmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VmFsaWRNc2cobXNnUGF0aDogc3RyaW5nLCBlcnJvcikge1xyXG4gICAgbGV0IG1pbldlaWdodCA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBsZXQgZXJyb3JNc2cgPSAnJztcclxuICAgIGxldCB0bXBNc2c7XHJcbiAgICBsZXQgdG1wV2VpZ2h0O1xyXG4gICAgbXNnUGF0aCA9IChtc2dQYXRoIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFlcnJvciB8fCAhbXNnUGF0aCkge1xyXG4gICAgICByZXR1cm4ge2Vycm9yTXNnLCBtaW5XZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IG5hbWUgaW4gZXJyb3IpIHtcclxuICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdG1wTXNnID0gdGhpcy52YWxpZE1zZ1ttc2dQYXRoICsgJy4nICsgbmFtZV0gfHwgZ2xvYmFsVmFsaWRNc2dTZXJ2LmdldE1zZyhuYW1lKTtcclxuICAgICAgaWYoIXRtcE1zZyl7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYoTnVtYmVyLmlzTmFOKE51bWJlcihlcnJvcltuYW1lXSkpKXtcclxuICAgICAgICB0bXBXZWlnaHQgPSAxMDAwO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0bXBXZWlnaHQgPSBOdW1iZXIoZXJyb3JbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRtcFdlaWdodCA8IG1pbldlaWdodCl7XHJcbiAgICAgICAgbWluV2VpZ2h0ID0gdG1wV2VpZ2h0O1xyXG4gICAgICAgIGVycm9yTXNnID0gdG1wTXNnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2Vycm9yTXNnLCBtaW5XZWlnaHR9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0TXNnKG1zZzogT2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ2Zvcm0gdmFsaWQgbXNnIG11c3QgYmUgYSBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIC8vdGhpcy52YWxpZE1zZyA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZE1zZ1tuYW1lLnRvTG93ZXJDYXNlKCldID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgbmFtZS50b0xvd2VyQ2FzZSgpLCB0aGlzLnZhbGlkTXNnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb3JtYXRNc2cobXNnOiBPYmplY3QsIHBhdGg6IHN0cmluZywgcmVzdWx0OiBPYmplY3QpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtc2cpIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbbmFtZV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmVzdWx0W3BhdGggKyAnLicgKyBuYW1lLnRvTG93ZXJDYXNlKCldID0gbXNnW25hbWVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TXNnKG1zZ1tuYW1lXSwgcGF0aCArICcuJyArIG5hbWUudG9Mb3dlckNhc2UoKSwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=