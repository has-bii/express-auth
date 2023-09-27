import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../lib/env"
import prisma from "../lib/prisma"

const USER = prisma.user
const TOKEN = prisma.token

class Middleware {
    static async verifyToken(req: Request, res: Response, next: Function) {
        try {
            // Check cookie
            if (!req.cookies.user_access) {
                res.status(401).json({ message: "Unauthorized" })
                return
            }

            // Verifying token
            const jwtPayload: any = jwt.verify(req.cookies.user_access, env.SECRET_KEY)

            // Find user
            const user = await USER.findUnique({ where: { id: jwtPayload.id } })

            if (!user) {
                res.status(401).json({ message: "Unauthorized. User has been removed!" })
                return
            }

            // Find token
            const token = await TOKEN.findUnique({
                where: { userId: user.id, token: req.cookies.user_access },
            })

            // Validate Token
            if (!token || token.expire < new Date()) {
                res.status(400).json({ message: "Token is either invalid or expired" })
                return
            }

            req.body.user = user

            next()
        } catch (error) {
            console.error(error)

            res.status(401).json({ message: "Unauthorized" })
        }
    }
}

export default Middleware
