import db from "../db/index.js"

export const validateRentalStatus = async rentalId => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT "returnDate" FROM rentals 
            WHERE id = $1 AND "returnDate" IS NULL
        `,
			[rentalId]
		)
		if (rows.length === 0) return false
		return true
	} catch (err) {
		return -1
	}
}

export default validateRentalStatus
