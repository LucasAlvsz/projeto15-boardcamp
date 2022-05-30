import db from "../db/index.js"

export const getCategories = async (req, res) => {
	const { params } = res.locals
	try {
		const { rows } = await db.query(
			`--sql $3
		SELECT * FROM categories OFFSET $1 LIMIT $2 
		`,
			params
		)
		res.send(rows)
	} catch (err) {
		res.sendStatus(500)
		console.log(err)
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
