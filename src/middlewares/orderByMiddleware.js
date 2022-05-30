import Joi from "joi"

export const orderByFormatter = (req, res, next) => {
	const { order, desc } = req.query
	const schema = Joi.object({
		order: Joi.string().valid(),
		desc: Joi.boolean(),
	}).options({ allowUnknown: true })
	const { error } = schema.validate(req.query, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))

	let params = []
	if (order && desc === "true") params.push(`${order} DESC`)
	else if (order) params.push(order)
	else params.push(`id`)

	res.locals.params = [...res.locals.params, ...params]
	next()
}
