import Joi from "joi"

export const postCategoriesValidation = (req, res, next) => {
	if (!req.body.name) return res.sendStatus(400)
	const schema = Joi.object({
		name: Joi.string().required(),
	})

	const { error } = schema.validate(req.body, { abortEarly: false })

	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))

	next()
}
