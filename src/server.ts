import { env, loadEnv } from "./lib/env"

loadEnv() // Executed synchronously before the rest of your app loads

import express from "express"
import router from "./API"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const port = env.PORT || 3000

// Enable cors
app.use(
    cors({
        credentials: true,
    })
)

// Enable Cookie Parser
app.use(cookieParser())

// Enable body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router)

app.listen(port, () => {
    console.log(`⚡[server], Server running at http://localhost:${port}`)
})
