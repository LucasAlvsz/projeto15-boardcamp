import "dotenv/config"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

import routes from "./routes/index.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.get("/", (req, res) => {
	res.send("Hello World")
})

app.listen(process.env.PORT || 4000, () => {
	console.log(`Server is running on port ${process.env.PORT || 4000}🐱‍👤`)
})
