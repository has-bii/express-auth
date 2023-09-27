import { Request, Response } from "express"
import prisma from "../lib/prisma"
import { IUser } from "../types/global"

const USER = prisma.user

class UsersController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const user: IUser = req.body.user

            if (user.role === "USER") {
                res.status(403).json({ message: "Permission denied!" })
                return
            }

            // Retrieving all Users
            const data = await USER.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            })

            res.status(200).json({
                message: "Users data has been fetched successfully.",
                data,
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed to fetch Users data!",
                data: [],
            })

            console.error("Failed to fetch Users data\nError: ", error)
        }
    }
}

export default UsersController
