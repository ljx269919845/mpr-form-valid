import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidtor } from '../../form-valid/validtors';
import { GlobalValidService } from '../../form-valid';

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
  }
};

@Component({
  selector: 'app-form-group-valid',
  templateUrl: './form-group-valid.component.html',
  styleUrls: ['./form-group-valid.component.css']
})
export class FormGroupValidComponent implements OnInit {

  public form: FormGroup;
  public validErrorMsg = VALID_ERROR_MSG;

  constructor(private fb: FormBuilder, private gbValidServ: GlobalValidService) {
    this.form = fb.group({
      username: ['', [new EmailValidtor(), Validators.required]],
      password: ['', [Validators.required]],
      user: fb.group({
        nickname: ['', [Validators.required, Validators.maxLength(5)]],
        sex: ['', [Validators.required]]
      })
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.gbValidServ.validAll();
  }
}
