import db from "../db/index.js"
import getTodaysDate from "../utils/getTodaysDate.js"

export const getRentals = async (req, res) => {
	const { query, rentalParams, params } = res.locals
	try {
		const { rows } = await db.query(
			`--sql
            SELECT rentals.*, customers.id AS "customerId", customers.name AS "customerName", 
                games.id AS "gameId", games.name AS "gameName", games."categoryId" AS "categoryId",
                categories.name AS "categoryName" 
            FROM rentals 
                JOIN customers ON rentals."customerId" = customers.id
                    JOIN games ON rentals."gameId" = games.id 
                        JOIN categories ON games."categoryId" = categories.id
			${query} OFFSET $${rentalParams.length + 1} LIMIT $${rentalParams.length + 2}
        `,
			[...rentalParams, ...params]
		)
		const formattedRows = rows.map(row => {
			return {
				id: row.id,
				customerId: row.customerId,
				gameId: row.gameId,
				rentDate: row.rentDate,
				daysRented: row.daysRented,
				returnDate: row.returnDate,
				originalReturnDate: row.originalReturnDate,
				originalPrice: row.originalPrice,
				delayFee: row.delayFee,
				customer: {
					id: row.customerId,
					name: row.customerName,
				},
				game: {
					id: row.gameId,
					name: row.gameName,
					categoryId: row.categoryId,
					categoryName: row.categoryName,
				},
			}
		})
		res.send(formattedRows)
	} catch (err) {
		res.sendStatus(500)
	}
}

export const postRental = async (req, res) => {
	const { customerId, gameId, daysRented } = req.body
	const params = [customerId, gameId, daysRented, getTodaysDate()]
	try {
		await db.query(
			`--sql
            INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
            VALUES ($1, $2, $3, $4, $3 * 
                    (SELECT "pricePerDay" FROM games WHERE id = $2) )
        `,
			params
		)
		res.sendStatus(201)
	} catch (err) {
		res.sendStatus(500)
	}
}

export const finalizeRental = async (req, res) => {
	const { id } = req.params
	try {
		await db.query(
			`--sql
            UPDATE rentals SET "returnDate" = $2, 
                "delayFee" = GREATEST(
                        (($2 - (SELECT "rentDate" FROM rentals WHERE id = $1)) * games."pricePerDay") - rentals."originalPrice"
                    , 0)
                FROM games WHERE rentals.id = $1 AND rentals."gameId" = games.id
        `,
			[id, getTodaysDate()]
		)
		res.sendStatus(200)
	} catch (err) {
		res.sendStatus(500)
	}
}

export const deleteRental = async (req, res) => {
	const { id } = req.params
	try {
		await db.query(
			`--sql
            DELETE FROM rentals
            WHERE id = $1
        `,
			[id]
		)
		res.sendStatus(200)
	} catch (err) {
		res.sendStatus(500)
	}
}
