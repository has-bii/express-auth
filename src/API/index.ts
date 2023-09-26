import express from "express"
import userAPI from "./user"
import authAPI from "./auth"
import Middleware from "../middleware/verifyToken"

const router = express.Router()

router.use("/auth", authAPI)

router.use(Middleware.verifyToken)

router.use("/users", userAPI)

export default router
