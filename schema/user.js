/**
 * 用户信息校验规则
 */

const joi = require("@hapi/joi")

const username = joi.string().alphanum().min(1).max(10).required()

const password = joi.string().pattern(/^[\S]{6,15}$/).required()

const id = joi.number().integer().min(1).required()

const nickname = joi.string().required()

const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()

exports.regUserSchema = {
    body: {
        username,
        password
    }
}

exports.loginUserSchema = {
    body: {
        username,
        password
    }
}

exports.updataUserinfoSchema = {
    body: {
        id,
        nickname,
        email
    }
}

exports.updatePasswordSchema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref("oldPwd")).concat(password)//不能和旧密码相同,同时包含基本密码规则
    }
}

exports.updateAvatarSchema = {
    body: {
        avatar
    }
}

