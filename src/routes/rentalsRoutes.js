import { Router } from "express"

import {
	getRentals,
	postRental,
	finalizeRental,
	deleteRental,
} from "../controllers/rentalsController.js"
import {
	getRentalsValidation,
	postRentalValidation,
	finalizeAndDeleteRentalValidation,
} from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentalsValidation, getRentals)
rentalsRouter.post("/rentals", postRentalValidation, postRental)
rentalsRouter.post(
	"/rentals/:id/return",
	finalizeAndDeleteRentalValidation,
	finalizeRental
)
rentalsRouter.delete(
	"/rentals/:id",
	finalizeAndDeleteRentalValidation,
	deleteRental
)

export default rentalsRouter
