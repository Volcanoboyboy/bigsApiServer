/**
 * 文章分类模块路由
 */

const express = require("express")
const router = express.Router()
const expressJoi = require("@escook/express-joi")
const { addCateSchema, deleteCateSchema, getCateIdSchema, updateCateSchema } = require("../schema/articaleCate")

const articleHandler = require("../router_handler/articleCate")
//  获取文章分类
router.get("/cates", articleHandler.getArticleCate)
//  添加文章分类
router.post("/addcates", expressJoi(addCateSchema), articleHandler.addArticleCates)
//  删除文章分类
router.get("/deletecate/:id", expressJoi(deleteCateSchema), articleHandler.deleteCate)
//  根据id获取文章分类
router.get("/cates/:id", expressJoi(getCateIdSchema), articleHandler.getArticleCateById)
//  根据id更新文章分类
router.post("/updatecate", expressJoi(updateCateSchema), articleHandler.updateCateById)

//  导出路由模块
module.exports = router