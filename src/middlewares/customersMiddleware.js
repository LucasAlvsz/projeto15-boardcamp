import Joi from "joi"

export const getCustomersFormatter = async (req, res, next) => {
	if (!req.query.cpf) res.locals.query = "%"
	else res.locals.query = `%${req.query.cpf}`
	next()
}

export const postCustomersValidation = async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		phone: Joi.string().min(10).max(11).required(),
		cpf: Joi.string().min(11).max(11).required(),
		birthday: Joi.string()
			.pattern(/^\d{4}-\d{2}-\d{2}$/)
			.required(),
	})
	const { error } = schema.validate(req.body, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	next()
}
