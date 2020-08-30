const mysql = require("mysql")

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin123",
    database: "mySQL_zheng"
})

// db.query("select 1", (err) => {
//     console.log(err);
// })

module.exports = db