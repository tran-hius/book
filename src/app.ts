import express from "express"
const app = express()
import { bookRouter } from "./routers/book.route.js"
import { errorMiddlewares } from "./middlewares/error.middleware.js"
import { createContainer } from "./container.js"

app.use(express.json())

const { bookController } = createContainer()

app.use("/api/v1", bookRouter(bookController))

app.use(errorMiddlewares)

export default app