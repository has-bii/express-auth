import { Request, Response } from "express"
import prisma from "../lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../lib/env"

interface IUser {
    email: string
    password: string
}

interface IUserRegister extends IUser {
    name: string
}

const salt = bcrypt.genSaltSync(10)

const USER = prisma.user

class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const user: IUserRegister = req.body

            // if name, email, password empty
            if (!user.name || !user.email || !user.password) {
                res.status(400).json({ message: "Name, email, and password are required!" })
                return
            }

            const isExist = await USER.findUnique({ where: { email: user.email } })

            if (isExist) {
                res.status(400).json({ message: "Email is already in use!" })
                return
            }

            // Create user
            const data = await USER.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: bcrypt.hashSync(user.password, salt),
                },
            })

            res.status(200).json({
                message: "User has been created.",
                data: { id: data.id, name: data.name, email: data.email },
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed to register new user!",
            })

            console.error("Failed to register new user!\n", error)
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const user: IUser = req.body

            // if email or password empty
            if (!user.email || !user.password) {
                res.status(400).json({ message: "Name and password are required!" })
                return
            }

            const data = await USER.findUnique({ where: { email: user.email } })

            if (data === null) {
                res.status(401).json({ message: "User does not exist!" })
                return
            }

            const checkPW = bcrypt.compareSync(user.password, data.password)

            if (!checkPW) {
                res.status(401).json({ message: "Password is incorrect!" })
                return
            }

            const token = jwt.sign(
                { id: data.id, name: data.name, email: data.email, role: data.role },
                env.SECRET_KEY,
                { algorithm: "HS256" }
            )

            if (token) {
                res.status(200)
                    .cookie("user_access", token, { secure: true, sameSite: true })
                    .json({ message: "Login successful", token })
            } else {
                res.status(500).json({ message: "Failed to create token" })
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to login! Unexpected error has occurred." })

            console.error("Failed to login", error)
        }
    }
}

export default AuthController
