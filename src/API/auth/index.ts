import express from "express"
import { register } from "../../controllers/auth"

const authAPI = express.Router()

// Register
authAPI.post("/register", register)

export default authAPI
