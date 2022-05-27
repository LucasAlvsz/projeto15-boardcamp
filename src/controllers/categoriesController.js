import connection from "../db/index.js"

export const getCategories = async (req, res) => {
	try {
		const { rows } = await connection.query("SELECT * FROM categories")
		res.send(rows)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

export const postCategory = async (req, res) => {
	const { name } = req.body
	try {
		const result = connection.query(
			`INSERT INTO categories (name) 
			VALUES ($1) 
			WHERE NOT EXISTS (
				SELECT name FROM categories WHERE name = $1
				);
			`,
			[name]
		)
		res.send(result)
	} catch (err) {
		console.log(err)
		res.status(500)
	}
}
