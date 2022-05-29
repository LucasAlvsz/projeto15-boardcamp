import db from "../db/index.js"

export const validateRentalId = async rentalId => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT id FROM rentals WHERE id = $1
        `,
			[rentalId]
		)
		if (rows.length === 0) return false
		return true
	} catch (err) {
		console.log(err)
		return -1
	}
}

export default validateRentalId
