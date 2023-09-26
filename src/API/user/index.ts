import express from "express"
import UsersController from "../../controllers/user"

const userAPI = express.Router()

// Fetch all Users
userAPI.get("/", UsersController.getAllUsers)

export default userAPI
