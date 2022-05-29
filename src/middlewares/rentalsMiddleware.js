import Joi from "joi"
import validateCustomerId from "../services/validateCustomerId.js"
import validateGameCategoryId from "../services/validateGameCategoryId.js"
import validateGameStock from "../services/validadeGameStock.js"
import validateRentalStatus from "../services/validateRentalStatus.js"
import validateRentalId from "../services/validateRentalId.js"

export const getRentalsValidation = async (req, res, next) => {
	const { customerId, gameId } = req.query
	let query = ""
	let params = []
	if (customerId && gameId) {
		const customerIdValidation = await validateCustomerId(customerId)
		const gameIdValidation = await validateGameCategoryId(gameId)
		if (customerIdValidation === -1 || gameIdValidation === -1)
			return res.sendStatus(500)
		else if (!customerIdValidation || !gameIdValidation)
			return res.sendStatus(400)
		query = `WHERE rentals."customerId" = $1 AND rentals."gameId" = $2`
		params = [customerId, gameId]
	} else if (customerId) {
		const customerIdValidation = await validateCustomerId(customerId)
		if (customerIdValidation === -1) return res.sendStatus(500)
		else if (!customerIdValidation) return res.sendStatus(400)
		query = `WHERE rentals."customerId" = $1`
		params = [customerId]
	} else if (gameId) {
		const gameIdValidation = await validateCategoryId(gameId)
		if (gameIdValidation === -1) return res.sendStatus(500)
		else if (!gameIdValidation) return res.sendStatus(400)
		query = `WHERE rentals."gameId" = $1`
		params = [gameId]
	}
	res.locals.query = query
	res.locals.params = params
	next()
}

export const postRentalValidation = async (req, res, next) => {
	const schema = Joi.object({
		customerId: Joi.number().required(),
		gameId: Joi.number().required(),
		daysRented: Joi.number().min(1).required(),
	})
	const { error } = schema.validate(req.body, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	const customerIdValidation = await validateCustomerId(req.body.customerId)
	const gameIdValidation = await validateGameCategoryId(req.body.gameId)
	if (customerIdValidation === -1 || gameIdValidation === -1)
		return res.sendStatus(500)
	else if (!customerIdValidation || !gameIdValidation)
		return res.sendStatus(400)
	const gameStockValidation = await validateGameStock(req.body.gameId)
	if (gameStockValidation === -1) return res.sendStatus(500)
	else if (!gameStockValidation) return res.sendStatus(400)
	next()
}

export const finalizeRentalValidation = async (req, res, next) => {
	const schema = Joi.object({
		id: Joi.number().required(),
	})
	const { error } = schema.validate(req.params, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	const rentalIdValidation = await validateRentalId(req.params.id)
	if (rentalIdValidation === -1) return res.sendStatus(500)
	else if (!rentalIdValidation) return res.sendStatus(400)
	const rentalStatusValidation = await validateRentalStatus(req.params.id)
	if (rentalStatusValidation === -1) return res.sendStatus(500)
	else if (!rentalStatusValidation) return res.sendStatus(400)
	next()
}
