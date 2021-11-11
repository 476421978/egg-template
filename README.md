# egg-template

### 目前主要内容

egg + mysql + sequelize

### app/api/ 接口管理

> index.js #axios 请求方式
> wechat.js #接口路由

### app/extend/ 扩展文件

> context.js 请求状态码等
> helper.js 公用方法 解密微信敏感用户信息
> request.js 封装 sequelize 常用方法

### app/middleware/ 中间件

> minaAes.js #aes 传输加密
> minaSign.js #接口签名加密
> minaTokenCheck.js #Token 检查

### app/model/ 模型表单

> MinaToken.js #存放小程序或公众号的 token 等信息
> WxPayRecord.js #微信支付记录存储
> WxUserInfo.js #微信用户存储

### app/public/ 静态资源 static

在 config.\*.js 中配置

### app/routers/ 路由集合

.common.js #公用路由
.mina.js #隔绝专属路由

### app/service/ 服务

> jwtServer.js #Token 管理
> minaToken 、wxPayRecord 、wxUserInfo.js #表单服务

### app/utils/ 工具插件

> /cryptoJs/aes_util.js #aes 加密插件
> /wechat/WXBizDataCrypt.js #微信解密敏感数据插件

### config.\* 中的 const userConfig 暴露

> /lib/wechatInfo.js #小程序、公众号等配置信息
> config.\*.js #生产环境、本地环境配置
> plugin.js #开启插件

### logs 日志

详情看 config.\*.js 配置 logger

### test 单元测试

/controller/home.test.js 测试文件 可测试上传图片接口到 app/public /public/image1.jpeg #测试所需图片

### 安装教程

git clone https://gitee.com/hlgshare/egg-template.git
修改 config.default.js 中的 mysql 配置信息 config.sequelize
app.js 选择一个 app.model.sync 同步 model 的表单到数据库

### 使用说明

npm install

npm run dev
