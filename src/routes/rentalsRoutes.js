import { Router } from "express"

import {
	getRentals,
	postRental,
	finalizeRental,
} from "../controllers/rentalsController.js"
import {
	getRentalsValidation,
	postRentalValidation,
	finalizeRentalValidation,
} from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentalsValidation, getRentals)
rentalsRouter.post("/rentals", postRentalValidation, postRental)
rentalsRouter.post(
	"/rentals/:id/return",
	finalizeRentalValidation,
	finalizeRental
)

export default rentalsRouter
