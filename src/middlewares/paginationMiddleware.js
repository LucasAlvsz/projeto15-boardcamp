import Joi from "joi"

export const paginationFormatter = (req, res, next) => {
	const { offset, limit } = req.query
	const schema = Joi.object()
		.keys({
			offset: Joi.number().integer().min(1),
			limit: Joi.number().integer().min(1),
		})
		.options({ allowUnknown: true })
	const { error } = schema.validate(req.query)
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))

	let params = []
	if (offset) params.push(offset)
	else params.push(0)
	if (limit) params.push(limit)
	else params.push(null)

	res.locals.params = [...params]
	res.locals.offset = `OFFSET`
	res.locals.limit = `LIMIT`
	next()
}
