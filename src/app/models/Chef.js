const Base = require('./Base')

Base.init({ table: 'chefs' })

module.exports = {
    ...Base,
    async files(id) {
        const results = await db.query('SELECT * FROM chefs as c INNER JOIN files as f on (c.file_id = f.id) WHERE c.file_id = $1', [id])
        return results.rows
    }
}