import Joi from "joi"
import getCategoriesId from "../services/getCategoriesId.js"

export const getGamesFormatter = async (req, res, next) => {
	if (!req.query.name) res.locals.query = "%%"
	else res.locals.query = `%${req.query.name}%`
	next()
}

export const postGameValidation = async (req, res, next) => {
	const categoriesIds = await getCategoriesId()
	const schema = Joi.object({
		name: Joi.string().required(),
		image: Joi.string().required(),
		stockTotal: Joi.number().min(1).required(),
		categoryId: Joi.number().required(),
		pricePerDay: Joi.number().min(1).required(),
	})
	const { error } = schema.validate(req.body, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	if (!categoriesIds.find(id => id.id === req.body.categoryId))
		return res.sendStatus(400)
	next()
}
