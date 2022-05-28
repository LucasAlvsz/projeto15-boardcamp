import { Router } from "express"

import {
	getCustomers,
	postCustomers,
} from "../controllers/customersController.js"
import {
	getCustomersFormatter,
	postCustomersValidation,
} from "../middlewares/customersMiddleware.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomersFormatter, getCustomers)
customersRouter.post("/customers", postCustomersValidation, postCustomers)

export default customersRouter
