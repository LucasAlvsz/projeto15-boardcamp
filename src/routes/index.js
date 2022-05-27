import { Router } from "express"

import categoriesRouter from "./categoriesRoutes.js"

const routes = Router()

routes.use(categoriesRouter)

export default routes
