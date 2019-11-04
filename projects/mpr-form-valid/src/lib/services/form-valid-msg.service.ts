import { Injectable } from '@angular/core';

import { globalValidMsgServ } from './global-valid-msg.service';

@Injectable()
export class FormValidMsgService {
  private validMsg = {};
  constructor() {}

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
      return { errorMsg, minWeight };
    }

    for (let name in error) {
      if (!error.hasOwnProperty(name)) {
        continue;
      }
      const orgName = name;
      name = name.toLowerCase();
      tmpMsg = this.formartMsg(this.validMsg[msgPath + '.' + name] || globalValidMsgServ.getMsg(name), error[orgName]);
      if (!tmpMsg) {
        continue;
      }
      if (Number.isNaN(Number(error[name]))) {
        tmpWeight = 1000;
      } else {
        tmpWeight = Number(error[name]);
      }
      if (tmpWeight < minWeight) {
        minWeight = tmpWeight;
        errorMsg = tmpMsg;
      }
    }
    return { errorMsg, minWeight };
  }

  public formartMsg(msg: string, value: any) {
    if (typeof value !== 'object' || !value) {
      return msg;
    }
    return msg.replace(/\{(.+)\}/g, function(match, p1) {
      return value[p1] || '';
    });
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
