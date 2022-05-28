import { Router } from "express"

import { getGames, postGame } from "../controllers/gamesController.js"
import { postGameValidation } from "../middlewares/gamesMiddleware.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", postGameValidation, postGame)

export default gamesRouter
