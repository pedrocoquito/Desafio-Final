const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'recipes' })

module.exports = {
    ...Base,
    async details(filter) {
        try {
            let query = `select r.*, REPLACE(f.path, 'public', '') as img, c.name AS author 
            from recipes AS r
            left join recipe_files as rf on (r.id = rf.recipe_id)
            LEFT JOIN chefs as c ON (r.chef_id = c.id)
            LEFT join files as f on (f.id = rf.file_id)
            where r.id = ${filter}
            GROUP BY r.id, f.path, c.name`
            const results = await db.query(query)
            return results.rows[0]
        } catch (err) {
            console.error(err)
        }
    },
    async search(filter) {
        try {
            let query = `select r.*, REPLACE(f.path, 'public', '') as img, c.name AS author 
            from recipes AS r
            left join recipe_files as rf on (r.id = rf.recipe_id)
            LEFT JOIN chefs as c ON (r.chef_id = c.id)
            LEFT join files as f on (f.id = rf.file_id)
            where r.title ILIKE '%${filter}%'
            GROUP BY r.id, f.path, c.name`
            const results = await db.query(query)
            return results.rows
        } catch (err) {
            console.error(err)
        }
    },
    async topSix() {
        try {
            let query = `select r.*, REPLACE(f.path, 'public', '') as img
            from (SELECT * from recipes order by created_at limit 6) AS r
            left join recipe_files as rf on (r.id = rf.recipe_id)
            left join files as f on (f.id = rf.file_id)
            GROUP BY r.id, img, r.chef_id, r.title, r.ingredients, r.preparation, r.information, r.created_at, r.updated_at`

            const results = await db.query(query)
            return results.rows
        } catch (err) {
            console.error(err)
        }
    },
    async deleteImages(id) {
        await db.query(`DELETE FROM recipe_files WHERE recipe_id = ${id}`)
    },
}
