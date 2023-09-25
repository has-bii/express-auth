import dotenv from "dotenv"
dotenv.config()

import express from "express"
import router from "./API"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router)

app.listen(port, () => {
    console.log(`⚡[server], Server running at http://localhost:${port}`)
})
