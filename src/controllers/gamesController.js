import db from "../db/index.js"

export const getGames = async (req, res) => {
	const { query } = res.locals
	try {
		const { rows } = await db.query(
			`--sql
				SELECT games.*, categories.name as "categoryName" FROM games
				JOIN categories ON games."categoryId" = categories.id
				WHERE games.name ILIKE $1
				`,
			[query]
		)
		res.send(rows)
	} catch (err) {
		console.log(err)
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
		console.log(err)
		res.sendStatus(500)
	}
}
