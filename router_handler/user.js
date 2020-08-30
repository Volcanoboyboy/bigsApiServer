const db = require("../dataBase/index")

//  加密模块
const bcrypt = require("bcryptjs")

//  生成token模块
const jsonwebToken = require("jsonwebtoken")

//  配置文件 -- 密钥
const { jwtSecretKey } = require("../config")

module.exports.regUser = (req, res) => {
    const userInfo = req.body;
    //  使用express-joi中间件加@hapi/joi规则进行验证
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc("用户数据不合法")
    // }

    //验证用户名是否被占用
    const querUsernam = "select * from ev_users where username=?";
    db.query(querUsernam, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 0) {
            return res.cc("用户名被占用")
        }

        // 用户名有效的情况下要对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        //  把用户添加到数据库
        const insertUserInfo = "insert into ev_users set ?";//  这里数据属性和数据库属性相同可以简写
        db.query(insertUserInfo, userInfo, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.affectedRows !== 1) {
                return res.cc("用户注册失败")
            }
            res.cc("用户注册成功", 0)
        })
        // res.send(userInfo)
    })
}

module.exports.login = (req, res) => {
    //  接收提交消息
    const userInfo = req.body;

    //  判断用户是否存在
    const querSqlStr = "select * from ev_users where username=?";
    db.query(querSqlStr, userInfo.username, (err, result) => {
        if (err) return res.cc(err);
        if (result.length !== 1) {
            return res.cc("登录失败,请输入用户名和密码");
        }
        //  密码校验 bcrypt.compareSync(用户提交的明文密码,数据库中密文密码)
        const compareResult = bcrypt.compareSync(userInfo.password, result[0].password);
        if (!compareResult) {
            return res.cc("登录失败,请输入用户名和密码")
        }

        //  生成ttoken,剔除敏感信息和无用信息,例如密码和头像等,(安装jsonwebtoken@8.5.1)
        const user = {
            ...result[0]
            , username: ""
            , user_pic: ""
        }

        const token = jsonwebToken.sign(user, jwtSecretKey, { expiresIn: "10h" });

        res.send({
            status: 0,
            msg: "登录成功"
            , token: "Bearer " + token
        })
    })
}

