import { Request, Response } from "express"
import prisma from "../lib/prisma"
import bcrypt from "bcrypt"

interface user_body {
    name: string
    email: string
    password: string
}

const salt = bcrypt.genSaltSync(10)

const User = prisma.user

async function register(req: Request, res: Response) {
    try {
        const { name, email, password }: user_body = req.body

        // if name, email, password empty
        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email, and password are required!" })
            return
        }

        // Create user
        const data = await User.create({
            data: {
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt),
            },
        })

        res.status(200).json({
            message: "User has been created.",
            data,
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to register user!",
        })

        console.error("Failed to fetch Users dFailed to register user\n", error)
    }
}

export { register }
