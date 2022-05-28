import { Router } from "express"

import {
	getCategories,
	postCategory,
} from "../controllers/categoriesController.js"
import { postCategoriesValidation } from "../middlewares/categoriesMiddleware.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", postCategoriesValidation, postCategory)

export default categoriesRouter
