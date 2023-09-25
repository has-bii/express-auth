import { Request, Response } from "express"
import prisma from "../lib/prisma"

const user = prisma.user

// Get All Users
async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await user.findMany()

        res.status(200).json({
            message: "Users data has been fetched successfully.",
            data: users,
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to fetch Users data!",
            data: [],
        })

        console.error("Failed to fetch Users data\nError: ", error)
    }
}

export { getAllUsers }
