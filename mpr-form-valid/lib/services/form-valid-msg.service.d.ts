export declare class FormValidMsgService {
    private validMsg;
    constructor();
    setValidMsg(msgKey: string, msgValue: string): void;
    getValidMsg(msgPath: string, error: any): {
        errorMsg: string;
        minWeight: number;
    };
    resetMsg(msg: Object): void;
    private formatMsg(msg, path, result);
}
