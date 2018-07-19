# MprFormValid

本项目是为了方便angular form表单的使用，提供了方便的统一的验证错误消息显示

## 编译及启动
1. 编译库： ng build --prod form-valid <br/>
2. npm run build --prod 编译项目 <br/>
3. npm run start  启动example

## 安装
npm install https://github.com/ljx269919845/mpr-form-valid --save

## 使用
1.在项目的功能模板sharedModule中导入FormValidModule 且导出 FormValidModule <br/>
```typescript
import {FormValidModule} from 'mpr-form-valid/mpr-form-valid'
@NgModule({
imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidModule
],
exports: [
    FormValidModule,
    FormsModule,
    ReactiveFormsModule,
],
})
export class SharedModule { }
```
2.在根form组件中配置providers: [GlobalValidService] 如果本Module中同时只存在一个form则不需要此步骤 <br/>
3.具体使用方法可以参见 form-group-directive-valid form-group-valid form-valid-only <br/>

##自定义验证验证消息
使用指令 isliFormValidMsg 配置当前form表单的验证消息 
消息格式：
```typescript
isliFormValidMsg = {
    formControlName: {
        errorKey(验证函数返回的错误key): (errorMsg)显示的错误消息
    },
    formGroupName: {
        errorKey(验证函数返回的错误key): (errorMsg)显示的错误消息,
            formControlName: {
            errorKey(验证函数返回的错误key): (errorMsg)显示的错误消息
            }
    }
}
```

## GlobalValidService
1.在每个页面的根form组件中配置 providers: [GlobalValidService]
2.form表单提交时使用： GlobalValidService.validAll()

##表单验证指令

|指令名称                 | 指令描述  | 返回错误key|
| :-------------- | ----------------------------: | :-----------:|
| mprEmailValid | email验证 | emailError |
| mprFloatOnly | 输入为float验证 | float |
| mprPriceValid | 输入为价格验证 | price |
| mprIsbnValid | ISBN校验位验证 | isbn |
| mprIsbnPartValid | ISBN第三位第四位长度和验证 | isbnPart34 |
| mprIsbnHeaderValid | ISBN首段验证 | isbnHeader |
