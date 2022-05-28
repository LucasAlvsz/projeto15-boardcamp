import { Router } from "express"

import categoriesRouter from "./categoriesRoutes.js"
import gamesRouter from "./gamesRoutes.js"
import customersRouter from "./customersRoutes.js"

const routes = Router()

routes.use(categoriesRouter)
routes.use(gamesRouter)
routes.use(customersRouter)

export default routes
