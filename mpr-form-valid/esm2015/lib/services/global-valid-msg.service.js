/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 全局验证消息， 存储默认消息
 */
export class GlobalValidMsgService {
    constructor() {
        this.validMsg = new Map();
    }
    /**
     * 设置错误key的默认消息
     * @param {?} msgKey 错误key
     * @param {?} msgValue 错误消息
     * @return {?}
     */
    registerMsg(msgKey, msgValue) {
        if (!msgKey || !msgValue) {
            throw new Error('msg key and value must not empty');
        }
        this.validMsg.set(msgKey.toLowerCase(), msgValue);
    }
    /**
     * @param {?} msgKey
     * @return {?}
     */
    getMsg(msgKey) {
        if (!msgKey) {
            return null;
        }
        return this.validMsg.get(msgKey.toLowerCase());
    }
}
function GlobalValidMsgService_tsickle_Closure_declarations() {
    /** @type {?} */
    GlobalValidMsgService.prototype.validMsg;
}
export const /** @type {?} */ globalValidMsgServ = new GlobalValidMsgService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXByLWZvcm0tdmFsaWQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxNQUFNO0lBRUw7d0JBRG1CLElBQUksR0FBRyxFQUFrQjtLQUM1Qjs7Ozs7OztJQU9ULFdBQVcsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7UUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBRzVDLE1BQU0sQ0FBQyxNQUFjO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7Q0FFaEQ7Ozs7O0FBRUQsTUFBTSxDQUFDLHVCQUFNLGtCQUFrQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlhajlsYDpqozor4Hmtojmga/vvIwg5a2Y5YKo6buY6K6k5raI5oGvXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHZhbGlkTXNnID0gbmV3IE1hcDxTdHJpbmcsIFN0cmluZz4oKTtcclxuXHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdC8qKlxyXG4gICAqIOiuvue9rumUmeivr2tleeeahOm7mOiupOa2iOaBr1xyXG4gICAqIEBwYXJhbSBtc2dLZXkg6ZSZ6K+va2V5XHJcbiAgICogQHBhcmFtIG1zZ1ZhbHVlIOmUmeivr+a2iOaBr1xyXG4gICAqL1xyXG5cdHB1YmxpYyByZWdpc3Rlck1zZyhtc2dLZXk6IHN0cmluZywgbXNnVmFsdWU6IHN0cmluZykge1xyXG5cdFx0aWYgKCFtc2dLZXkgfHwgIW1zZ1ZhbHVlKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignbXNnIGtleSBhbmQgdmFsdWUgbXVzdCBub3QgZW1wdHknKTtcclxuXHRcdH1cclxuXHRcdHRoaXMudmFsaWRNc2cuc2V0KG1zZ0tleS50b0xvd2VyQ2FzZSgpLCBtc2dWYWx1ZSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0TXNnKG1zZ0tleTogc3RyaW5nKSB7XHJcblx0XHRpZiAoIW1zZ0tleSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnZhbGlkTXNnLmdldChtc2dLZXkudG9Mb3dlckNhc2UoKSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2xvYmFsVmFsaWRNc2dTZXJ2ID0gbmV3IEdsb2JhbFZhbGlkTXNnU2VydmljZSgpO1xyXG4iXX0=