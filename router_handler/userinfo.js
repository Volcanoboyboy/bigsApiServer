/**
 * 用户信息相关的路由处理函数模块
 */

const db = require("../dataBase/index");

//  加密密码的包
const bcrypt = require("bcryptjs")

let randomSalt = Math.ceil(Math.random() * 15);

module.exports = {
    //  获取用户信息的处理函数
    getUserInfo(req, res) {
        const queryUserStr = "select id, username, nickname, email, user_pic from ev_users where id=?";
        db.query(queryUserStr, req.user.id, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0
                , msg: "获取用户信息成功"
                , data: results[0]
            })
        })
    },
    // 更新用户信息的处理函数
    updataUserInfo(req, res) {
        const updateUserInfoStr = "update ev_users set ? where id=?"
        db.query(updateUserInfoStr, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) {
                return res.cc("更新失败")
            }
            res.cc("用户信息更新成功", 0)
        })
    },
    //  重置秘密
    updatePassword(req, res) {
        //  接收提交的数据  req.body
        //  查询用户是否存在 我们在注册的时候有保存用户的数据req.user.id 等数据
        //  而req.body是用户提交的数据,这是需要更数据进行比对的
        const queryPwdStr = "select * from ev_users where id=?";
        db.query(queryPwdStr, req.user.id, (err, results) => {
            if (err) return res.cc(err);
            if (results.length !== 1) {
                return res.cc("用户不存在")
            }

            //  对比旧密码和数据库中的密码是否一致,防止误更改
            const compareRsult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
            if (!compareRsult) {
                return res.cc("旧密码错误")
            }

            //  更新数据库中的密码成新密码 -- req.body.newPwd
            const newPassword = bcrypt.hashSync(req.body.newPwd, randomSalt);
            const updatePwdStr = "update ev_users set password = ? where id = ?"
            db.query(updatePwdStr, [newPassword, req.user.id], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) {
                    return res.cc("密码更新失败")
                }
                res.cc("密码更新成功", 0)
            })
        })
    },
    //  更新头像
    updateAvatar(req, res) {
        // 要有意识的接收一下客户端发送的数据
        const queryAvatarStr = "update ev_users set avatar = ? where id = ?";
        db.query(queryAvatarStr, [req.body.avatar, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) {
                return res.cc("用户头像更新失败")
            }
            return res.cc("用户头像更新成功", 0)
        })
    }
}


