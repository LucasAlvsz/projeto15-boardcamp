import { Router } from "express"

import {
	getCategories,
	postCategory,
} from "../controllers/categoriesController.js"
import { postValidation } from "../middlewares/categoriesMiddleware.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", postValidation, postCategory)

export default categoriesRouter
