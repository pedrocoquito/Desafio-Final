const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'chefs' })

module.exports = {
    ...Base,
    async findAllAvatar() {
        const query = "select c.*, REPLACE(f.path, 'public', '') as image from chefs as c left join files as f on (c.file_id = f.id) group by c.id, f.path"
        const results = await db.query(query)
        const chefs = results.rows

        return chefs
    }
}