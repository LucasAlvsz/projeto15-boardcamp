import db from "../db/index.js"

export const getCustomers = async (req, res) => {
	const { query, params } = res.locals
	const orderByIdentifier = params.pop()
	try {
		const { rows } = await db.query(
			`--sql
            SELECT * FROM customers 
            WHERE cpf LIKE $1 ORDER BY ${orderByIdentifier} OFFSET $2 LIMIT $3 
        `,
			[query, ...params]
		)
		res.send(rows)
	} catch (err) {
		res.sendStatus(500)
		console.log(err)
	}
}

export const getCustomer = async (req, res) => {
	const { id } = req.params
	try {
		const { rows } = await db.query(
			`--sql
			SELECT * FROM customers
			WHERE id = $1
		`,
			[id]
		)
		res.send(rows)
	} catch (err) {
		res.sendStatus(500)
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
		res.sendStatus(201)
	} catch (err) {
		if (err.code === "23505") return res.sendStatus(409)
		res.sendStatus(500)
	}
}

export const putCustomer = async (req, res) => {
	const { id } = req.params
	const { name, phone, cpf, birthday } = req.body
	try {
		await db.query(
			`--sql
			UPDATE customers 
			SET name = $1, phone = $2, cpf = $3, birthday = $4
			WHERE id = $5
		`,
			[name, phone, cpf, birthday, id]
		)
		res.sendStatus(200)
	} catch (err) {
		res.sendStatus(500)
	}
}
