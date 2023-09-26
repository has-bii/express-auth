import express from "express"
import AuthController from "../../controllers/auth"

const authAPI = express.Router()

// Register
authAPI.post("/register", AuthController.register)
authAPI.post("/login", AuthController.login)

export default authAPI
