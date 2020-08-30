/**
 * 文章分类验证规则
 */

const joi = require("@hapi/joi")

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().required()

module.exports.addCateSchema = {
    body: {
        name,
        alias
    }
}

module.exports.deleteCateSchema = {
    params: {
        id
    }
}

module.exports.getCateIdSchema = {
    params: {
        id
    }
}

module.exports.updateCateSchema = {
    body: {
        Id: id,
        name,
        alias
    }
}

