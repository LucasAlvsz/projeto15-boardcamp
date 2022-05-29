import { Router } from "express"

import {
	getRentals,
	postRental,
	finalizeRent,
} from "../controllers/rentalsController.js"
import {
	getRentalsValidation,
	postRentalValidation,
} from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentalsValidation, getRentals)
rentalsRouter.post("/rentals", postRentalValidation, postRental)
rentalsRouter.post("/rentals/:id/return", finalizeRent)

export default rentalsRouter
