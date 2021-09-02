# egg-template

### 目前主要内容

egg + mysql + sequelize

### 扩展文件

app/extend

> context.js 请求状态码等
> helper.js 公用方法
> request.js 封装 sequelize 常用方法

### 第三方插件

app/utils/\*

> WXBizDataCrypt.js 微信官方 解密数据

### 字段验证

app/validator

### 静态配置文件 在 config.\* 中的 const userConfig 暴露

config/lib

### 根目录下 public 为默认静态资源目录

### test 单元测试

### 安装教程

git clone https://gitee.com/hlgshare/egg-template.git
修改 config.default.js 中的 mysql 配置信息 config.sequelize
app.js 选择一个 app.model.sync 同步 model 的表单到数据库

### 使用说明

npm install
npm run dev
