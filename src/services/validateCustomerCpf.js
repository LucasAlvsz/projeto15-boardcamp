import db from "../db/index.js"

export const validateCustomerCpf = async (cpf, id) => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT cpf FROM customers
            WHERE cpf = $1 AND NOT id = $2
        `,
			[cpf, id]
		)
		return rows.length > 0 ? true : false
	} catch (err) {
		return -1
	}
}

export default validateCustomerCpf
