import Joi from "joi"

export const postValidation = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
	})

	const { error } = schema.validate(req.body, { abortEarly: false })

	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))

	next()
}
