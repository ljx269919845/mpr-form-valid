export declare class FormValidMsgService {
    private validMsg;
    constructor();
    setValidMsg(msgKey: string, msgValue: string): void;
    getValidMsg(msgPath: string, error: any): any;
    resetMsg(msg: Object): void;
    private formatMsg(msg, path, result);
}
