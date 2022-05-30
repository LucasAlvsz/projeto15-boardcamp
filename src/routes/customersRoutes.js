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
import { paginationFormatter } from "../middlewares/paginationMiddleware.js"
import { orderByFormatter } from "../middlewares/orderByMiddleware.js"

const customersRouter = Router()

customersRouter.get(
	"/customers",
	getCustomersFormatter,
	paginationFormatter,
	getCustomers
)
customersRouter.get("/customers/:id", getCustomerValidation, getCustomer)
customersRouter.post("/customers", postCustomersValidation, postCustomers)
customersRouter.put("/customers/:id", putCustomerValidation, putCustomer)

export default customersRouter
