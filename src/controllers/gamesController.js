import connection from "../db/index.js"

export const getGames = async (req, res) => {
	try {
		const { rows } = connection.query("SELECT * FROM games")
		res.send(rows)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

export const postGame = async (req, res) => {
	const { name, image, stockTotal, categoryId, pricePerDay } = req.body

	try {
		const result = await connection.query(
			`
        INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) 
        VALUES ($1, $2, $3, $4, $5)
        `,
			[name, image, stockTotal, categoryId, pricePerDay]
		)
		res.sendStatus(201)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}
