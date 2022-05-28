import db from "../db/index.js"

export const validateCustomerCpf = async cpf => {
	try {
		const { rows } = await db.query(
			`--sql
            SELECT cpf FROM customers
            WHERE cpf = $1
        `,
			[cpf]
		)
		return rows.length > 0 ? true : false
	} catch (err) {
		return -1
	}
}

export default validateCustomerCpf
