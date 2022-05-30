import db from "../db/index.js"

export const validateGameStock = async gameId => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT "gameId", games."stockTotal" FROM rentals 
                JOIN games ON rentals."gameId" = games.id
            WHERE "gameId" = $1 AND "returnDate" IS null
        `,
			[gameId]
		)
		if (rows.length >= rows[0]?.stockTotal) return false
		return true
	} catch (err) {
		console.log(err)
		return -1
	}
}

export default validateGameStock
