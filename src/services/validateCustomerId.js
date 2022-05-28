import db from "../db/index.js"

export const validateCustomerId = async id => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT id FROM customers WHERE id = $1
        `,
			[id]
		)
		return rows.length > 0 ? true : false
	} catch (err) {
		return -1
	}
}

export default validateCustomerId
