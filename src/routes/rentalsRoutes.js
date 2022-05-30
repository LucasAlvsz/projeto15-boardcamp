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
import { paginationFormatter } from "../middlewares/paginationMiddleware.js"
import { orderByFormatter } from "../middlewares/orderByMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get(
	"/rentals",
	getRentalsValidation,
	paginationFormatter,
	orderByFormatter,
	getRentals
)
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
