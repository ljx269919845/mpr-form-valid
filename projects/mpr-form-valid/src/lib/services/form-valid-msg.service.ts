import { Injectable } from '@angular/core';

import { globalValidMsgServ } from './global-valid-msg.service';

@Injectable()
export class FormValidMsgService {

  private validMsg = {};
  constructor() { }

  public setValidMsg(msgKey: string, msgValue: string) {
    if (!msgValue) {
      return;
    }
    this.validMsg[msgKey.toLowerCase()] = msgValue;
  }

  public getValidMsg(msgPath: string, error) {
    let minWeight = Number.MAX_VALUE;
    let errorMsg = '';
    let tmpMsg;
    let tmpWeight;
    msgPath = (msgPath || '').toLowerCase();
    if (!error || !msgPath) {
      return {errorMsg, minWeight};
    }

    for (let name in error) {
      name = name.toLowerCase();
      tmpMsg = this.validMsg[msgPath + '.' + name] || globalValidMsgServ.getMsg(name);
      if(!tmpMsg){
        continue;
      }
      if(Number.isNaN(Number(error[name]))){
        tmpWeight = 1000;
      }else{
        tmpWeight = Number(error[name]);
      }
      if(tmpWeight < minWeight){
        minWeight = tmpWeight;
        errorMsg = tmpMsg;
      }
    }
    return {errorMsg, minWeight};
  }

  public resetMsg(msg: Object) {
    if (typeof msg !== 'object') {
      throw Error('form valid msg must be a object');
    }
    //this.validMsg = {};

    for (const name in msg) {
      if (typeof msg[name] !== 'object') {
        this.validMsg[name.toLowerCase()] = msg[name];
      } else {
        this.formatMsg(msg[name], name.toLowerCase(), this.validMsg);
      }
    }
  }

  private formatMsg(msg: Object, path: string, result: Object) {
    for (const name in msg) {
      if (typeof msg[name] !== 'object') {
        result[path + '.' + name.toLowerCase()] = msg[name];
      } else {
        this.formatMsg(msg[name], path + '.' + name.toLowerCase(), result);
      }
    }
  }
}
