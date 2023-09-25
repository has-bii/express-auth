import express from "express"
import userAPI from "./user"
import authAPI from "./auth"

const router = express.Router()

router.use("/users", userAPI)
router.use("/auth", authAPI)

export default router
