/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 全局验证消息， 存储默认消息
 */
var /**
 * 全局验证消息， 存储默认消息
 */
GlobalValidMsgService = /** @class */ (function () {
    function GlobalValidMsgService() {
        this.validMsg = new Map();
    }
    /**
     * 设置错误key的默认消息
     * @param {?} msgKey 错误key
     * @param {?} msgValue 错误消息
     * @return {?}
     */
    GlobalValidMsgService.prototype.registerMsg = /**
     * 设置错误key的默认消息
     * @param {?} msgKey 错误key
     * @param {?} msgValue 错误消息
     * @return {?}
     */
    function (msgKey, msgValue) {
        if (!msgKey || !msgValue) {
            throw new Error('msg key and value must not empty');
        }
        this.validMsg.set(msgKey.toLowerCase(), msgValue);
    };
    /**
     * @param {?} msgKey
     * @return {?}
     */
    GlobalValidMsgService.prototype.getMsg = /**
     * @param {?} msgKey
     * @return {?}
     */
    function (msgKey) {
        if (!msgKey) {
            return null;
        }
        return this.validMsg.get(msgKey.toLowerCase());
    };
    return GlobalValidMsgService;
}());
/**
 * 全局验证消息， 存储默认消息
 */
export { GlobalValidMsgService };
function GlobalValidMsgService_tsickle_Closure_declarations() {
    /** @type {?} */
    GlobalValidMsgService.prototype.validMsg;
}
export var /** @type {?} */ globalValidMsgServ = new GlobalValidMsgService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbXByLWZvcm0tdmFsaWQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZ2xvYmFsLXZhbGlkLW1zZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7O0FBQUE7SUFFQzt3QkFEbUIsSUFBSSxHQUFHLEVBQWtCO0tBQzVCOzs7Ozs7O0lBT1QsMkNBQVc7Ozs7OztjQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7SUFHNUMsc0NBQU07Ozs7Y0FBQyxNQUFjO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7Z0NBdkJqRDtJQXlCQyxDQUFBOzs7O0FBdEJELGlDQXNCQzs7Ozs7QUFFRCxNQUFNLENBQUMscUJBQU0sa0JBQWtCLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWFqOWxgOmqjOivgea2iOaBr++8jCDlrZjlgqjpu5jorqTmtojmga9cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxWYWxpZE1zZ1NlcnZpY2Uge1xyXG5cdHByaXZhdGUgdmFsaWRNc2cgPSBuZXcgTWFwPFN0cmluZywgU3RyaW5nPigpO1xyXG5cdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0LyoqXHJcbiAgICog6K6+572u6ZSZ6K+va2V555qE6buY6K6k5raI5oGvXHJcbiAgICogQHBhcmFtIG1zZ0tleSDplJnor69rZXlcclxuICAgKiBAcGFyYW0gbXNnVmFsdWUg6ZSZ6K+v5raI5oGvXHJcbiAgICovXHJcblx0cHVibGljIHJlZ2lzdGVyTXNnKG1zZ0tleTogc3RyaW5nLCBtc2dWYWx1ZTogc3RyaW5nKSB7XHJcblx0XHRpZiAoIW1zZ0tleSB8fCAhbXNnVmFsdWUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtc2cga2V5IGFuZCB2YWx1ZSBtdXN0IG5vdCBlbXB0eScpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy52YWxpZE1zZy5zZXQobXNnS2V5LnRvTG93ZXJDYXNlKCksIG1zZ1ZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRNc2cobXNnS2V5OiBzdHJpbmcpIHtcclxuXHRcdGlmICghbXNnS2V5KSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMudmFsaWRNc2cuZ2V0KG1zZ0tleS50b0xvd2VyQ2FzZSgpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxWYWxpZE1zZ1NlcnYgPSBuZXcgR2xvYmFsVmFsaWRNc2dTZXJ2aWNlKCk7XHJcbiJdfQ==