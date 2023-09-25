import express from "express"
import { getAllUsers } from "../../controllers/user"

const userAPI = express.Router()

// Fetch all Users
userAPI.get("/", getAllUsers)

export default userAPI
