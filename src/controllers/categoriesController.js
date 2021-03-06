import db from "../db/index.js"

export const getCategories = async (req, res) => {
	const { params } = res.locals
	const orderByIdentifier = params.pop()
	try {
		const { rows } = await db.query(
			`--sql $3
		SELECT * FROM categories ORDER BY ${orderByIdentifier} OFFSET $1 LIMIT $2 
		`,
			params
		)
		res.send(rows)
	} catch (err) {
		if (err.code === "42702")
			return res
				.status(400)
				.send(`column reference '${orderByIdentifier}' is ambiguous`)
		else if (err.code === "42703")
			return res
				.status(400)
				.send(`'${orderByIdentifier}' is not a valid column name`)
		res.sendStatus(500)
	}
}

export const postCategory = async (req, res) => {
	const { name } = req.body
	try {
		await db.query(
			`INSERT INTO categories (name) 
			 VALUES ($1)
			`,
			[name]
		)
		res.sendStatus(201)
	} catch (err) {
		if (err.code === "23505") return res.sendStatus(409)
		res.sendStatus(500)
	}
}
