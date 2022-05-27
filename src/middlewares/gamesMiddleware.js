import Joi from "joi"

export const postGameValidation = async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		image: Joi.string().required(), //FIXME
		stockTotal: Joi.number().min(1).required(),
		categoryId: Joi.number.required(), //FIXME
		price: Joi.number().min(1).required(),
	})

	const { error } = schema.validate(req.body, { abortEarly: false })
	if (error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}
