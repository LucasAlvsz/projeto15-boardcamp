import Joi from "joi"
import validateCustomerId from "../services/validateCustomerId.js"
import validateCustomerCpf from "../services/validateCustomerCpf.js"

export const getCustomersFormatter = async (req, res, next) => {
	if (!req.query.cpf) res.locals.query = "%"
	else res.locals.query = `${req.query.cpf}%`
	next()
}

export const getCustomerValidation = async (req, res, next) => {
	const schema = Joi.object({
		id: Joi.number().required(),
	})
	const { error } = schema.validate(req.params, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	const idValidation = await validateCustomerId(req.params.id)
	if (idValidation === -1) return res.sendStatus(500)
	if (!idValidation) return res.sendStatus(404)
	next()
}

export const postCustomersValidation = async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		phone: Joi.string().min(10).max(11).required(),
		cpf: Joi.string().min(11).max(11).required(),
		birthday: Joi.date().required(),
	})
	const { error } = schema.validate(req.body, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))
	next()
}

export const putCustomerValidation = async (req, res, next) => {
	const schema = Joi.object({
		body: Joi.object({
			name: Joi.string().required(),
			phone: Joi.string().min(10).max(11).required(),
			cpf: Joi.string().min(11).max(11).required(),
			birthday: Joi.date().required(),
		}),
		params: Joi.object({
			id: Joi.number().required(),
		}),
	}).options({ allowUnknown: true })

	const { error } = schema.validate(req, { abortEarly: false })
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message))

	const idValidation = await validateCustomerId(req.params.id)
	if (idValidation === -1) return res.sendStatus(500)
	if (!idValidation) return res.sendStatus(404)

	const cpfValidation = await validateCustomerCpf(req.body.cpf)
	if (cpfValidation === -1) return res.sendStatus(500)
	if (cpfValidation) return res.sendStatus(409)
	next()
}
