# egg-template

### 目前主要内容

**egg + mysql + sequelize**

### controller 控制器

> common.js 公用控制器
> vue/index.js vue3 控制器

### extend 扩展文件

app/extend

> context.js 请求状态码 Joi 验证状态
> helper.js 公用方法
> request.js 封装 sequelize 增删改查常用方法

### middleware 中间件

> vueAes.js #Aes 数据加密解密
> vueAuth.js #权限判断
> vueSign.js #数据接口签名
> vueTokenCheck.js #Token 检查

### Model 模型

> VueUser.js #用户表

### 第三方插件

app/utils/\*

> WXBizDataCrypt.js 微信官方 解密数据

### routers 全部路由配置

> common.js 公用路由
> vue.js 隔离专用路由

### service 服务

> jwtServer.js #创建 token，解密 token 数据
> vueUser.js #构造函数，加载通用 request.js 方法亦可自定义方法

### utils

> /utils/cryptoJs/ars_util.js #aes，base64 加密解密方法

### validator 字段验证

> commonVfy.js #公用验证方法
> vueVfy.js #独立验证方法

### app/public 静态资源

配置文件在 config.default.js config.static 中
使用参考 controller/common.js 上传文件

### 全部变量 在 config.\* 中的 const userConfig 暴露

### test 单元测试

> /controller/home.test.js 测试文件 可测试上传图片接口到 app/public
> /public/image1.jpeeg #测试所需图片

### 安装测试教程

`git clone https://gitee.com/hlgshare/egg-template.git`

修改 config.default.js 中的 mysql 配置信息 config.sequelize

app.js 选择一个 app.model.sync 同步 model 的表单到数据库

### 使用说明

`npm install` #安装

`npm run dev` #运行

`npm run test` #测试
