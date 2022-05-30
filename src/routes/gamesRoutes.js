import { Router } from "express"

import { getGames, postGame } from "../controllers/gamesController.js"
import {
	getGamesFormatter,
	postGameValidation,
} from "../middlewares/gamesMiddleware.js"
import { paginationFormatter } from "../middlewares/paginationMiddleware.js"
import { orderByFormatter } from "../middlewares/orderByMiddleware.js"

const gamesRouter = Router()

gamesRouter.get(
	"/games",
	getGamesFormatter,
	paginationFormatter,
	orderByFormatter,
	getGames
)
gamesRouter.post("/games", postGameValidation, postGame)

export default gamesRouter
