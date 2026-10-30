import app from "./app.js"
import { Database } from "./config/database.js"
import { config } from "./config/env.js"

const PORT = config.PORT

const buildApp = async () => {
    try {
        const db = Database.getInstance()
        await db.connect()
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

buildApp()
