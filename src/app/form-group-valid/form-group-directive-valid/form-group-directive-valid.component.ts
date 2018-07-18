import { Component, OnInit } from '@angular/core';
import { GlobalValidService } from '../../../../mpr-form-valid';

const VALID_ERROR_MSG = {
  username: { required: '请输入邮箱' },
  password: { required: '请输入密码' },
  user: {
    nickname: {
      required: '请输入用户名',
      maxLength: '用户名最多5位'
    },
    sex: {
      required: '请输入性别'
    }
  },
  group1: {
    control1: {
      required: '请输入用户名',
      maxLength: '用户名最多5位'
    },
    control2: {
      required: '请输入性别'
    }
  }
};

@Component({
  selector: 'app-form-group-directive-valid',
  templateUrl: './form-group-directive-valid.component.html',
  styleUrls: ['./form-group-directive-valid.component.css']
})
export class FormGroupDirectiveValidComponent implements OnInit {

  validErrorMsg = VALID_ERROR_MSG;
  public form = {
    username: '',
    password: '',
    user: {
      nickname: '',
      sex: ''
    },
    group1: {
      control1: '',
      control2: ''
    }
  };
  constructor(private globalServ: GlobalValidService) { }

  ngOnInit() {
  }

  handleSubmit(form) {
    console.log(form);
    this.globalServ.validAll();
  }
}
