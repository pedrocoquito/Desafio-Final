const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'recipes' })

module.exports = {
    ...Base,
    async search(filter) {
        try {
            let query = `SELECT recipes.*, chefs.name AS author 
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'`

            const results = await db.query(query)
            return results.rows
        } catch (err) {
            console.error(err)
        }
    }
}
