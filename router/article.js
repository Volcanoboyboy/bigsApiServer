const { required } = require("@hapi/joi");

//  文章相关路由模块对象
const express = require("express")
const router = express.Router()
const ArticleHandler = require("../router_handler/article")
const multer = require("multer")
const path = require("path")
const expressJoi = require("@escook/express-joi")

//  导入验证规则
const { addArticleSchema } = require("../schema/article")

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

//  新增文章路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post("/add", upload.single("cover_img"), expressJoi(addArticleSchema), ArticleHandler.addArticle)



module.exports = router