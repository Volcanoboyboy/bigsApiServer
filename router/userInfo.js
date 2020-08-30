const express = require("express")
const router = express.Router()
const expressJoi = require("@escook/express-joi")
//  校验规则
const { updataUserinfoSchema, updatePasswordSchema, updateAvatarSchema } = require("../schema/user")

//  处理函数
const { getUserInfo, updataUserInfo, updatePassword, updateAvatar } = require("../router_handler/userinfo")

router.get("/userinfo", getUserInfo)

router.post("/userinfo", expressJoi(updataUserinfoSchema), updataUserInfo)

router.post("/updatepwd", expressJoi(updatePasswordSchema), updatePassword)

router.post("/update/avatar", expressJoi(updateAvatarSchema), updateAvatar)



module.exports = router