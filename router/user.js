const express = require("express")
const router = express.Router()
const userHandler = require("../router_handler/user")

const expressJoi = require("@escook/express-joi")
const { regUserSchema, loginUserSchema } = require("../schema/user")


router.post("/reguser", expressJoi(regUserSchema), userHandler.regUser)

router.post("/login", expressJoi(loginUserSchema), userHandler.login)

module.exports = router;