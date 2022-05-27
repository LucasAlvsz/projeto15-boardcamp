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
