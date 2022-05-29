import { Router } from "express"

import { getRentals } from "../controllers/rentalsController.js"
import { getRentalsValidation } from "../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentalsValidation, getRentals)

export default rentalsRouter
