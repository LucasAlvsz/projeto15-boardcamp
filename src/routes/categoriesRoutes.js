import { Router } from "express"

import {
	getCategories,
	postCategory,
} from "../controllers/categoriesController.js"
import { postCategoriesValidation } from "../middlewares/categoriesMiddleware.js"
import { paginationFormatter } from "../middlewares/paginationMiddleware.js"
import { orderByFormatter } from "../middlewares/orderByMiddleware.js"

const categoriesRouter = Router()

categoriesRouter.get(
	"/categories",
	paginationFormatter,
	orderByFormatter,
	getCategories
)
categoriesRouter.post("/categories", postCategoriesValidation, postCategory)

export default categoriesRouter
