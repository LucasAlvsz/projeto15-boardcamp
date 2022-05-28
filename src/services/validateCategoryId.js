import db from "../db/index.js"

export const validateCategoryId = async id => {
	try {
		const { rows } = await db.query(
			`--sql
			SELECT id FROM categories WHERE id = $1`,
			[id]
		)
		return rows.length > 0 ? true : false
	} catch (err) {
		return -1
	}
}

export default validateCategoryId
