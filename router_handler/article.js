/**
 * 文章相关路由模块
 */

const db = require("../dataBase")
const path = require("path")

module.exports = {
    //  新增文章
    addArticle(req, res) {
        if (!req.file || req.file.filedname !== "cover_img") {
            return res.cc("封面图像必须上传")
        }

        //  手动准备文章数据对象
        const articleObj = {//当对象属性与数据库对象属性一致时是可以简写的,sql会自动匹配
            ...req.body,
            cover_img: path.join("/uploads", req.file.filename),// 这里要先打印req.body和req.file看一下结果
            pub_date: new Date(),
            author_id: req.user.id
        }

        const sql_addArticle = 'insert into ev_article set ?'
        db.query(sql_addArticle, articleObj, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) {
                return res.cc("新增文章失败")
            }
            res.cc("新增文章成功", 0)
        })
    }
}