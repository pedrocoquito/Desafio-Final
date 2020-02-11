const db = require('../../config/db')

function find(filters, table) {
    let query = `SELECT * FROM ${table}`

    if (filters) {
        Object.keys(filters).map(key => {
            query += ` ${key}`

            Object.keys(filters[key]).map(field => {
                query += ` ${field} = '${filters[key][field]}'`
            })
        })
    }

    return db.query(query)
}

const Base = {
    init({ table }) {
        if (!table) throw new Error('Valores inválidos')

        this.table = table

        return this
    },
    async find(id) {
        const results = await find({ where: { id } }, this.table)
        return results.rows[0]
    },
    async findOne(filters) {
        const results = await find(filters, this.table)
        return results.rows[0]
    },
    async findAll(filters) {
        const results = await find(filters, this.table)
        return results.rows
    },
    async create(fields) {
        try {
            let keys = [], values = []

            Object.keys(fields).map(key => {
                keys.push(key)

                if (key == 'ingredients' || key == 'preparation') {
                    values.push(`'{${fields[key]}}'`)
                } else {
                    values.push(`'${fields[key]}'`)
                }
            })

            const query = `INSERT INTO ${this.table} (${keys.join(',')})
            VALUES (${values.join(',')})
            RETURNING id`

            const results = await db.query(query)
            return results.rows[0].id

        } catch (err) {
            console.error(err)
        }
    },
    async update(id, fields) {
        try {
            let values = []

            Object.keys(fields).map(key => {
                if (key == 'ingredients' || key == 'preparation') {
                    values.push(`${key} = '{${fields[key]}}'`)
                } else {
                    values.push(`${key} = '${fields[key]}'`)
                }
            })

            const query = `UPDATE ${this.table} 
                            SET ${values.join(',')}
                            WHERE id = ${id} 
                        `
            return db.query(query)

        } catch (err) {
            console.error(err)
        }
    },
    delete(id) {
        try {
            return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = Base