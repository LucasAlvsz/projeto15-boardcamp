import db from "../db/index.js"

export const getCategoriesId = async () => {
	try {
		const { rows } = await db.query(`SELECT id FROM categories`)
		return rows
	} catch (err) {
		return -1
	}
}

export default getCategoriesId
