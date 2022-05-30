import db from "../db/index.js"

export const getGames = async (req, res) => {
	const { query, params } = res.locals
	const orderByIdentifier = params.pop()
	try {
		const { rows } = await db.query(
			`--sql
				SELECT games.*, categories.name as "categoryName" 
				FROM games
				JOIN categories ON games."categoryId" = categories.id
				WHERE games.name ILIKE $1 ORDER BY ${orderByIdentifier} OFFSET $2 LIMIT $3
				`,
			[query, ...params]
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

export const postGame = async (req, res) => {
	const { name, image, stockTotal, categoryId, pricePerDay } = req.body
	try {
		await db.query(
			`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        	 VALUES ($1, $2, $3, $4, $5)
        `,
			[name, image, stockTotal, categoryId, pricePerDay]
		)
		res.sendStatus(201)
	} catch (err) {
		if (err.code === "23505") return res.sendStatus(409)
		res.sendStatus(500)
	}
}
