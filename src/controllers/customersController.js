import db from "../db/index.js"

export const getCustomers = async (req, res) => {
	const { query } = res.locals
	console.log(query)
	try {
		const { rows } = await db.query(
			`--sql
            SELECT * FROM customers
            WHERE cpf LIKE $1
        `,
			[query]
		)
		res.send(rows)
	} catch (err) {
		res.sendStatus(err)
	}
}

export const postCustomers = async (req, res) => {
	const { name, phone, cpf, birthday } = req.body
	try {
		await db.query(
			`--sql
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)
        `,
			[name, phone, cpf, birthday]
		)
		res.send(201)
	} catch (err) {
		if (err.code === "23505") return res.sendStatus(409)
		res.sendStatus(500)
	}
}
