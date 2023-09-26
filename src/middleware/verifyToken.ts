import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../lib/env"

class Middleware {
    static verifyToken(req: Request, res: Response, next: Function) {
        try {
            if (!req.cookies.user_access) {
                res.status(401).json({ message: "Unauthorized" })
                return
            }

            const user = jwt.verify(req.cookies.user_access, env.SECRET_KEY)

            req.body.user = user

            next()
        } catch (error) {
            console.error(error)

            res.status(401).json({ message: "Unauthorized" })
        }
    }
}

export default Middleware
