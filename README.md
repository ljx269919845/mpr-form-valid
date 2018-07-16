# MprFormValid

本项目是为了方便angular form表单的使用，提供了方便的统一的验证错误消息显示

## 编译及启动
npm run build --prod 编译项目
npm run start  启动项目例子

## 安装
npm install https://github.com/ljx269919845/mpr-form-valid --save

## 使用
1.在项目的功能模板sharedModule中导入FormValidModule 且导出 FormValidModule
2.在根form组件中配置providers: [GlobalValidService] 如果本Module中同时只存在一个form则不需要此步骤
3.具体使用方法可以参见 form-group-directive-valid form-group-valid form-valid-only


