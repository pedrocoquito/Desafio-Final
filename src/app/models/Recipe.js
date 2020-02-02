const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'receipts' })

module.exports = {
    ...Base,
    async files(id) {
        const results = await db.query('SELECT * FROM receipts as r INNER JOIN recipe_files as rf on (r.id = rf.recipe_id) INNER JOIN files as f on (f.id = rf.file_id) WHERE r.id = $1', [id])
        return results.rows
    },
    async search({ filter, category }) {
        let query = `SELECT products.*, categories.name AS category_name
        FROM products
        LEFT JOIN categories ON (categories.id = products.category_id)
        WHERE 1 = 1`

        if (category) {
            query += ` AND products.category_id = ${category}`
        }

        if (filter) {
            query += ` AND (products.name ILIKE '%${filter}%' 
            OR products.description ILIKE '%${filter}%')`
        }

        query += ` AND status != 0`

        const results = await db.query(query)
        return results.rows
    }
}
