/**
 * 全局验证消息， 存储默认消息
 */
export class GlobalValidMsgService {
	private validMsg = new Map<String, String>();
	constructor() {}

	/**
   * 设置错误key的默认消息
   * @param msgKey 错误key
   * @param msgValue 错误消息
   */
	public registerMsg(msgKey: string, msgValue: string) {
		if (!msgKey || !msgValue) {
			throw new Error('msg key and value must not empty');
		}
		this.validMsg.set(msgKey.toLowerCase(), msgValue);
	}

	public getMsg(msgKey: string) {
		if (!msgKey) {
			return null;
		}
		return this.validMsg.get(msgKey.toLowerCase());
	}
}

export const globalValidMsgServ = new GlobalValidMsgService();
