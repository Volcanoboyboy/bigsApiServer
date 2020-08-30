const express = require("express")
const app = express()
const cors = require("cors")



//  跨域中间件
app.use(cors())
//  解析请求体数据对象 --> req.body
app.use(express.urlencoded({ extended: false }))

//  托管静态文件
app.use("/uploads", express.static("./uploads"))

//  要在路由之前挂载res属性,后面的路由才能使用到这个属性
app.use((err, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

//  全局解析token,以完成访问受保护页面的权鉴
const expressJwt = require("express-jwt")
const { jwtSecretKey } = require("./config")

//  注册全局解析token中间件
app.use(expressJwt({
    secret: jwtSecretKey
})
    .unless({
        path: [/^\/api/]//  所有api开头的接口不受保护
    })
)

/*  挂载路由 */
const userRouter = require("./router/user")
const userInfoRouter = require("./router/userInfo")
const articleCateRouter = require("./router/articleCate")
const articleRouter = require("./router/article")
app.use("/api", userRouter)
app.use("/my", userInfoRouter)
app.use("/my/article", articleCateRouter)
app.use("/my/article", articleRouter)


//  优化校验规则报错,利用全局中间件
const joi = require("@hapi/joi")
const expressJoi = require("@escook/express-joi")
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err.message)
    }

    // 判断当前错误是不是解析tokne失败的错误
    if (err.name == "UnauthorizedError") {
        return res.cc("身份认证失败")
    }
    res.cc(err)
    next()
})

app.listen(3007, () => {
    console.log("服务器启动成功,地址:http://127.0.0.1:3007");
})
