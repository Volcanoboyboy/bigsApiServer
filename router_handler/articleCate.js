/**
 * 文章分类处理函数
 */

const db = require("../dataBase/index")

module.exports = {//    获取数据的时候一定要想到校验,前端校验为辅后端校验为主
    //  获取文章分类
    getArticleCate(req, res) {
        const sql = "select * from ev_article_cate where is_delete = 0 order by asc"
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                msg: "获取文章分类成功",
                data: results
            })
        })
    },
    //  添加文章分类处理函数
    addArticleCates(req, res) {
        const sql_name_alias = "select * from ev_article_cate where name = ? or alias = ?"
        db.query(sql_name_alias, [req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            if (results.length === 2) return res.cc("分类名和别名被占用")
            if (results.length === 1 && req.body.name === results[0].name && req.body.alias === results[0].alias) {
                return res.cc("分类名和别名被占用")
            }
            if (results.length === 1 && req.body.name === results[0].name) return res.cc("分类名被占用")
            if (results.length === 1 && req.body.alias === results[0].alias) return res.cc("别名被占用")
            const insert_name_alias = "insert into ev_article_cate set ?"
            db.query(insert_name_alias, req.body, (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) {
                    return res.cc("添加分类失败")
                }
                res.cc("添加分类成功", 0)
            })
        })
    },
    //  删除文章分类处理函数
    deleteCate(req, res) {
        //  这里是动态参数,通过req.params获取,区别req.body req.query
        //  这里执行的删除要执行标记删除,而不是删除,如果直接执行删除语句风险比较高
        const sql_delete_cate = "update ev_article_cate set is_delete = 1 where id = ?"
        db.query(sql_delete_cate, req.params.id, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) {
                return res.cc("删除文章分类失败")
            }
            res.cc("删除文章分类成功", 0)
        })
    },
    //  根据id获取文章分类
    getArticleCateById(req, res) {
        const sql_getCate = "select * from ev_article_cate where id = ? and is_delete = 0"
        db.query(sql_getCate, req.params.id, (err, results) => {
            if (err) return res.cc(err)
            if (results.length !== 1) {
                return res.cc("根据id获取文章分类失败")
            }
            res.send({
                status: 0,
                msg: "获取文章分类成功",
                data: results[0]
            })
        })
    },
    //  根据id更新文章分类
    updateCateById(req, res) {
        const sql = `select * from ev_article_cate where name=? or alias=?`
        db.query(sql, [req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            // 分类名称 和 分类别名 都被占用
            if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
            if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
            // 分类名称 或 分类别名 被占用
            if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
            if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

            const sql_update_name_alias = "update ev_article_cate set ? where id = ?"
            db.query(sql_update_name_alias, [req.body, req.body.id], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) {
                    return res.cc("更新分类失败")
                }
                res.cc("更新分类成功", 0)
            })
        })
        res.send("ok")
    }
}