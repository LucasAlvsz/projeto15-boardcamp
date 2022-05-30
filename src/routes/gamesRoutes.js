import { Router } from "express"

import { getGames, postGame } from "../controllers/gamesController.js"
import {
	getGamesFormatter,
	postGameValidation,
} from "../middlewares/gamesMiddleware.js"
import { paginationFormatter } from "../middlewares/paginationMiddleware.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGamesFormatter, paginationFormatter, getGames)
gamesRouter.post("/games", postGameValidation, postGame)

export default gamesRouter
