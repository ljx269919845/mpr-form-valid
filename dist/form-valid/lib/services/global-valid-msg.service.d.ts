/**
 * 全局验证消息， 存储默认消息
 */
export declare class GlobalValidMsgService {
    private validMsg;
    constructor();
    /**
     * 设置错误key的默认消息
     * @param msgKey 错误key
     * @param msgValue 错误消息
     */
    registerMsg(msgKey: string, msgValue: string): void;
    getMsg(msgKey: string): String;
}
export declare const globalValidMsgServ: GlobalValidMsgService;
