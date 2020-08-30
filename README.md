# bigsApiServer

> Node.js
>
> 基于express框架

**用到的一些包**

```json
	"dependencies": {
    "@escook/express-joi": "^1.0.0",
    "@hapi/joi": "^17.1.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-jwt": "^5.3.3",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.2",
    "mysql": "^2.18.1"
  }
```

需要注意的

- Express.urlencoded({extends: false})中间件只能解析普通请求数据体
- form-data格式的数据请求体,用到了multer来解析,会解析出revuest.body和request.file两个对象
- 拿到前端请求的数据,首要的做的就是做数据校验,这里用到的是joi验证规则,结合jwt中间件
- 在全局利用jwt中间件解析token
- sql语句查询结果的差别,查询语句结果是数组,其他语句都是对象,通过affectedRows属性判断sql语句是否成功

