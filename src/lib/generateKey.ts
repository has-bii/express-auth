import fs from "fs"
import crypto from "crypto"

const PATH = ".env"
const MARKER = "SECRET_KEY="
const secretKey = crypto.randomBytes(32).toString("hex")

try {
    // Check if .env exists
    if (!fs.existsSync(PATH)) {
        // Copy .env.example
        fs.copyFileSync(".env.example", PATH)
    }

    // Read .env
    const data = fs.readFileSync(PATH, "utf-8")

    // Finding SECRET_KEY index
    const markerIndex = data.indexOf(MARKER)

    if (markerIndex === -1) {
        throw new Error("Marker not found in the file.")
    }

    // Inserting Secret Key to .env file
    const updatedData =
        data.slice(0, markerIndex + MARKER.length) +
        secretKey +
        data.slice(markerIndex + MARKER.length)

    // Writing updated content of .enf file
    fs.writeFileSync(PATH, updatedData, "utf-8")

    console.log("Secret Key generated successfully")
} catch (error) {
    console.error("Failed to generate Secret Key!", error)
}
