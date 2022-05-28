import { Router } from "express"

import {
	getCustomers,
	getCustomer,
	postCustomers,
	putCustomer,
} from "../controllers/customersController.js"
import {
	getCustomersFormatter,
	getCustomerValidation,
	postCustomersValidation,
	putCustomerValidation,
} from "../middlewares/customersMiddleware.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomersFormatter, getCustomers)
customersRouter.get("/customers/:id", getCustomerValidation, getCustomer)
customersRouter.post("/customers", postCustomersValidation, postCustomers)
customersRouter.put("/customers/:id", putCustomerValidation, putCustomer)

export default customersRouter
