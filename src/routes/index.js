import { Router } from "express"

import categoriesRouter from "./categoriesRoutes.js"
import gamesRouter from "./gamesRoutes.js"

const routes = Router()

routes.use(categoriesRouter)
routes.use(gamesRouter)

export default routes
