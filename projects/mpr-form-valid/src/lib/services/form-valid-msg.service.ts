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
    this.validMsg[msgKey] = msgValue;
  }

  public getValidMsg(msgPath: string, error) {
    if (!error || !msgPath) {
      return '';
    }
    for (const name in error) {
      if (error[name]) {
        return this.validMsg[msgPath + '.' + name] || globalValidMsgServ.getMsg(name);
      }
    }
    return '';
  }

  public resetMsg(msg: Object) {
    if (typeof msg !== 'object') {
      throw Error('form valid msg must be a object');
    }
    this.validMsg = {};

    for (const name in msg) {
      if (typeof msg[name] !== 'object') {
        this.validMsg[name] = msg[name];
      } else {
        this.formatMsg(msg[name], name, this.validMsg);
      }
    }
  }

  private formatMsg(msg: Object, path: string, result: Object) {
    for (const name in msg) {
      if (typeof msg[name] !== 'object') {
        result[path + '.' + name] = msg[name];
      } else {
        this.formatMsg(msg[name], path + '.' + name, result);
      }
    }
  }
}
