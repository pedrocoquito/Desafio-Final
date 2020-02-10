const Base = require('./Base')

Base.init({ table: 'files' })

module.exports = {
    ...Base,
    async createFile(file) {
        File.init({ table: 'files' })
        const fileId = await File.create({
            name: file.filename,
            path: file.path
        })
        return fileId
    }
}
